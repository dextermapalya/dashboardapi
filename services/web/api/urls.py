#from django.conf.urls import url, include
from django.urls import path, include
from django.conf.urls import url

from rest_framework import routers
from users.api.viewsets import ProfileViewSet, UserViewSet
#from dash.api.viewsets import  ActiveSubscriptionViewset
from dash.viewset import TestViewSet, SubscriptionViewSet
from dash import urls as dashboard_urls

router = routers.DefaultRouter()
router.register('users', UserViewSet)
router.register('profile', ProfileViewSet)
router.register('dash', TestViewSet, basename='Test')
router.register('dashboard/activesubscriptions', SubscriptionViewSet, basename='Subscription')


urlpatterns = [
    path('v1/', include(router.urls)),
    path('admin/', include('rest_framework.urls')),
    path('auth/', include('rest_auth.urls')),
    path('v1.1/', include(dashboard_urls)),
]
