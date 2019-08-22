docker mysql root password is stored in .env file
connect into docker container and login with root privileges

>  mysql -u root -psecret

Once logged into mysql grant all privileges to user django

> GRANT ALL PRIVILEGES ON *.* TO 'django'@'%' IDENTIFIED BY 'djangosEcrEt';

exit from mysql and re-login with username django


now user django should have all privileges

