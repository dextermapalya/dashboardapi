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
from dash.utils import get_env_variable, get_db_connection
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
    if dt is None:
        query = query.format( ' CURRENT_DATE() ')    
    else:
        query = query.format( "DATE('" + dt + "')" )    

    stdlogger.info(query)
    return query    


@api_view(['GET'])
@permission_classes((permissions.IsAuthenticated,))
@cache_page(60 * 60) #cache for 1 hour
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

            db_conn = get_db_connection()
            stdlogger.info("GETTING DB SOURCE {0}".format(db_conn))
            cursor = connections[db_conn].cursor() #this is for multiple databases
            #cursor =  connection.cursor() #this is for default database
            cursor.execute( get_installationsquery( dt_query ) )
            #cursor.execute( "select * from myplex_user_device")
            #query the db and jsonify the results
            data = [dict((cursor.description[i][0], value) \
                for i, value in enumerate(row)) for row in cursor.fetchall()]
            cursor.connection.close()

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
            

