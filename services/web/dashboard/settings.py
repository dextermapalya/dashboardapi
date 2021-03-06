"""
Django settings for dashboard project.

Generated by 'django-admin startproject' using Django 2.2.1.

For more information on this file, see
https://docs.djangoproject.com/en/2.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/2.2/ref/settings/
"""

import os, datetime
from dash.databaserouter import DatabaseRouter
from django.core.exceptions import ImproperlyConfigured

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
APPEND_SLASH = True
# Handling Key Import Errors
def get_env_variable(var_name):
    """ Get the environment variable or return exception """
    try:
        return os.environ[var_name]
    except KeyError:
        error_msg = "Set the %s environment variable" % var_name
        raise ImproperlyConfigured(error_msg)

# Get ENV VARIABLES key
ENV_ROLE = get_env_variable('ENV_ROLE')

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/2.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = '_pt!pe+n$mw-&^62dh6s38@@sx%im)5h&3s@$d6fs*)_*!x7fz'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

#ALLOWED_HOSTS = []
ALLOWED_HOSTS = ['*']


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework', # <-- add this 3rd party module
    'oauth2_provider', # <-- add this 3rd party module
    'corsheaders', # <-- add this 3rd party module
    'background_task', # <-- add this 3rd party module
    'rest_framework.authtoken', # Add this line for JWT
    'rest_auth',                # Add this line for JWT

    'users', # <-- add this module name created using python manage.py startapp users
    'api', # <-- add this module name created using python manage.py startapp api
    'dash', # <-- add this module name created using python manage.py startapp dash
    'scheduler', # <-- add this module name created using python manage.py startapp scheduler
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'corsheaders.middleware.CorsMiddleware',
]

ROOT_URLCONF = 'dashboard.urls'
BACKEND_DIR = BASE_DIR
FRONTEND_DIR = os.path.abspath(
    os.path.join(BASE_DIR, '..', 'react-frontend'))
print("**** {0}".format(FRONTEND_DIR))
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        #DIRS': [],
        'DIRS': [os.path.join(BASE_DIR, 'react-frontend')],
        #'DIRS': [os.path.join(FRONTEND_DIR, 'build')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'dashboard.wsgi.application'


# Database
# https://docs.djangoproject.com/en/2.2/ref/settings/#databases

#DATABASES = {
#    'default': {
#        'ENGINE': 'django.db.backends.sqlite3',
#        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
#    }
#}
#DATABASE_ROUTERS = ['dash.databaserouter.DatabaseRouter']
DATABASE_APPS_MAPPING = {'db2':'sample'}
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'dashboard',
        'USER': 'django',
        'PASSWORD': 'djangosEcrEt',
        'HOST': 'mysqldb',
        'PORT': 3306,
    },
    #'db1': {
    #    'ENGINE': 'django.db.backends.mysql',
    #    'NAME': get_env_variable('MYSQL_DB'),
    #    'USER': get_env_variable('MYSQL_USER'),
    #    'PASSWORD': get_env_variable('MYSQL_PASSWORD'),
    #    'HOST': get_env_variable('MYSQL_HOST'),
    #    'PORT': get_env_variable('MYSQL_PORT'),
    #},
    'myplex_service': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'myplex_service',
        'USER': 'django',
        'PASSWORD': 'djangosEcrEt',
        'HOST': 'mysqldb',
        'PORT': 3306,
    },
    'remote': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'myplex_service',
        'USER': 'dashboard',
        'PASSWORD': 'SunDas!br@82',
        'HOST': '10.10.9.44',
        'PORT': 3306,
        'OPTIONS': {
                    'charset': 'latin1',
                    'use_unicode': True, 
        },        
    }
}


# Password validation
# https://docs.djangoproject.com/en/2.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/2.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/2.2/howto/static-files/
    
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'static') #<-- THIS IS FOR rendering static files inside a docker container
STATICFILES_DIRS = (
    os.path.join(BASE_DIR, 'react-frontend', "build", "static"),  # update the STATICFILES_DIRS
)
#STATICFILES_DIRS = [os.path.join(FRONTEND_DIR, 'build', 'static')]

