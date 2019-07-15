###########
# BUILDER #
###########

# Base Image
FROM python:3.6 as builder

#########
# FINAL #
#########

# Base Image
FROM python:3.6-slim

# ----- NEW ----
# Install curl
RUN apt-get update && apt-get install -y \
    build-essential \
    mysql-client \
    python-mysqldb \
    python3-mysqldb \
    python3-dev \
    libpython3-dev \
    #libmysqlclient-dev \
    libpng-dev \
    libjpeg62-turbo-dev \
    libfreetype6-dev \
    locales \
    zip \
    jpegoptim optipng pngquant gifsicle \
    vim \
    unzip \
    git \
    curl \
    libpq-dev \
    python-dev \
    supervisor \
    cron \
    #py-mysqldb \
    default-libmysqlclient-dev

#    libmysqlclient-dev

#####setup virtualenv for python if required ####
#RUN pip install virtualenv
#RUN virtualenv -p python3.6 virtual
#RUN /bin/bash -c "source /virtual/bin/activate"
#####setup virtualenv for python if required ####
##### ####
# copy supervisor conf file
#######
COPY supervisord.conf /etc/supervisor.d/dashboard.ini


# Copy django-cron file to the cron.d directory
COPY django-cron /etc/cron.d/django-cron
###COPY django-cron /var/spool/cron/crontabs/app




# Install Requirements
COPY requirements.txt /
#RUN pip wheel --no-cache-dir --no-deps --wheel-dir /wheels -r requirements.txt
RUN pip install -r requirements.txt
RUN mkdir -p /srv/logs
RUN mkdir -p /var/logs/django
RUN mkdir -p /var/logs/supervisord
RUN mkdir -p /var/logs/cron


# Create directory for the app user
RUN mkdir -p /home/project
#set variable for log directory
ENV LOG_DIR=/var/logs/

#create a log directory if does not exist
RUN mkdir -p $LOG_DIR
#copy the empty file into /var/log/django to avoid errors wheny django initialises
RUN echo "-" > /var/logs/django/django_dba.log
RUN echo "-" > /var/logs/django/gunicorn-error.log
RUN echo "-" > /var/logs/django/gunicorn-access.log
RUN echo "-" > /var/logs/supervisord/django-stderr.log
RUN echo "-" > /var/logs/supervisord/django-stdout.log
# Create the log file to be able to run tail
RUN echo "-" > /var/logs/cron/cron.err.log
RUN echo "-" > /var/logs/cron/cron.out.log

# Create the app user
RUN groupadd app && useradd -g app app

# Create the home directory
ENV HOME=/home/project
#location inside the container, where the django python files will reside, change it to a folder of your choice
ENV APP_HOME=/home/project/web
RUN mkdir $APP_HOME
WORKDIR $APP_HOME

##### ####
# copy gunicorn.conf  file
#######
COPY gunicorn.conf $APP_HOME

# Install Requirements
#COPY --from=builder /wheels /wheels
#COPY --from=builder requirements.txt .
#RUN pip install --no-cache /wheels/*

# Copy in the Django code
COPY . $APP_HOME

# Chown all the files to the app user
RUN chown -R app:app $APP_HOME

# Chown all the /var/log files to the app user
RUN chown -R app:app $LOG_DIR
RUN chown -R app:app /var/
#COPY config/crontab /etc/cron.d/cron 
#RUN rm -Rf /etc/cron.daily  && \
#    rm -Rf /etc/cron.weekly && \
#    rm -Rf /etc/cron.monthly && \
#    rm -Rf /etc/cron.hourly && \
#    chmod a+x /etc/cron.d/cron

RUN chgrp app /var/run/ && \
    usermod -a -G app app

#RUN service cron start
# Apply cron job
# Give execution rights on the cron job
###RUN chown -R app:crontab /var/spool/cron/crontabs/app \
### && chmod 600 /var/spool/cron/crontabs/app

# Give execution rights on the cron job
RUN chmod 0644 /etc/cron.d/django-cron
# Apply cron job
RUN crontab /etc/cron.d/django-cron

# Change to the app user
#USER app

# expose the port 8000
EXPOSE 8000

# run server
#since wsgi.py resides inside dashboard folder and the application service is started from level outside
# that is from the location where manage.py is located in such cases --chdir must be used
# define the default command to run when starting the container
#CMD ["gunicorn", "--chdir", "dashboard", "--bind", ":8000", "dashboard.wsgi:application"]
####CMD ["gunicorn", "--bind", ":8000", "--error-logfile","=/tmp/gunicorn.log", "dashboard.wsgi:application"]
####CMD ["gunicorn", "--bind", ":8000", "dashboard.wsgi:application"]
#### WORKING ####CMD ["gunicorn", "--bind", ":8000","--workers", "2", "--timeout", "120", "--log-level","debug", "--access-logfile=/tmp/gunicorn-access.log", "--error-logfile=/tmp/gunicorn-error.log", "dashboard.wsgi:application"]
#CMD ["python", "manage.py", "runserver"]
#ENTRYPOINT ["/home/project/web/entrypoint.sh"]
#CMD ["/home/project/web/entrypoint.sh"]
###CMD ["supervisord", "-c", "/etc/supervisor.d/supervisord.conf"]
CMD ["supervisord", "-c", "/etc/supervisor.d/dashboard.ini"]
