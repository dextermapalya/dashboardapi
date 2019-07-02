# Create your views here.
#from rest_framework.response import Response
from django.http import JsonResponse
from django.db import connections
from django.db import connection
import csv, itertools, json
from django.core.serializers.json import DjangoJSONEncoder
from rest_framework.decorators import api_view
from rest_framework import generics, permissions, viewsets
from rest_framework.decorators import api_view, permission_classes
from django.shortcuts import render

class CursorByName():
    def __init__(self, cursor):
        self._cursor = cursor
    
    def __iter__(self):
        return self

    def __next__(self):
        row = self._cursor.__next__()

        return { description[0]: row[col] for col, description in enumerate(self._cursor.description) }
    

def index(request):
    return render(request, "build/index.html")

def home(request):
    """
    Display home page.
    """
    #return Response({'data': 'You must suffix api/<feature>'})
    cursor = connections['myplex_service'].cursor()
    print(request)
    query = """
        SELECT  CURRENT_DATE() as cdate ,COUNT(DISTINCT a.cp_customer_id) as active_subs
        FROM(
        SELECT  p.cp_customer_id AS cp_customer_id
        FROM SUNNXT_CHARGING_DB.subscription s
        INNER JOIN SUNNXT_CHARGING_DB.payment p
        ON s.cp_customer_id=p.cp_customer_id
        AND s.order_id = p.order_id 
        INNER JOIN SUNNXT_CHARGING_DB.package_def t
        ON s.package_id=t.package_id 
        INNER JOIN SUNNXT_CHARGING_DB.package_rate r
        ON r.package_id=s.package_id
        AND CAST(p.received_date AS DATE) BETWEEN CAST(r.start_date AS DATE) 
        AND CAST(CASE WHEN r.end_date IS NULL THEN '2099-12-31' ELSE r.end_date END AS DATE)
        AND CASE WHEN p.payment_method <>'App Store Billing' THEN 'Retail Price' ELSE payment_method END =r.rate_type
        WHERE p.posting_status = 'Posted'  AND p.payment_type IN('Purchase','Renewal') AND is_refund IS NULL
        AND cancellation_date IS NULL AND DATE(s.validity_end_date)>=CONVERT_TZ(NOW(),'GMT','Asia/Kolkata')
        GROUP BY 1
        UNION all
        SELECT  cp_customer_id
        FROM SUNNXT_CHARGING_DB.revenue_transaction_details
        WHERE payment_type IN('Purchase','Renewal') AND transaction_status ='Posted' AND
        DATE(validity_end_date)>=CONVERT_TZ(NOW(),'GMT','Asia/Kolkata') AND cancellation_date IS NULL
        GROUP BY 1
        ) a
        GROUP BY 1;
        """
    #query = "select * from test"    
    cursor.execute(query)
    rows = cursor.fetchall()
    #return cursor.fetchall()
    items = {'current_date':'','active_subscriptions':''}
    items = []
    if len(rows) > 0:
        print("Match  found\n")
        
    for item in rows:
       print(item[0])
       #items.update(current_date = 23,active_subscriptions=2)
       #print(items)
       data = json.loads(json.dumps(item, sort_keys=True, default=str))
       items.append({'current_date':item[0],'active_subscriptions':item[1]})
       print(data)


       #items.append( data)
    #return JsonResponse(list(itertools.chain(*rows)), safe=False)   


    return JsonResponse({'error': 'This page is forbidden', 'items': items}, status=403)

@api_view(['GET', 'POST'])
@permission_classes((permissions.IsAuthenticated,))
def activesubscriptions(request, id=-1):
       #permission_classes = [permissions.IsAuthenticated]
       if request.method == 'POST':
        print(request.data)
        print(request.data["username"], request.data.get("password"))
        return JsonResponse({"message": "Got some data!", "data": request.data})
       else: 
        res = {'id': id}
        return JsonResponse({"message": "Got some data!", "data": res})
