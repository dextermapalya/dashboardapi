from django.urls import path, include
from scheduler import views

urlpatterns = [
    path('current/', views.current_task ),
    path('historical/', views.historical_task ),
]
