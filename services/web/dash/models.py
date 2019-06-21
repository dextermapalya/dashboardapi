# Create your models here.
#from django.shortcuts import render
from django.db import models
from django.utils.translation import ugettext_lazy as _
from dash.api.modelmanager import TestManager
from django.db import connections
import logging
stdlogger = logging.getLogger(__name__)

#https://django.cowhite.com/blog/dynamic-fields-in-django-rest-framwork-serializers/
#https://medium.com/@MicroPyramid/django-model-managers-and-properties-564ef668a04c

class Test(models.Model):
    title = models.CharField(max_length=100,unique=True, blank=False, null=False)
    #description = models.Text()

    def __str__(self):
        return self.title

    class Meta:
        ordering = []
        #app_label = 'db2'
        db_table = 'test'

    def list(self, query = {}):
        cursor = connections['sample'].cursor()
        cursor.execute("select * from test")
        return cursor.fetchall()

    #@property
    #def description(self):
    #    return None

class MyplexUser(models.Model):
    
    id = models.IntegerField(null=True, primary_key=True)
    first = models.CharField(max_length=192,  null=True)
    last = models.CharField(max_length=192,  null=True)
    password_hash = models.CharField(max_length=384,  null=True)
    mobile_no = models.CharField(max_length=96,  null=True)
    mobile_no_verified = models.SmallIntegerField( null=True)
    dob = models.DateField(auto_now=False, auto_now_add=False, null=True)
    gender = models.CharField(max_length=6,  null=True)
    created_on = models.DateTimeField(auto_now=False, auto_now_add=False, null=True)
    modified_on = models.DateTimeField(auto_now=False, auto_now_add=False, null=True)
    guest_device_id = models.IntegerField(null=True)
    #guest_device_id = models.ForeignKey(MyplexUserDevice, db_column='id')
    free_subscriber =  models.SmallIntegerField( null=True)
    age =  models.CharField(max_length=6,  null=True)
    email_id = models.CharField(max_length=255,  null=True)


    #description = models.Text()

    def __str__(self):
        return '%s %s' % (self.first, self.last)

    class Meta:
        ordering = []
        db_table = 'myplex_user_user'


class MyplexUserDevice(models.Model):
    
    id = models.IntegerField(null=True, primary_key=True)
    os = models.CharField(max_length=192,  null=True)
    os_version = models.CharField(max_length=192,  null=True)
    make = models.CharField(max_length=192,  null=True)
    model = models.CharField(max_length=384,  null=True)
    resolution = models.CharField(max_length=36,  null=True)
    serial_number = models.CharField(max_length=765,  null=True)
    device_id = models.CharField(max_length=384,  null=True)
    created_on = models.DateTimeField(auto_now=False, auto_now_add=False, null=True)
    modified_on = models.DateTimeField(auto_now=False, auto_now_add=False, null=True)
    profile = models.CharField(max_length=96,  null=True)
    user_id = models.IntegerField(null=True)
    service_id = models.CharField(max_length=765,  null=True)
    mso_subscriber_id = models.CharField(max_length=36,  null=True)
    status = models.CharField(max_length=96,  null=True)
    friendly_name = models.CharField(max_length=192,  null=True)
    

    #description = models.Text()

    def __str__(self):
        return self.friendly_name

    class Meta:
        ordering = []
        db_table = 'myplex_user_device'



