from django.core.management.base import BaseCommand, CommandError
from django.contrib.auth import get_user_model
from rolepermissions.roles import assign_role

class Command(BaseCommand):
    help = 'Create a user from the console python manage.py createuser <username> <email> <password>'

    def add_arguments(self, parser):
        # Positional arguments
        parser.add_argument('username', type=str)
        parser.add_argument('email', type=str)
        parser.add_argument('passwd', type=str)
        #parser.add_argument('role', type=str)
        parser.add_argument('-a', '--admin', action='store_true', help='Is user of type superuser')
        parser.add_argument('-s', '--staff', action='store_true', help='Is user of type staff')

    def add_roles(self, *args, **options):
        try:
            role = options['role']
            if (role):
                assign_role(user, role)
        except Exception as e:
            raise
        
    def handle(self, *args, **options):
        try:
            is_tech = False
            is_business = False
            is_management = False
            UserModel = get_user_model()
            user_name = options['username']
            mail = options['email']
            passwd = options['passwd']

            is_admin = options['admin']
            is_staff = options['staff']

            if not UserModel.objects.filter(username=user_name).exists():
                user=UserModel.objects.create_user(username=user_name, email=mail, password=passwd)
                user.is_superuser= is_admin
                user.is_staff = is_staff

                user.save()
                #self.set_role(options, user)
                self.stdout.write(self.style.SUCCESS("Successfully created user {} {}".format(user_name, mail) ) )
            else:
                raise CommandError("Duplicate user or email {} {}".format(user_name, mail) )
        except Exception as e:
            raise
