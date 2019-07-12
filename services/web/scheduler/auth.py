import requests
import logging
from requests.auth import AuthBase

stdlogger = logging.getLogger(__name__)
from scheduler import BASE_URL, AUTH_URL, USER_CREDENTIALS


class TokenAuth(AuthBase):
    """Implements a custom authentication scheme."""

    def __init__(self, token):
        self.token = token

    def __call__(self, r):
        """Attach an API token to a custom auth header."""
        r.headers['Authorization: Bearer'] = f'{self.token}'  # Python 3.6+
        response.headers['Content-Type'] = 'application/json; charset=utf-8'
        return r

###
#  login
#  login to api using default credentials
#  arguments none
#  return valid token as string
####
def login():
    try:
        #postData = {'username':'app', 'password': 'apalya01', 'scope': 'read' }
        url = BASE_URL + AUTH_URL 
        response = requests.post(url, data =  USER_CREDENTIALS )
        json_response = response.json()
        stdlogger.info("@@@@@@@ AUTH credentials {0}".format( json_response )  )

    except Exception as e:
            #return an exception
            raise
    finally:
        return json_response["token"]

