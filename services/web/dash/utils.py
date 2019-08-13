import logging
import time
from datetime import date
from datetime import datetime
from datetime import timedelta  

stdlogger = logging.getLogger(__name__)

#to differentiate between local and production environments
#use an environment variable to pick remote or local db
# this is useful for local development because remote db is not accessible locally

###
# get value for a given environment variable
##
def get_env_variable(var_name):
    """ Get the environment variable or return exception """

    import os, datetime
    from django.core.exceptions import ImproperlyConfigured
    try:
        return os.environ[var_name]
    except KeyError:
        error_msg = "Set the %s environment variable" % var_name
        raise ImproperlyConfigured(error_msg)

def get_db_connection():

    try:
        db_conn = get_env_variable('MODE')
        if (db_conn == "local"):
            return "myplex_service"
        if (db_conn == "production"):
            return "remote"    
    except Exception as e:
        #got an error so lets use local db
        db_conn = 'myplex_service'    
        pass #no need to raise exception

    return db_conn    

##
# check if 2 dates are identical
##
def date_is_identical(dt = None):

    is_identical = False

    try:
        if dt is not None:
            today = datetime.today().strftime('%Y-%m-%d')
            if dt == today:    
                is_identical = True
    except Exception as e:
        stdlogger.debug("Error verifying identical date {0}".format( str(e) ) )
        pass
    finally:
        return is_identical                

###
#  jsonify queryset
#  argument resultset
#  return array
###
def jsonifyqueryset( resultset, **kwargs):
        items = []

        if len(kwargs) <= 0:
           raise Exception("Invalid db keys")     

        #resultset = kwargs.get('resultset')
        #keys = kwargs.get('keys')
        keys = kwargs.keys()
        print(keys)

        if len(resultset) > 0:
            for item in resultset:
                #print(item[0])
                #lambda function to build a row in one line of code using comprehension
                row = {key: item[kwargs.get(key)] for key in keys}
                # lambda function using dictionary map
                #row = dict( map( (lambda x: (x, keys[x]) if x in keys else (x,None)), keys)
                #items.append({'current_date':item[0],'active_subscriptions':item[1]})
                items.append(row)
                #print(items)
            print(items)
        return items     

####
# today_in_epoch()
# convert today to epoch_milliseconds
####   
def today_in_epoch():
        epoch_time = []
        try:
            startTime = datetime.today().strftime('%Y-%m-%d') + " 0:0:0"
            epoch_time[0] = int( float(  startTime.timestamp() ) * 1000 )
            #endTime = datetime.today().strftime('%Y-%m-%d') + " " + datetime.today().strftime('%Y-%m-%d') + ":" + "59" + "59"
            this_hour = startTime + timedelta(hours=1)
            #epoch_time[1] = int( float(  this_hour.timestamp() ) * 1000 )
            epoch_time[1] = int( float( time.time() ) * 1000.0 )
            return epoch_time
            ###yield (startDate +  timedelta(days= rdays ) )
            #yield d_in_ms
            #dt = str( random.randint(1,30) ) + "." + str( random.randint(1,12) )$
            #tm = str( random.randint(0,23) ) + ":" + str( random.randint(0,59) )$
            #d = datetime.strptime(dt + " " + tm + ",76", "%d.%m.%Y %H:%M:%S,%f")$
            #d_in_ms = int(float(d)*1000)
        except Exception as e:
            raise

####
# date_in_epoch()
# convert date to epoch_milliseconds
# argument date string
# returns 2 epoch millisecond times from 12am of given date to 11:59 or midnight of given date 
####   
def date_in_epoch(dt):
        epoch_time = []
        try:
            startDate = datetime.strptime(dt + " 00:00:00", "%Y-%m-%d %H:%M:%S") #DateTime(2000,1,1)
            epoch_time.append(  int( float(  startDate.timestamp() ) * 1000 ) )
            #endTime = datetime.today().strftime('%Y-%m-%d') + " " + datetime.today().strftime('%Y-%m-%d') + ":" + "59" + "59"
            this_hour = startDate + timedelta( hours = 24 )
            #epoch_time[1] = int( float(  this_hour.timestamp() ) * 1000 )
            #epoch_time[1] = int( float( time.time() ) * 1000.0 ) #//this works for now() time uncomment and use if required
            epoch_time.append( int( float(  this_hour.timestamp() ) * 1000 ) )
            stdlogger.info(" EPOCH TIME {0}".format( epoch_time) )
            return epoch_time
        except Exception as e:
            raise
                