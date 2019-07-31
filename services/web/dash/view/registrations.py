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
from datetime import date, datetime, timedelta
from .serializers import RegistrationSerializer
from django.core.cache import cache #for memcache
from dash.cache import registration_key #import the name of the key for cache the registration views
from django.views.decorators.cache import cache_page
from dash.utils import get_env_variable, get_db_connection, date_is_identical, jsonifyqueryset
from dash.logutils import start_timer, stop_timer

import logging
stdlogger = logging.getLogger(__name__)

def get_mobileregistrationquery(dt = None):
    query = """
            select hour( convert_tz(created_on,'+00:00','+05:30')) as hour , 
            count(user_id) as mobile_reg from myplex_service.myplex_user_usermobile where 
            user_id in (select id from myplex_user_user where created_on between 
            DATE_FORMAT({0},'%Y-%m-%d 00:00:00') and 
            DATE_FORMAT({0},'%Y-%m-%d 23:59:59')) group by 1;    
        """        
    if dt is None:
        query = query.format( ' NOW() ')    
    else:
        #query = query.format( "DATE('" + dt + "')" )    
        query = query.format ( "'" + dt + "'")
    stdlogger.info(query)
    return query    

def get_emailregistrationquery(dt = None):
    query = """
            select hour( convert_tz(created_on,'+00:00','+05:30')) as hour , 
            count(user_id) as email_reg from myplex_service.myplex_user_useremail where 
            user_id in (select id from myplex_user_user where created_on between 
            DATE_FORMAT({0},'%Y-%m-%d 00:00:00') and 
            DATE_FORMAT({0},'%Y-%m-%d 23:59:59')) group by 1;    
        """        
    if dt is None:
        query = query.format( ' NOW() ')    
    else:
        #query = query.format( "DATE('" + dt + "')" )    
        query = query.format ( "'" + dt + "'")
    stdlogger.info(query)
    return query    

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
    query = """
            SELECT  DATE_FORMAT(CONVERT_TZ(created_on,'+00:00','+05:30'), '%Y-%m-%d')  DATE, 
            HOUR(CONVERT_TZ(created_on,'+00:00','+05:30')) as hour, 'mobile',
            COUNT(user_id) users FROM myplex_service.myplex_user_usermobile WHERE 
            user_id IN (SELECT id FROM myplex_user_user WHERE created_on 
            BETWEEN '{0}' - INTERVAL 1 DAY AND NOW()) GROUP BY 1,2,3
            UNION ALL SELECT DATE_FORMAT(CONVERT_TZ(created_on,'+00:00','+05:30'), '%Y-%m-%d') dt, 
            HOUR(CONVERT_TZ(created_on,'+00:00','+05:30')) hour, 'email', COUNT(user_id) users
            FROM myplex_service.myplex_user_useremail WHERE user_id IN 
            (SELECT id FROM myplex_user_user WHERE 
            created_on BETWEEN '{0}' - INTERVAL 1 DAY AND NOW()) GROUP BY 1,2,3;
        """
    if dt is None:
        query = query.format( ' NOW() ')    
    else:
        query = query.format( dt )    
    stdlogger.info(query)
    return query    


@api_view(['GET', 'POST'])
@permission_classes((permissions.IsAuthenticated,))
#@cache_page(60 * 35) #cache for 35 minutes
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
                validator = RegistrationSerializer( data = params )
                if validator.is_valid() == False:
                    raise Exception("Invalid rest Arguments")

                data = None

                #check if already cached
                cache_time = 60 * 60 * (24*7) # preserve for 7 days
                if ( date_is_identical(dt_query) == False ):
                    data = cache.get(dt_query + "_registration") # returns None if no key-value pair
                if data:
                    stdlogger.info("Fetching from CACHE\n\n\n\n")
                data = None            
                if not data:
                    db_conn = get_db_connection()
                    stdlogger.info("GETTING DB SOURCE {0}".format(db_conn))
                    stdlogger.info("Fetching from DATABASE")
                    #from IPython import embed; embed()
                    #cursor = connections['myplex_service'].cursor() #this is for multiple databases
                    cursor = connections[db_conn].cursor() #this is for multiple databases
                    #db_conn.set_character_encoding('utf8')
                    #cursor =  connection.cursor() #this is for default database
                    result = cursor.execute( get_registrationquery(dt_query) )
                    
                    #cursor.execute( "select * from myplex_user_device")
                    #query the db and jsonify the results
                    #data = jsonifyqueryset ( cursor.fetchall(), **{'DATE':0, 'hour':1, 'mobile':2, 'users':3} )                    
                    #stdlogger.info("@@@@@@@@@@#### {0}".format(data))

                    #data = [dict((cursor.description[i][0], value) \
                    #for i, value in enumerate( row) ) for row in cursor.fetchall()]
                    #cursor.connection.close()
                    #unicode(s).encode("utf-8") for s in row
                    data = [dict(zip([key[0] for key in cursor.description], row ))  for row in cursor.fetchall()]
                    cursor.connection.close()
                    stdlogger.info("@@@@@@@@@@####!!!!!!!! {0}".format(data))

                    cache.set(dt_query + "_registration", data, cache_time) #store the response in cache

                    #jsondata = jsonifysubscriptions (  cursor.fetchall() )
                duration = stop_timer( start_time )    
                response = {"code": status_code, "data": data, "dt_query": dt_query, "duration":duration }
                stdlogger.info("@@@@@@ Registration QUERY consumed {0}".format(duration) )
                
        except Exception as e:
            #return an exception
            status_code = 303
            response = {'code':status_code, 'error' : str(e) , 'data':[]}
            stdlogger.info("@@@@@@ Error!!!!!! {0}".format( str(e) ) )

            pass
        finally:
            #sample json format
            #return JsonResponse({'error': 'This page is forbidden', 'items': items}, status=403)
            return JsonResponse( response, status = status_code )    
            

