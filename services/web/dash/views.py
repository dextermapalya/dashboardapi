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
from dash.utils import get_env_variable, get_db_connection
from .logutils import start_timer, stop_timer

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
@cache_page(60 * 60) #cache for 1 hour
def activeregistrations(request, dt_query ):
        try:
            response = {'code':303, 'data':[]} #init variable
            status_code = 200
            start_time = start_timer() #init start time all computations start after this

            if request.method == 'POST':
                print(request.data)
                print(request.data["username"], request.data.get("password"))
                return JsonResponse({"message": "Got some data!", "data": request.data})
            
            else: 
                params = {'id': 1, 'dt_query':dt_query}
                validator = SubscriptionSerializer( data = params )
                if validator.is_valid() == False:
                    raise Exception("Invalid rest Arguments")

                db_conn = get_db_connection()
                stdlogger.info("GETTING DB SOURCE {0}".format(db_conn))
                #check if already cached
                cache_time = 60*2 # time in seconds for cache to be valid
                #data = cache.get(registration_key) # returns None if no key-value pair
                #if data:
                #    stdlogger.info("Fetching from CACHE\n\n\n\n")
                data = None

                if not data:
                    stdlogger.info("Fetching from DATABASE")
                    #cursor = connections['myplex_service'].cursor() #this is for multiple databases
                    cursor = connections[db_conn].cursor() #this is for multiple databases
                    #cursor =  connection.cursor() #this is for default database
                    cursor.execute( get_registrationquery(dt_query) )
                    #cursor.execute( "select * from myplex_user_device")
                    #query the db and jsonify the results
                    data = [dict((cursor.description[i][0], value) \
                    for i, value in enumerate( row) ) for row in cursor.fetchall()]
                    cursor.connection.close()

                    #cache.set(registration_key, data, cache_time) #store the response in cache

                    #jsondata = jsonifysubscriptions (  cursor.fetchall() )
                duration = stop_timer( start_time )    
                response = {"code": status_code, "data": data, "duration":duration }
                stdlogger.info("@@@@@@ Registration QUERY consumed {0}".format(duration) )
                
        except Exception as e:
            #return an exception
            status_code = 303
            response = {'code':status_code, 'error' : str(e) , 'data':[]}
            pass
        finally:
            #sample json format
            #return JsonResponse({'error': 'This page is forbidden', 'items': items}, status=403)
            return JsonResponse( response, status = status_code )    
            

@api_view(['GET'])
@permission_classes([])
def articles(request ):
    try:
        data = [
            {'id':1, 'title': 'Article 1', 'content': 'Some sample content'},
            {'id':2, 'title': 'Article 1', 'content': 'Some sample content'},
            {'id':3, 'title': 'Article 1', 'content': 'Some sample content'},
            {'id':4, 'title': 'Article 1', 'content': 'Some sample content'},
            {'id':5, 'title': 'Article 1', 'content': 'Some sample content'},
            {'id':6, 'title': 'Article 1', 'content': 'Some sample content'},
            {'id':7, 'title': 'Article 1', 'content': 'Some sample content'},
            {'id':8, 'title': 'Article 1', 'content': 'Some sample content'},
            {'id':9, 'title': 'Article 1', 'content': 'Some sample content'},
            {'id':10, 'title': 'Article 1', 'content': 'Some sample content'},
            {'id':11, 'title': 'Article 1', 'content': 'Some sample content'},
            {'id':12, 'title': 'Article 1', 'content': 'Some sample content'},
            {'id':13, 'title': 'Article 1', 'content': 'Some sample content'},
            {'id':14, 'title': 'Article 1', 'content': 'Some sample content'},
            {'id':15, 'title': 'Article 1', 'content': 'Some sample content'}
        ]

    except Exception as e:
        print(e)
        raise 
    finally:
        response = {"code": 200, "data": data }
        return JsonResponse( response, status = 200 ) 


