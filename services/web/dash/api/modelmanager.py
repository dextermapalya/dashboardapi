from django.db import models
###
#  Querymanager for table 
###
class TestManager(models.Manager):
    ###
    # for regular queries filter only approved posts
    ###
    def get_queryset(self):
        return super().get_queryset()

    def all_objects(self):
        return super().get_queryset()

    def status(self, status_str= 'AP'):
        return self.all_objects()


