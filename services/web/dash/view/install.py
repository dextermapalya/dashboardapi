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
from .serializers import InstallationSerializer
from django.views.decorators.cache import cache_page
from django.core.cache import cache #for memcache

from dash.utils import get_env_variable, get_db_connection, date_is_identical, jsonifyqueryset
from dash.logutils import start_timer, stop_timer

from datetime import date
import logging
stdlogger = logging.getLogger(__name__)

def get_installationsquery(dt = None):
    query = """
        SELECT HOUR(created_on) HR,os,COUNT(id) Installs_cnt FROM (SELECT id,CONVERT_TZ(created_on,'GMT','Asia/Kolkata') created_on,os FROM
        myplex_service.myplex_user_device WHERE DATE(CONVERT_TZ(created_on,'GMT','Asia/Kolkata')) = {0} GROUP BY 1,2,3) a 
        GROUP BY 1,2;        
        """
    query = """
        SELECT DATE(CONVERT_TZ(created_on,'+00:00','+05:30')) dt, 
        HOUR(CONVERT_TZ(created_on,'+00:00','+05:30')) hr, os, COUNT(id) 
        install_cnt FROM (SELECT id,created_on,os FROM myplex_service.myplex_user_device 
        WHERE DATE(CONVERT_TZ(created_on,'+00:00','+05:30')) = '{0}' 
        AND created_on between '{0}' - interval 1 day and '{0}') 
        a GROUP BY 1,2,3;
        """        
    if dt is None:
        query = query.format( ' NOW() ')    
    else:
        query = query.format( dt )    

    stdlogger.info(query)
    return query    


@api_view(['GET'])
@permission_classes((permissions.IsAuthenticated,))
@cache_page(60 * 35) #cache for 35 minutes
def activeinstallations(request,  dt_query ):
        try:
            response = {'code':303, 'data':[]} #init variable
            status_code = 200
            start_time = start_timer() #init start time all computations start after this

            params = {'id': 1, 'dt_query':dt_query}
            print(params)
            validator = InstallationSerializer( data = params )
            if validator.is_valid() == False:
                raise Exception("Invalid rest Arguments")

            data = None
            #check if already cached
            cache_time = 60 * 60 * (24*7) # preserve for 7 days

            if ( date_is_identical(dt_query) == False ):
                data = cache.get(dt_query + "_install") # returns None if no key-value pair
            if data:
                    stdlogger.info("Fetching from CACHE\n\n\n\n")

            if not data:
                db_conn = get_db_connection()
                stdlogger.info("GETTING DB SOURCE {0}".format(db_conn))
                cursor = connections[db_conn].cursor() #this is for multiple databases
                #cursor =  connection.cursor() #this is for default database
                cursor.execute( get_installationsquery( dt_query ) )
                #cursor.execute( "select * from myplex_user_device")
                #query the db and jsonify the results
                ##data = [dict((cursor.description[i][0], value) \
                ##    for i, value in enumerate(row)) for row in cursor.fetchall()]
                ##cursor.connection.close()
                data = jsonifyqueryset ( cursor.fetchall(), **{'dt':0, 'hr':1, 'os':2, 'install_cnt':3} )                    
                cursor.connection.close()

                if ( date_is_identical(dt_query) == False ):
                    stdlogger.info("#### STORING IN MEMCACHE...")
                    cache.set(dt_query + "_install", data, cache_time) #store the response in cache

            #jsondata = jsonifysubscriptions (  cursor.fetchall() )
            duration = stop_timer( start_time )    
            response = {"code": status_code, "data": data, "duration":duration }
            stdlogger.info("@@@@@@ INSTALLATION QUERY consumed {0}".format(duration) )
                
        except Exception as e:
            #return an exception
            status_code = 303
            response = {'code':status_code, 'error' : str(e) , 'data':[]}
            pass
        finally:
            #sample json format
            #return JsonResponse({'error': 'This page is forbidden', 'items': items}, status=403)
            return JsonResponse( response, status = status_code )    
            