class PackageDef(models.Model):
    
    business_unit = models.CharField(max_length=1500,  null=True)
    package_def_id = models.IntegerField(db_column='package_def_id', null=False, primary_key=True,unique=True)
    package_id = models.IntegerField(null=True)
    basic_service = models.CharField(max_length=3,  null=True)
    cp_descrip = models.CharField(max_length=12000,  null=True)
    description = models.CharField(max_length=12000,  null=True)
    freqcy_id = models.DecimalField(max_digits=23, decimal_places=0, null=True)
    intcharge_ind = models.CharField(max_length=3,  null=True)
    name = models.CharField(max_length=3000,  null=True)
    orig_pack_id = models.DecimalField(max_digits=23, decimal_places=0, null=True)
    quick_cd = models.CharField(max_length=90,  null=True)
    reoccure_ind = models.CharField(max_length=3,  null=True)
    disp_name = models.CharField(max_length=3000,  null=True)
    category = models.CharField(max_length=1500,  null=True)
    period = models.CharField(max_length=60,  null=True)
    duration = models.DecimalField(max_digits=23, decimal_places=0, null=True)
    end_date = models.DateTimeField(auto_now=False, auto_now_add=False, null=True)
    start_date = models.DateTimeField(auto_now=False, auto_now_add=False, null=True)
    modified_ts = models.DateTimeField(auto_now=False, auto_now_add=False, null=True)

    def __str__(self):
        return self.business_unit

    class Meta:
        ordering = []
        db_table = 'package_def'


class PackageRate(models.Model):
    
    pack_rate_id = models.DecimalField(db_column='pack_rate_id', primary_key=True, max_digits=23, decimal_places=0, null=False)
    package_id = models.IntegerField(null=True)
    end_date = models.DateTimeField(auto_now=False, auto_now_add=False, null=True)
    start_date = models.DateTimeField(auto_now=False, auto_now_add=False, null=True)
    amount = models.DecimalField(max_digits=22, decimal_places=0, null=True)
    rate_type = models.CharField(max_length=1500,  null=True)
    modified_ts = models.DateTimeField(auto_now=False, auto_now_add=False, null=True)

    def __str__(self):
        return self.rate_type

    class Meta:
        ordering = []
        db_table = 'package_rate'


class Payment(models.Model):
    
    business_unit = models.CharField(max_length=1500,  null=True)
    payment_id = models.IntegerField(null=False, primary_key=True, db_column='payment_id',)
    cp_customer_id = models.CharField(max_length=300,  null=True)
    sp_acct_id = models.CharField(max_length=150,  null=True)
    payment_method = models.CharField(max_length=1500,  null=True)
    posting_status = models.CharField(max_length=1500,  null=True)
    payment_type = models.CharField(max_length=60,  null=True)
    payment_amt = models.DecimalField(max_digits=22, decimal_places=0, null=True)
    bill_id = models.DecimalField(max_digits=23, decimal_places=0, null=True)
    check_num = models.CharField(max_length=75,  null=True)
    gateway_id = models.DecimalField(max_digits=23, decimal_places=0, null=True)
    comments = models.CharField(max_length=12000,  null=True)
    order_id = models.DecimalField(max_digits=23, decimal_places=0, null=True)

    is_refund = models.CharField(max_length=3,  null=True)
    for_bill_id = models.DecimalField(max_digits=23, decimal_places=0, null=True)
    retries = models.DecimalField(max_digits=23, decimal_places=0, null=True)
    last_retry_date = models.DateTimeField(auto_now=False, auto_now_add=False, null=True)
    external_trans_id = models.CharField(max_length=12000,  null=True)
    received_date = models.DateTimeField(auto_now=False, auto_now_add=False, null=True)
    modified_ts = models.DateTimeField(auto_now=False, auto_now_add=False, null=True)
    reg_currency = models.CharField(max_length=9,  null=True)


    def __str__(self):
        return self.business_unit

    class Meta:
        ordering = []
        db_table = 'payment'


