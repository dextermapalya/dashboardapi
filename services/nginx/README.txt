AFTER BUILDING THE IMAGE FOR WEBSERVER

RUN BELOW COMMANDS TO CREATE USERS INSIDE DOCKER IMAGE
docker exec -it webserver htpasswd -c /etc/apache2/.htpasswd admin

You will then be prompted to supply the password for user admin


where .htpasswd is the physical file that container all user credentials
and 'admin' is the assigned username

To verify that the credentials were created run below COMMANDS

docker exec -it webserver cat /etc/apache2/.htpasswd

You should see a response similar to below line
admin:$apr1$U3Vlkhfy$EHDUgFZskRltYs4/oyd0O/
