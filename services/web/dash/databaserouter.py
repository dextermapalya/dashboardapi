import logging
stdlogger = logging.getLogger(__name__)

#this class is for handingly multiple databases in a single django app
class DatabaseRouter:
    """
    A router to control all database operations on models in the
    user application.
    """
    def db_for_read(self, model, **hints):
        """
        Attempts to read user models go to users_db.
        """
        if model._meta.app_label == 'db2':
            return 'sample'
        return None

    def db_for_write(self, model, **hints):
        """
        Attempts to write user models go to users_db.
        """
        if model._meta.app_label == 'db2':
            return 'sample'
        return None

    def allow_relation(self, obj1, obj2, **hints):
        """
        Allow relations if a model in the user app is involved.
        """
        if obj1._meta.app_label == 'db2' or \
           obj2._meta.app_label == 'sample':
           return True
        return None

    def allow_migrate(self, db, app_label, model_name=None, **hints):
        """
        Make sure the auth app only appears in the 'users_db'
        database.
        """
        stdlogger.info("Running migration  {} ** {}".format(app_label, db) )
        if app_label == 'db2':
            stdlogger.info("Running migration for db2........")
            return db == 'sample'
        return None
