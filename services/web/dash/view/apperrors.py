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
from dash.utils import get_env_variable, jsonifyqueryset, date_in_epoch, date_is_identical
from dash.logutils import start_timer, stop_timer
from elk.elastic import connect_elasticsearch, get_query_count
from dash.view.elasticutils import build_query_date_range_phrase
from elk import query_errors

import logging
stdlogger = logging.getLogger(__name__)



@api_view(['GET', 'POST'])
@permission_classes((permissions.IsAuthenticated,))
@cache_page(60 * 25) #cache for 25 minutes
def app_event_errors(request, dt_query ):
        try:

            response = {'code':303, 'data':[]} #init variable
            status_code = 200
            start_time = start_timer() #init start time all computations start after this

            params = {'id': 1, 'dt_query':dt_query}
            validator = RegistrationSerializer( data = params )
            if validator.is_valid() == False:
                raise Exception("Invalid rest Arguments")

            data = None

            #check if already cached
            cache_time = 60 * 60 * (24*7) # preserve for 7 days
            if ( date_is_identical(dt_query) == False ):
                data = cache.get(dt_query + "_app_event_errors") # returns None if no key-value pair
            if data:
                stdlogger.info("Fetching from ElasticSearch\n")

            if not data:
                stdlogger.info(" #### fetching epoch date" )
                epoch = date_in_epoch(dt_query)
                es_client = connect_elasticsearch() #get an instance of elasticsearch client
                     
                data = {}
                # (n) number of api requests must be made to elasti server, this depends on the number of keywords 
                # that must be processed 
                for item in query_errors:
                    #generate a json object based on the keywords and epoch time
                    query = build_query_date_range_phrase(item["search_terms"], epoch)
                    stdlogger.info(" ELASTIC QUERY BUILDER {0}".format( query ) )
                    #make the api call to elasticserver to get the count
                    data[item["key"]] = get_query_count( es_client, "events", query)

                cache.set(dt_query + "_app_event_errors", data, cache_time) #store the response in cache

                #jsondata = jsonifysubscriptions (  cursor.fetchall() )
            duration = stop_timer( start_time )    
            response = {"code": status_code, "data": data, "dt_query": dt_query, "duration":duration }
            stdlogger.info("@@@@@@ App Events API Request consumed {0}".format(duration) )
                
        except Exception as e:
            #return an exception
            status_code = 303
            response = {'code':status_code, 'error' : str(e) , 'data':[]}
            stdlogger.info("@@@@@@ Error!!!!!! {0}".format( str(e) ) )
            #stdlogger.fatal(e, exc_info=True)

            pass
        finally:
            #sample json format
            #return JsonResponse({'error': 'This page is forbidden', 'items': items}, status=403)
            return JsonResponse( response, status = status_code )    
            

