# Create your models here.
#from django.shortcuts import render
from django.db import models
from django.utils.translation import ugettext_lazy as _
from dash.api.modelmanager import TestManager
#from django.db import connections

#https://django.cowhite.com/blog/dynamic-fields-in-django-rest-framwork-serializers/
#https://medium.com/@MicroPyramid/django-model-managers-and-properties-564ef668a04c



class Test(models.Model):
    title = models.CharField(max_length=100,unique=True, blank=False, null=False)
    #description = models.Text()

    def __str__(self):
        return self.title

    class Meta:
        ordering = []
        #app_label = 'db2'
        db_table = 'test'

    def list(self, query = {}):
        cursor = connections['sample'].cursor()
        cursor.execute("select * from test")
        return cursor.fetchall()

    #@property
    #def description(self):
    #    return None