class RevenueTransactionDetails(models.Model):
    
    date_of_transactions = models.DateTimeField(auto_now=False, auto_now_add=False, null=True)
    day = models.CharField(max_length=150,  null=True)
    country = models.CharField(max_length=150,  null=True)
    payment_type = models.CharField(max_length=150,  null=True)
    purchase_type = models.CharField(max_length=150,  null=True)
    transaction_status = models.CharField(max_length=150,  null=True)
    packname = models.CharField(max_length=150,  null=True)
    validity = models.IntegerField(null=True)
    subscriber_status = models.CharField(max_length=150,  null=True)
    reg_currency = models.CharField(max_length=150,  null=True)
    price = models.DecimalField(max_digits=11, decimal_places=0, null=True)
    sgst = models.CharField(max_length=300,  null=True)
    cgst = models.CharField(max_length=300,  null=True)
    igst = models.CharField(max_length=300,  null=True)
    servicetax = models.CharField(max_length=150,  null=True)
    kkcess = models.CharField(max_length=150,  null=True)
    sbcess = models.CharField(max_length=150,  null=True)
    net = models.CharField(max_length=300,  null=True)
    payment_method =  models.CharField(max_length=150,  null=True)
    cp_customer_id = models.TextField(null=True)
    revenue = models.DecimalField(max_digits=11, decimal_places=0, null=True)
    transaction_id = models.TextField(null=True)
    first_name =  models.CharField(max_length=150,  null=True)
    last_name =  models.CharField(max_length=150,  null=True)
    cell_phone = models.CharField(max_length=600,  null=True)
    email = models.CharField(max_length=300,  null=True)
    city = models.CharField(max_length=150,  null=True)
    state = models.CharField(max_length=150,  null=True)
    service_start_date = models.DateTimeField(auto_now=False, auto_now_add=False, null=True)
    validity_end_date = models.DateTimeField(auto_now=False, auto_now_add=False, null=True)
    cancellation_date = models.DateTimeField(auto_now=False, auto_now_add=False, null=True)
    settlement_date = models.DateTimeField(auto_now=False, auto_now_add=False, null=True)
    validity_startdate = models.DateTimeField(auto_now=False, auto_now_add=False, null=True)
    id = models.IntegerField(db_column='id', null=False, primary_key=True,unique=True)
    resp_msg = models.TextField(null=True)
    modified_ts = models.DateTimeField(auto_now=False, auto_now_add=False, null=True)

    def __str__(self):
        return self.packname

    class Meta:
        ordering = []
        db_table = 'revenue_transaction_details'


class Subscription(models.Model):
    
    business_unit = models.CharField(max_length=1500,  null=True)
    ord_prod_id = models.IntegerField(primary_key=True, null=False, unique=True, db_column='ord_prod_id')
    order_id = models.DecimalField(max_digits=23, decimal_places=0, null=True)
    cp_customer_id = models.CharField(max_length=300,  null=True)
    sp_acct_id = models.CharField(max_length=150,  null=True)
    subscr_status = models.DecimalField(max_digits=23, decimal_places=0, null=True)
    package_id = models.DecimalField(max_digits=23, decimal_places=0, null=True)
    parent_ord_prod_id = models.DecimalField(max_digits=23, decimal_places=0, null=True)
    srv_end_date = models.DateTimeField(auto_now=False, auto_now_add=False, null=True)
    srv_start_date = models.DateTimeField(auto_now=False, auto_now_add=False, null=True)
    type = models.DecimalField(max_digits=23, decimal_places=0, null=True)
    validity_period = models.CharField(max_length=60,  null=True)
    validity_duration = models.DecimalField(max_digits=39, decimal_places=0, null=True)
    validity_end_date = models.DateTimeField(auto_now=False, auto_now_add=False, null=True)
    coupon_amount = models.DecimalField(max_digits=22, decimal_places=0, null=True)
    coupon_code = models.CharField(max_length=300,  null=True)
    cancellation_date = models.DateTimeField(auto_now=False, auto_now_add=False, null=True)
    reason_code = models.CharField(max_length=3000,  null=True)
    created_ts = models.DateTimeField(auto_now=False, auto_now_add=False, null=True)
    modified_ts = models.DateTimeField(auto_now=False, auto_now_add=False, null=True)

    #description = models.Text()

    def __str__(self):
        return self.business_unit

    class Meta:
        ordering = []
        db_table = 'subscription'

    def customquery(self, **kwargs):
        from django.db import connection
        cursor = connection.cursor()
        cursor.execute("SELECT subscr_status, validity_period FROM subscription")
        rows = cursor.fetchall()
        for item in rows:
            print(item.subscr_status, item.validity_period)

    
