import logging
stdlogger = logging.getLogger(__name__)
from datetime import date, datetime

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
