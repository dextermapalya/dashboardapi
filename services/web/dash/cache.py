
from django.core.cache import cache #for memcache
#from dash.cache import registration_key #import the name of the key for cache the registration views

installaion_key = 'app_installations'
renewals_key = 'renewals'
subscription_key = 'subscriptions'
registration_key = 'registration_key'

####
#  cache any data
#  arguments duration, key, data to be cached
#  return None
###
def cache_it(**kwargs):
    try:
        if 'key' not in kwargs.keys():
            raise Exception("Key is a required argument")
        if 'duration' not in kwargs.keys():
            raise Exception("Cache duration is a required argument")
        if 'data' not in kwargs.keys():
            raise Exception("Data is a required argument")
        key = kwargs.get('key')
        data = kwargs.get('data')
        duration = kwargs.get('duration')
        
        cache.set(key, data, duration) #store the response in cache
    except Exception as e:
        raise

####
#  retrieve cached data
#  arguments key
#  return None or cached data
###
def get_cache(key = None):
    try:
       if (key is None):
           raise Exception("Cache key is required")
       data = cache.get(key) # returns None if no key-value pair
    except Exception as e: 
        raise