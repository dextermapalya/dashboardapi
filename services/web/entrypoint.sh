#!/bin/bash
###https://medium.com/@rohitkhatana/deploying-django-app-on-aws-ecs-using-docker-gunicorn-nginx-c90834f76e21
# Prepare log files and start outputting logs to stdout
touch /tmp/gunicorn.log
touch /tmp/gunicorn-access.log
tail -n 0 -f /tmp/*.log &
echo Starting nginx 
# Start Gunicorn processes
echo Starting Gunicorn.
exec gunicorn dashboard.wsgi:application \
    --name dashboard \
    --bind 8000 \
    --timeout  5000 \
    --workers 1 \
    --log-level=info \
    --log-file=/tmp/gunicorn.log \
    --access-logfile=/tmp/gunicorn-access.log 
