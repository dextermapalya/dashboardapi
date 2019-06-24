from django.urls import path, include
from dash import views

urlpatterns = [
    path('activesubscription/<int:id>/<slug:dt_query>', views.activesubscriptions, ),

]