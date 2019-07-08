import logging
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


