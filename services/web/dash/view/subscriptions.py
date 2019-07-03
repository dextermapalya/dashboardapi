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
from dash.utils import get_env_variable, get_db_connection
from dash.utils import get_env_variable, get_db_connection

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
    if dt is None:
        query = query.format( ' CURRENT_DATE() ')    
    else:
        query = query.format( "DATE('" + dt + "')" )    

    stdlogger.info(query)
    return query    


@api_view(['GET'])
@permission_classes((permissions.IsAuthenticated,))
@cache_page(60 * 60) #cache for 1 hour
def activesubscriptions(request, dt_query ):
        try:
            response = {'code':303, 'data':[]} #init variable
            status_code = 200

            params = {'id': 1, 'dt_query':dt_query}
            validator = SubscriptionSerializer( data = params )
            if validator.is_valid() == False:
                raise Exception("Invalid rest Arguments")

            db_conn = get_db_connection()
            stdlogger.info("GETTING DB SOURCE {0}".format(db_conn))

            cursor = connections[db_conn].cursor() #this is for multiple databases
            #cursor =  connection.cursor() #this is for default database
            cursor.execute( get_subscriptionsquery( dt_query ) )
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
            

