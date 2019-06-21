from django.urls import path, include
from dash import views

urlpatterns = [
    path('activesubscription/<int:id>/<slug:date>', views.activesubscriptions, ),

]