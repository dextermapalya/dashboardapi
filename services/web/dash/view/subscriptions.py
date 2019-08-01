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
from .serializers import SubscriptionSerializer
from django.views.decorators.cache import cache_page
from dash.utils import get_env_variable, get_db_connection, date_is_identical, jsonifyqueryset
from dash.logutils import start_timer, stop_timer
from django.core.cache import cache #for memcache

from datetime import date
import logging
stdlogger = logging.getLogger(__name__)

def get_subscriptionsquery(dt = None):
    query = """
        SELECT 'Paytm' AS payment_method,HOUR(CONVERT_TZ(trans_date,'GMT','Asia/Kolkata')) HOUR,
        COUNT(user_id) subs FROM myplex_service.myplex_paytm_subscription WHERE
        DATE(CONVERT_TZ(trans_date,'GMT','Asia/Kolkata')) = {0} AND request_type='SUBSCRIBE' AND  STATUS='TXN_SUCCESS'
        AND trans_id IS NOT NULL  GROUP BY 1,2  UNION ALL SELECT last_payment_channel 
        AS payment_method,HOUR(CONVERT_TZ(created_on,'GMT','Asia/Kolkata')) HOUR, COUNT(order_id) subs
        FROM myplex_service.evergent_evergentstatus WHERE DATE(CONVERT_TZ(created_on, 
        'GMT','Asia/Kolkata')) = {0} AND last_payment_channel IS NOT NULL
        GROUP BY 1,2
        """
    query = """
            SELECT DATE(CONVERT_TZ(trans_date,'GMT','Asia/Kolkata')) as "dt", 'Paytm' AS 
            payment_method, HOUR(CONVERT_TZ(trans_date,'GMT','Asia/Kolkata')) as hour, 
            COUNT(user_id) subs FROM myplex_service.myplex_paytm_subscription WHERE trans_date 
            between '{0} 00:00:00' - interval 1 day and '{0} 23:59:59' AND request_type='SUBSCRIBE' 
            AND STATUS='TXN_SUCCESS' AND trans_id IS NOT NULL GROUP BY 1,2,3 UNION ALL SELECT 
            DATE(CONVERT_TZ(created_on,'GMT','Asia/Kolkata')) as "date", last_payment_channel AS 
            payment_method, HOUR(CONVERT_TZ(created_on,'GMT','Asia/Kolkata')) as hour, 
            COUNT(order_id) subs FROM myplex_service.evergent_evergentstatus WHERE 
            created_on between '{0} 00:00:00' - interval 1 day and '{0} 23:59:59' AND 
            last_payment_channel IS NOT NULL GROUP BY 1,2,3 ORDER BY 1,3;    
        """    
    if dt is None:
        query = query.format( ' NOW() ')    
    else:
        query = query.format( dt )    

    stdlogger.info(query)
    return query    


@api_view(['GET'])
@permission_classes((permissions.IsAuthenticated,))
@cache_page(60 * 25) #cache for 25 minutes
def activesubscriptions(request, dt_query ):
        try:
            response = {'code':303, 'data':[]} #init variable
            status_code = 200
            start_time = start_timer() #init start time all computations start after this

            params = {'id': 1, 'dt_query':dt_query}
            validator = SubscriptionSerializer( data = params )
            if validator.is_valid() == False:
                raise Exception("Invalid rest Arguments")

            data = None
            #check if already cached
            cache_time = 60 * 60 * (24*7) # preserve for 7 days

            if ( date_is_identical(dt_query) == False ):
                data = cache.get(dt_query + "_subscription") # returns None if no key-value pair
            if data:
                stdlogger.info("Fetching from CACHE\n\n\n\n")


            if not data:
                db_conn = get_db_connection()
                stdlogger.info("GETTING DB SOURCE {0}".format(db_conn))

                cursor = connections[db_conn].cursor() #this is for multiple databases
                #cursor =  connection.cursor() #this is for default database
                cursor.execute( get_subscriptionsquery( dt_query ) )
                #cursor.execute( "select * from myplex_user_device")
                #query the db and jsonify the results
                ###data = [dict((cursor.description[i][0], value) \
                ###    for i, value in enumerate(row)) for row in cursor.fetchall()]
                ###cursor.connection.close()
                data = jsonifyqueryset ( cursor.fetchall(), **{'dt':0, 'payment_method':1, 'hr':2, 'subs':3} )                    
                cursor.connection.close()

                if ( date_is_identical(dt_query) == False ):
                    cache.set(dt_query + "_subscription", data, cache_time) #store the response in cache

            #jsondata = jsonifysubscriptions (  cursor.fetchall() )
            duration = stop_timer( start_time )    

            response = {"code": status_code, "data": data, "dt_query": dt_query, "duration":duration }
            stdlogger.info("@@@@@@ SUBSCRIPTIONS QUERY consumed {0}".format(duration) )

        except Exception as e:
            #return an exception
            status_code = 303
            response = {'code':status_code, 'error' : str(e) , 'data':[]}
            pass
        finally:
            #sample json format
            #return JsonResponse({'error': 'This page is forbidden', 'items': items}, status=403)
            return JsonResponse( response, status = status_code )    
            

