from rolepermissions.roles import AbstractUserRole

class Tech(AbstractUserRole):

    available_permissions = {
        'view_dashboard_registrations': True,
        'view_dashboard_renewals': True,
        'view_dashboard_installations': True,
        'view_dashboard_subscriptions': True,
        'view_apperrors': True,
    }

    def __str__(self):
        return 'Tech'

    def __repr__(self): 
        return 'Tech'    

class Management(AbstractUserRole):
    available_permissions = {
        'view_dashboard_registrations': True,
        'view_dashboard_installations': True,
    }

    def __str__(self):
        return 'Management'

class Business(AbstractUserRole):
    
    available_permissions = {
        'view_dashboard_renewals': True,
        'view_dashboard_subscriptions': True,
    }

    def __str__(self):
        return 'Business'
