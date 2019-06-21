#from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
#from django.contrib.auth.models import User, Group
from rest_framework import generics, permissions
from rest_framework import serializers

from dash.models import Test, Subscription
from dash.api.serializers import TestSerializer, ActiveSubscriptionSerializer
#from rest_framework.response import Response
#from django.http import JsonResponse
#from oauth2_provider.contrib.rest_framework import TokenHasReadWriteScope, TokenHasScope
import logging
stdlogger = logging.getLogger(__name__)

class TestViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    #if using oauth2 then uncomment code with TokenHasReadWriteScope
    #permission_classes = [permissions.IsAuthenticated, TokenHasReadWriteScope]
    permission_classes = [permissions.IsAuthenticated]

    #queryset = Test.objects.using('sample').order_by('-id')
    #query = "select a.*, b.*, c.* from test a, test1 b, tasks c where a.id = b.test_id and a.id = c.test_id"
    query = "SELECT a.title, 1 id, b.title as test1_title, c.title as tasktitle, c.start_date, c.due_date, c.status, c.priority, c.description from test a, test1 b, tasks c where a.id = b.test_id and a.id = c.test_id"
    queryset = Test.objects.using('myplex_service').raw(query)

    serializer_class = TestSerializer


class SubscriptionViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows subscriptions to be viewed.
    """
    #if using oauth2 then uncomment code with TokenHasReadWriteScope
    #permission_classes = [permissions.IsAuthenticated, TokenHasReadWriteScope]
    permission_classes = [permissions.IsAuthenticated]

    #queryset = Test.objects.using('sample').order_by('-id')
    #query = "select a.*, b.*, c.* from test a, test1 b, tasks c where a.id = b.test_id and a.id = c.test_id"
    
    query = """SELECT 1 as id, CURRENT_DATE() as cdate ,COUNT(DISTINCT a.cp_customer_id) active_subs
            FROM(
            SELECT  p.cp_customer_id AS cp_customer_id
            FROM subscription s
            INNER JOIN  payment p
            ON s.cp_customer_id=p.cp_customer_id
            AND s.order_id = p.order_id 
            INNER JOIN  package_def t
            ON s.package_id=t.package_id 
            INNER JOIN  package_rate r
            ON r.package_id=s.package_id
            AND CAST(p.received_date AS DATE) BETWEEN CAST(r.start_date AS DATE) 
            AND CAST(CASE WHEN r.end_date IS NULL THEN '2099-12-31' ELSE r.end_date END AS DATE)
            AND CASE WHEN p.payment_method <>'App Store Billing' THEN 'Retail Price' ELSE payment_method END =r.rate_type
            WHERE p.posting_status = 'Posted'  AND p.payment_type IN('Purchase','Renewal') AND is_refund IS NULL
            AND cancellation_date IS NULL AND DATE(s.validity_end_date)>=CONVERT_TZ(NOW(),'GMT','Asia/Kolkata')
            GROUP BY 1
            UNION ALL
            SELECT  cp_customer_id
            FROM  revenue_transaction_details
            WHERE payment_type IN('Purchase','Renewal') AND transaction_status ='Posted' AND
            DATE(validity_end_date)>=CONVERT_TZ(NOW(),'GMT','Asia/Kolkata') AND cancellation_date IS NULL
            GROUP BY 1      
            ) a
            GROUP BY 1"""
    query = """
            SELECT  id, cp_customer_id
            FROM  revenue_transaction_details
            WHERE payment_type IN('Purchase','Renewal') AND transaction_status ='Posted' AND
            DATE(validity_end_date)>=CONVERT_TZ(NOW(),'GMT','Asia/Kolkata') AND cancellation_date IS NULL
            GROUP BY id
            """              
    stdlogger.info(query)
    queryset = Subscription.objects.raw(query)
    #for item in queryset:
    #    print(item.subscr_status, item.validity_period)

    serializer_class = ActiveSubscriptionSerializer

