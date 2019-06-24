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
from datetime import date
from .serializers import SubscriptionSerializer

def get_subscriptionquery():
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
    return query    

def jsonifysubscriptions(resultset):
        items = []

        if len(resultset) > 0:

            for item in resultset:
                print(item[0])
                items.append({'current_date':item[0],'active_subscriptions':item[1]})
                print(items)

        return items     


@api_view(['GET', 'POST'])
@permission_classes((permissions.IsAuthenticated,))
def activesubscriptions(request, id, dt_query ):
        try:
            response = {'code':303, 'data':[]} #init variable
            status_code = 200

            if request.method == 'POST':
                print(request.data)
                print(request.data["username"], request.data.get("password"))
                return JsonResponse({"message": "Got some data!", "data": request.data})
            
            else: 
                params = {'id': id, 'dt_query':dt_query}
                print(params)
                validator = SubscriptionSerializer( data = params )
                print()
                if validator.is_valid() == False:
                    raise Exception("Invalid rest Arguments")
                #query = "select * from test"    
                #cursor = connections['myplex_service'].cursor() #this is for multiple databases
                cursor =  connection.cursor() #this is for default database
                cursor.execute( get_subscriptionquery() )
                #query the db and jsonify the results
                r = [dict((cursor.description[i][0], value) \
                  for i, value in enumerate(row)) for row in cursor.fetchall()]
                cursor.connection.close()

                #jsondata = jsonifysubscriptions (  cursor.fetchall() )
                response = {"code": status_code, "data": r[0] }
                
        except Exception as e:
            #return an exception
            status_code = 303
            response = {'code':status_code, 'error' : str(e) , 'data':[]}
            pass
        finally:
            #sample json format
            #return JsonResponse({'error': 'This page is forbidden', 'items': items}, status=403)
            return JsonResponse( response, status = status_code )    
            