REST_FRAMEWORK = {
   'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 10, # <!-- if pagination is used set the default value here
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.BasicAuthentication',
        #'oauth2_provider.contrib.rest_framework.OAuth2Authentication', #uncomment when oauth is required
        'rest_framework_jwt.authentication.JSONWebTokenAuthentication'
    ),
    # Use Django's standard `django.contrib.auth` permissions,
    # or allow read-only access for unauthenticated users.
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.DjangoModelPermissionsOrAnonReadOnly',
        'rest_framework.permissions.IsAuthenticated',
        'rest_framework.permissions.AllowAny',

    ]
    
}

OAUTH2_PROVIDER = {
    # this is the list of available scopes
    'SCOPES': {'read': 'Read scope', 'write': 'Write scope', 'groups': 'Access to your groups'}
}

AUTHENTICATION_BACKENDS = (
    #'rest_framework_social_oauth2.backends.DjangoOAuth2',
    'django.contrib.auth.backends.ModelBackend',
)

#MODIFY THE USER MODEL WITH A CUSTOMER USER MODEL
#https://wsvincent.com/django-tips-custom-user-model/
#AUTH_USER_MODEL = 'users.User' # new

CORS_ORIGIN_ALLOW_ALL = True

#https://www.webforefront.com/django/setupdjangologging.html
LOGGING = {
    'version': 1,
    'disable_existing_loggers': True,
    'filters': {
        'require_debug_false': {
            '()': 'django.utils.log.RequireDebugFalse',
        },
        'require_debug_true': {
            '()': 'django.utils.log.RequireDebugTrue',
        },
    },
    'formatters': {
        'simple': {
            'format': '[%(asctime)s] %(levelname)s %(message)s',
            'datefmt': '%Y-%m-%d %H:%M:%S'
        },
        'verbose': {
            'format': '[%(asctime)s] %(levelname)s [%(name)s.%(funcName)s:%(lineno)d] %(message)s',
            'datefmt': '%Y-%m-%d %H:%M:%S'
        },
    },
    'handlers': {
        'console': {
            'level': 'DEBUG',
            'filters': ['require_debug_true'],
            'class': 'logging.StreamHandler',
            'formatter': 'simple'
        },
        'development_logfile': {
            'level': 'DEBUG',
            'filters': ['require_debug_true'],
            'class': 'logging.FileHandler',
            'filename': '/tmp/django_dev.log',
            'formatter': 'verbose'
        },
        'production_logfile': {
            'level': 'ERROR',
            'filters': ['require_debug_false'],
            'class': 'logging.handlers.RotatingFileHandler',
            'filename': '/var/logs/django/django_production.log',
            'maxBytes' : 1024*1024*100, # 100MB
            'backupCount' : 5,
            'formatter': 'simple'
        },
        'dba_logfile': {
            'level': 'DEBUG',
            'filters': ['require_debug_false','require_debug_true'],
            'class': 'logging.handlers.WatchedFileHandler',
            'filename': '/var/logs/django/django_dba.log',
            'formatter': 'simple'
        },
    },
    'root': {
        'level': 'INFO',
        'handlers': ['console'],
    },
    'loggers': {
        'blog': {
            'handlers': ['development_logfile','production_logfile'],
         },
        'dba': {
            'handlers': ['dba_logfile'],
        },
        'django': {
            'handlers': ['development_logfile','production_logfile'],
        },
        'py.warnings': {
            'handlers': ['development_logfile'],
        },
        'django.db.backends': {
            'level': 'DEBUG',
            #'handlers': ['console','development_logfile','production_logfile'],
            'handlers': ['development_logfile','production_logfile'],
        }
    }
}


###JWT SETTINGS
JWT_AUTH = {
 
    'JWT_VERIFY': True,
    'JWT_VERIFY_EXPIRATION': True,
    'JWT_EXPIRATION_DELTA': datetime.timedelta(seconds=3000),
    'JWT_AUTH_HEADER_PREFIX': 'Bearer',
 
}

REST_USE_JWT = True

CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.memcached.MemcachedCache',
        'LOCATION': 'memcached:11211',
    }
}

ACCOUNT_AUTHENTICATION_METHOD = 'email'
ACCOUNT_EMAIL_REQUIRED = True
ACCOUNT_USERNAME_REQUIRED = False