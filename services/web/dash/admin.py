from django.contrib import admin

# Register your models here.
from django.contrib import admin
from dash.models import Test
# Register your models here.

class TestAdmin(admin.ModelAdmin):
    list_display = ('id', 'title')
    #fields = ('title', 'created_at', 'updated_at')

admin.site.register(Test)
