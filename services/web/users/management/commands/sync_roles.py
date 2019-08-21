from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand
from rolepermissions.roles import get_user_roles, clear_roles, assign_role


class Command(BaseCommand):

    help = "Sychronizes user Roles with the current available_permissions set in code."
    version = "1.0.0"

    def get_version(self):
        return self.version

    def handle(self, *args, **options):
        """For each user, grab their assigned roles, clear their roles, and then reassign them."""
        for user in get_user_model().objects.all():
            roles = get_user_roles(user=user)
            clear_roles(user=user)

            for role in roles:
                assign_role(user=user, role=role)
