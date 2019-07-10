import time
from datetime import timedelta

####
#  start a timer helps log total time consumed for an operations
#  arguments None
#  return time
###
def start_timer():
    return time.time()

####
#  stop a timer helps log total time consumed for an operations
#  argument start_time 
#  returns formatted string of difference between begin and end time
###
def stop_timer( start_time = time.time() ):
    elapsed_time_secs = time.time() - start_time
    duration = "%s secs (Wall clock time)" % timedelta(seconds=round(elapsed_time_secs))
    return duration