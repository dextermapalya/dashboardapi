from django.contrib.auth.models import User, Group
from api.permissions import IsOwnerOrReadOnly
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework import generics, permissions, viewsets
from oauth2_provider.contrib.rest_framework import TokenHasReadWriteScope, TokenHasScope

#models
from dash.models import Test
#serializers
from .serializers import TestSerializer

def home(request):
    """
    Display home page.
    """
    #return Response({'data': 'You must suffix api/<feature>'})
    return JsonResponse({'error': 'Some error'}, status=401)


class TestViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows tags to be viewed or edited.
    """
    #permission_classes = [permissions.IsAuthenticated, TokenHasReadWriteScope]
    serializer_class = TestSerializer
    queryset = Test.objects.using('sample').raw("select a.*, b.* from test a, test1 b where a.id = b.test_id order by a.id;")

