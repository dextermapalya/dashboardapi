from django.contrib.auth.models import User, Group
from api.permissions import IsOwnerOrReadOnly
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework import generics, permissions, viewsets
#from oauth2_provider.contrib.rest_framework import TokenHasReadWriteScope, TokenHasScope

#models
from dash.models import Test, Subscription
#serializers
from .serializers import TestSerializer, ActiveSubscriptionSerializer
import logging
stdlogger = logging.getLogger(__name__)


class TestViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows tags to be viewed or edited.
    """
    #permission_classes = [permissions.IsAuthenticated, TokenHasReadWriteScope]
    serializer_class = TestSerializer
    queryset = Test.objects.using('sample').raw("select a.*, b.* from test a, test1 b where a.id = b.test_id order by a.id;")




class ActiveSubscriptionViewSet(viewsets.ModelViewSet):
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
            SELECT s.ord_prod_id, p.cp_customer_id AS cp_customer_id, p.payment_id
            FROM subscription s
            INNER JOIN payment p
            ON s.cp_customer_id=p.cp_customer_id
            AND s.order_id = p.order_id 
            INNER JOIN   package_def t
            ON s.package_id=t.package_id 
            INNER JOIN   package_rate r
            ON r.package_id=s.package_id
            AND CAST(p.received_date AS DATE) BETWEEN CAST(r.start_date AS DATE) 
            AND CAST(CASE WHEN r.end_date IS NULL THEN '2099-12-31' ELSE r.end_date END AS DATE)
            AND CASE WHEN p.payment_method <>'App Store Billing' THEN 'Retail Price' ELSE payment_method END =r.rate_type
            WHERE p.posting_status = 'Posted'  AND p.payment_type IN('Purchase','Renewal') AND is_refund IS NULL
            AND cancellation_date IS NULL AND DATE(s.validity_end_date)>=CONVERT_TZ(NOW(),'GMT','Asia/Kolkata')
            GROUP BY 1
            UNION ALL
            SELECT cp_customer_id, id
            FROM   revenue_transaction_details
            WHERE payment_type IN('Purchase','Renewal') AND transaction_status ='Posted' AND
            DATE(validity_end_date)>=CONVERT_TZ(NOW(),'GMT','Asia/Kolkata') AND cancellation_date IS NULL
            GROUP BY 1      
            ) a
            GROUP BY 1"""
    stdlogger.info(query)
    queryset = Subscription.objects.using('default').raw(query)

    serializer_class = ActiveSubscriptionSerializer
