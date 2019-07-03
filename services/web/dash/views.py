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
from datetime import date
from .serializers import SubscriptionSerializer
from django.core.cache import cache #for memcache
from dash.cache import registration_key #import the name of the key for cache the registration views
from django.views.decorators.cache import cache_page


import logging
stdlogger = logging.getLogger(__name__)

def get_registrationquery(dt = None):
    query = """
            SELECT HOUR(created_on) HR,
            COUNT(b.user_id) Mobile_Reg,
            COUNT(c.user_id) email_Reg
            FROM
            (SELECT id,CONVERT_TZ(created_on,'GMT','Asia/Kolkata') created_on
            FROM myplex_service.myplex_user_user WHERE DATE(CONVERT_TZ(created_on,'GMT','Asia/Kolkata'))={0}
            GROUP BY 1,2
            ) a
            LEFT JOIN
            (SELECT user_id,mobile FROM myplex_user_usermobile
            WHERE DATE(CONVERT_TZ(created_on,'GMT','Asia/Kolkata'))={0} GROUP BY 1,2) b
            ON a.id=b.user_id
            LEFT JOIN
            (SELECT user_id,email FROM myplex_user_useremail
            WHERE DATE(CONVERT_TZ(created_on,'GMT','Asia/Kolkata'))={0} GROUP BY 1,2) c
            ON a.id=c.user_id
            GROUP BY 1    
        """
    if dt is None:
        query = query.format( ' CURRENT_DATE() ')    
    else:
        query = query.format( "DATE('" + dt + "')" )    

    stdlogger.info(query)
    return query    

def jsonifysubscriptions(resultset):
        items = []

        if len(resultset) > 0:

            for item in resultset:
                print(item[0])
                items.append({'current_date':item[0],'active_subscriptions':item[1]})
                print(items)

        return items     


@api_view(['GET', 'POST'])
@permission_classes((permissions.IsAuthenticated,))
@cache_page(60 * 1)
def activeregistrations(request, dt_query ):
        try:
            response = {'code':303, 'data':[]} #init variable
            status_code = 200

            if request.method == 'POST':
                print(request.data)
                print(request.data["username"], request.data.get("password"))
                return JsonResponse({"message": "Got some data!", "data": request.data})
            
            else: 
                params = {'id': 1, 'dt_query':dt_query}
                validator = SubscriptionSerializer( data = params )
                if validator.is_valid() == False:
                    raise Exception("Invalid rest Arguments")

                #check if already cached
                cache_time = 60*2 # time in seconds for cache to be valid
                #data = cache.get(registration_key) # returns None if no key-value pair
                #if data:
                #    stdlogger.info("Fetching from CACHE\n\n\n\n")
                data = None

                if not data:
                    stdlogger.info("Fetching from DATABASE\n\n\n\n\n")
                    cursor = connections['myplex_service'].cursor() #this is for multiple databases
                    #cursor =  connection.cursor() #this is for default database
                    cursor.execute( get_registrationquery(dt_query) )
                    #cursor.execute( "select * from myplex_user_device")
                    #query the db and jsonify the results
                    data = [dict((cursor.description[i][0], value) \
                    for i, value in enumerate( row) ) for row in cursor.fetchall()]
                    cursor.connection.close()

                    #cache.set(registration_key, data, cache_time) #store the response in cache

                    #jsondata = jsonifysubscriptions (  cursor.fetchall() )
                response = {"code": status_code, "data": data }
                
        except Exception as e:
            #return an exception
            status_code = 303
            response = {'code':status_code, 'error' : str(e) , 'data':[]}
            pass
        finally:
            #sample json format
            #return JsonResponse({'error': 'This page is forbidden', 'items': items}, status=403)
            return JsonResponse( response, status = status_code )    
            

