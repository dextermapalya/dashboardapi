from django.http import JsonResponse
#from background_task import Task

from scheduler.job import fetch_currentdata, fetch_historicaldata
from datetime import date, datetime, timedelta

def current_task(request):

        d = datetime.today() + timedelta( days = 365*100 )
        d = datetime.today()
        #repeat every 25 minutes until end of day
        fetch_currentdata( repeat = 60 *25 , repeat_until= d )
        return JsonResponse({}, status=200)


def historical_task(request):

        d = datetime.today() + timedelta( days = 365*100 )
        d = datetime.today()

        #repeat once every day
        fetch_historicaldata( )
        return JsonResponse({}, status=200)

