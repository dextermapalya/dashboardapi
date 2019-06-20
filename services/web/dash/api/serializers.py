from rest_framework import serializers
#from django.contrib.auth.models import User, Group
#serializers
#from users.api.serializers import ProfileSerializer, UserSerializer
#models
from dash.models import Test
#import logging
#stdlogger = logging.getLogger(__name__)

class TestSerializer(serializers.ModelSerializer):

    description = serializers.CharField()
    priority = serializers.IntegerField()
    start_date = serializers.DateField()
    due_date = serializers.DateField()
    test1_title = serializers.CharField()
    tasktitle = serializers.CharField()
    status = serializers.IntegerField()

    class Meta:

        model = Test
        #fields = '__all__'
        depth=3
        fields = ('id','title', 'test1_title', 'tasktitle', 'status', 'description', 'priority', 'start_date', 'due_date')


class RawSerializer(serializers.ModelSerializer):
    class Meta:

        model = Test
        fields = '__all__'
