#from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
#from django.contrib.auth.models import User, Group
from rest_framework import generics, permissions
from rest_framework import serializers

from dash.models import Test
from dash.api.serializers import TestSerializer
#from rest_framework.response import Response
#from django.http import JsonResponse
from oauth2_provider.contrib.rest_framework import TokenHasReadWriteScope, TokenHasScope
#import logging
#stdlogger = logging.getLogger(__name__)

class TestViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    permission_classes = [permissions.IsAuthenticated, TokenHasReadWriteScope]
    #queryset = Test.objects.using('sample').order_by('-id')
    #query = "select a.*, b.*, c.* from test a, test1 b, tasks c where a.id = b.test_id and a.id = c.test_id"
    query = "SELECT a.id, a.title, b.title as test1_title, c.title as tasktitle, c.start_date, c.due_date, c.status, c.priority, c.description from test a, test1 b, tasks c where a.id = b.test_id and a.id = c.test_id"
    queryset = Test.objects.using('sample').raw(query)

    serializer_class = TestSerializer
