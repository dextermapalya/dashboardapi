### this job/task will be scheduled to run repeatedly ###

from background_task import background
import requests
from datetime import datetime, timedelta
import time
from scheduler.auth import login, TokenAuth
import logging
stdlogger = logging.getLogger(__name__)
from scheduler import BASE_URL, INSTALLATIONS_URL, REGISTRATIONS_URL, RENEWALS_URL, SUBSCRIPTIONS_URL


###
# getChartsByDate
#  arguments token, date
#  returns none
#  the function will make api calls to all of the apis that is used by react
#  by making the api request, the end user will not experience a lag/delay in viewing data
###
def getChartsByDate(access_token, dt):

    try:    

        headers = {'Content-Type': 'application/json', 
                    'Authorization':'Bearer {}'.format(access_token)}               
        #print( headers )       
        endpoints = [INSTALLATIONS_URL, REGISTRATIONS_URL, SUBSCRIPTIONS_URL, RENEWALS_URL]
        for item in endpoints:
            url = BASE_URL + item + dt
            stdlogger.info( " $$$$$$ Running cron to fetch  {0} ".format( url )  )
            stdlogger.info( " $$$$$$ headers  {0} ".format( headers )  )

            time.sleep(2)
            response = requests.get(url, headers = headers , timeout = 180 )

        #url = BASE_URL + REGISTRATIONS_URL + dt
        #response = requests.get(url, headers = headers , timeout = 120 )

        #url = BASE_URL + SUBSCRIPTIONS_URL + dt
        #response = requests.get(url, headers = headers , timeout = 120 )

        #url = BASE_URL + RENEWALS_URL + dt
        #response = requests.get(url, headers = headers , timeout = 120 )

        #json_response = response.json()
        #print(response)
        print( response.json() )
        print("\n\n\n")
        stdlogger.info( " @@@@@@@ AUTH credentials {0} ".format( response )  )

    except Exception as e:
        print( "Error {0}".format ( str(e) ) )
        raise
    
###
# fetch_jsondata
#  arguments 
#  returns none
# it used the decorator background to run the function after 15 seconds from the time its
# called/invoked
#  the function will login, get a token call another function to make the api call
###
@background(schedule=15, queue='every-25-minutes')
def fetch_currentdata( dt = None):

    #datetime.timedelta(days=1)
    #datetime.now() + timedelta(days=-1
    try:
        stdlogger.info("RUN Scheduled JOB...@@@@@@@@@@@@@@@@@@@@@@@@")
        if (dt is None):
            today = datetime.today().strftime('%Y-%m-%d')
            token = login()
            if ( token ):
                getChartsByDate(token, today)

    except Exception as e:
            #return an exception
            status_code = 303
            response = {'code':status_code, 'error' : str(e) , 'data':[]}
            pass
    finally:
            #sample json format
            #return JsonResponse({'error': 'This page is forbidden', 'items': items}, status=403)
            #return JsonResponse( response, status = status_code )    
            print("Done....!")

###
# fetch_jsondata
#  arguments None
#  returns none
#  the function will login, get a token call another function to make the api call
###
@background(schedule=60, queue='last-7-days')
def fetch_historicaldata( ):

    #datetime.timedelta(days=1)
    #datetime.now() + timedelta(days=-1
    try:
        token = login()
        max_days = 8
        i = 1
        while ( i  < max_days and token ):     
            d = datetime.today() - timedelta( days = i )
            dt = d.strftime('%Y-%m-%d')
            getChartsByDate(token, dt)
            i = i + 1

    except Exception as e:
            #return an exception
            status_code = 303
            response = {'code':status_code, 'error' : str(e) , 'data':[]}
            pass
    finally:
            #sample json format
            #return JsonResponse({'error': 'This page is forbidden', 'items': items}, status=403)
            #return JsonResponse( response, status = status_code )    
            print("Done....!")

