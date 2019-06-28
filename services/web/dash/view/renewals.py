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
    if dt is None:
        query = query.format( ' CURRENT_DATE() ')    
    else:
        query = query.format( "DATE('" + dt + "')" )    

    stdlogger.info(query)
    return query    


@api_view(['GET'])
@permission_classes((permissions.IsAuthenticated,))
def activerenewals(request, dt_query ):
        try:
            response = {'code':303, 'data':[]} #init variable
            status_code = 200

            params = {'id': 1, 'dt_query':dt_query}
            print(params)
            validator = RenewalSerializer( data = params )
            print()
            if validator.is_valid() == False:
                raise Exception("Invalid rest Arguments")
            #query = "select * from test"    
            cursor = connections['myplex_service'].cursor() #this is for multiple databases
            #cursor =  connection.cursor() #this is for default database
            cursor.execute( get_renewalsquery( dt_query ) )
            #cursor.execute( "select * from myplex_user_device")
            #query the db and jsonify the results
            r = [dict((cursor.description[i][0], value) \
                for i, value in enumerate(row)) for row in cursor.fetchall()]
            cursor.connection.close()

            #jsondata = jsonifysubscriptions (  cursor.fetchall() )
            response = {"code": status_code, "data": r }
                
        except Exception as e:
            #return an exception
            status_code = 303
            response = {'code':status_code, 'error' : str(e) , 'data':[]}
            pass
        finally:
            #sample json format
            #return JsonResponse({'error': 'This page is forbidden', 'items': items}, status=403)
            return JsonResponse( response, status = status_code )    
            

