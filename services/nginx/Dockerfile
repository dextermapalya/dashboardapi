FROM nginx:1.15.0-alpine
#FROM alpine:3.7

RUN apk add --no-cache \
  apache2-utils

RUN mkdir -p /etc/apache2/

RUN rm /etc/nginx/conf.d/default.conf
COPY /*.conf /etc/nginx/conf.d/

#copy the passwords file that authenticates users
COPY .htpasswd /etc/apache2/
