if data does not appear in the browser then check and edit docker-compose.yml
Under services web, there is a environment variable called mode: 'local'
Update this to either 'local' or 'production' depending on the environment the app is running

copy react build into docker container
docker cp build webserver:/home/project/web/react-frontend/

