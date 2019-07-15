from django.urls import path, include
from dash import views
from dash.view import install
from dash.view import subscriptions
from dash.view import renewals
from dash.view import registrations

urlpatterns = [
    path('activeregistrations/<slug:dt_query>', registrations.activeregistrations, ),
    path('activeinstallations/<slug:dt_query>', install.activeinstallations, ),
    path('activesubscriptions/<slug:dt_query>', subscriptions.activesubscriptions, ),
    path('activerenewals/<slug:dt_query>', renewals.activerenewals, ),
    path('articles/', views.articles ),

]
