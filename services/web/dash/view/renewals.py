# Create your views here.
#from rest_framework.response import Response
from django.http import JsonResponse
from django.db import connections
from django.db import connection
import csv, itertools, json
from django.core.serializers.json import DjangoJSONEncoder
from rest_framework.decorators import api_view
from rest_framework import generics, permissions, viewsets
from rest_framework.decorators import api_view, permission_classes
from .serializers import RenewalSerializer
from django.views.decorators.cache import cache_page
from django.core.cache import cache #for memcache

from dash.utils import get_env_variable, get_db_connection, date_is_identical
from dash.logutils import start_timer, stop_timer

from datetime import date
import logging
stdlogger = logging.getLogger(__name__)

def get_renewalsquery(dt = None):
    query = """
        SELECT 'Paytm' AS payment_method,HOUR(trans_date) HOUR,
        COUNT(user_id) Renewals FROM myplex_service.myplex_paytm_subscription WHERE
        DATE(trans_date)={0} AND request_type='RENEW_SUBSCRIPTION' AND  STATUS='TXN_SUCCESS'
        AND trans_id IS NOT NULL  GROUP BY 1,2
        UNION ALL
        SELECT  payment_method , HOUR(received_date) HOUR, COUNT(p.cp_customer_id) Renewals
        FROM SUNNXT_CHARGING_DB.subscription s
        INNER JOIN SUNNXT_CHARGING_DB.payment p
        ON s.cp_customer_id=p.cp_customer_id
        AND s.order_id = p.order_id 
        INNER JOIN SUNNXT_CHARGING_DB.package_def t
        ON s.package_id=t.package_id 
        INNER JOIN SUNNXT_CHARGING_DB.package_rate r
        ON r.package_id=s.package_id
        AND CAST(p.received_date AS DATE) BETWEEN CAST(r.start_date AS DATE) 
        AND CAST(CASE WHEN r.end_date IS NULL THEN '2099-12-31' ELSE r.end_date END AS DATE)
        AND CASE WHEN p.payment_method <>'App Store Billing' THEN 'Retail Price' ELSE payment_method END =r.rate_type
        WHERE p.posting_status = 'Posted'  AND p.payment_type IN('Renewal') AND is_refund IS NULL
        AND DATE(p.received_date)={0}
        GROUP BY 1,2;
    """
    query = """
        SELECT date, payment_method, hour, renewals FROM (
        SELECT DATE_FORMAT(trans_date, '%Y-%m-%d') DATE, 'Paytm' AS payment_method, 
        HOUR(trans_date) hour, COUNT(user_id) renewals FROM 
        myplex_service.myplex_paytm_subscription
        WHERE trans_date BETWEEN '{0} 00:00:00' AND '{0} 23:59:59' AND 
        request_type='RENEW_SUBSCRIPTION' AND STATUS='TXN_SUCCESS' AND trans_id IS NOT NULL 
        GROUP BY 1,2,3 UNION ALL SELECT DATE(received_date) DATE, payment_method, 
        HOUR(received_date) HOUR,COUNT(cp_customer_id) renewals 
        FROM SUNNXT_CHARGING_DB.payment WHERE received_date BETWEEN 
        '{0} 00:00:00' AND '{0} 23:59:59' AND posting_status='Posted' 
        AND payment_type IN('Renewal') GROUP BY 1,2,3 ) a
        ORDER BY 1,3;
    """

    if dt is None:
        query = query.format( ' now() ')    
    else:
        query = query.format( dt  )    

    stdlogger.info(query)
    return query    


@api_view(['GET'])
@permission_classes((permissions.IsAuthenticated,))
@cache_page(60 * 25) #cache for 25 minutes
def activerenewals(request, dt_query ):
        try:
            response = {'code':303, 'data':[]} #init variable
            status_code = 200
            start_time = start_timer() #init start time all computations start after this

            params = {'id': 1, 'dt_query':dt_query}
            validator = RenewalSerializer( data = params )

            if validator.is_valid() == False:
                raise Exception("Invalid rest Arguments")

            data = None
            #check if already cached
            cache_time = 60 * 60 * (24*7) # preserve for 7 days
                
            if ( date_is_identical(dt_query) == False ):
                data = cache.get(dt_query + "_renewal") # returns None if no key-value pair
            if data:
                    stdlogger.info("Fetching from CACHE\n\n\n\n")

            if not data:
                db_conn = get_db_connection()   
                stdlogger.info("GETTING DB SOURCE {0}".format(db_conn))
                cursor = connections[db_conn].cursor() #this is for multiple databases
                #cursor =  connection.cursor() #this is for default database
                cursor.execute( get_renewalsquery( dt_query ) )
                #cursor.execute( "select * from myplex_user_device")
                #query the db and jsonify the results
                #data = [dict((cursor.description[i][0], value) \
                #    for i, value in enumerate(row)) for row in cursor.fetchall()]
                #cursor.connection.close()
                data = [dict(zip([key[0] for key in cursor.description], row ))  for row in cursor.fetchall()]
                cursor.connection.close()
                stdlogger.info("@@@@@@@@@@####!!!!!!!! {0}".format(data))

                if ( date_is_identical(dt_query) == False ):
                    cache.set(dt_query + "_renewal", data, cache_time) #store the response in cache


            #jsondata = jsonifysubscriptions (  cursor.fetchall() )
            duration = stop_timer( start_time )    
            response = {"code": status_code, "data": data, "dt_query": dt_query, "duration":duration }
            stdlogger.info("@@@@@@ RENEWALS QUERY consumed {0}".format(duration) )
                
        except Exception as e:
            #return an exception
            status_code = 303
            response = {'code':status_code, 'error' : str(e) , 'data':[]}
            pass
        finally:
            #sample json format
            #return JsonResponse({'error': 'This page is forbidden', 'items': items}, status=403)
            return JsonResponse( response, status = status_code )    
            

