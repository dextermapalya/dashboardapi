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
def activeinstallations(request,  dt_query ):
        try:
            response = {'code':303, 'data':[]} #init variable
            status_code = 200

            params = {'id': 1, 'dt_query':dt_query}
            print(params)
            validator = InstallationSerializer( data = params )
            print()
            if validator.is_valid() == False:
                raise Exception("Invalid rest Arguments")
            #query = "select * from test"    
            cursor = connections['myplex_service'].cursor() #this is for multiple databases
            #cursor =  connection.cursor() #this is for default database
            cursor.execute( get_installationsquery( dt_query ) )
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
            

