from rest_framework import serializers
from datetime import datetime

def is_valid_date(dt_field):

    try:
        datetime.datetime.strptime(dt_field, '%Y-%m-%d')
    except ValueError:
        raise ValueError("Incorrect date format, should be YYYY-MM-DD")


class SubscriptionSerializer(serializers.Serializer):
   """Subscription serializer, this does not depend on a model
      define your fields here.
   """
   #when to use which type of validator check below link

   #https://micropyramid.com/blog/custom-validations-for-serializer-fields-django-rest-framework/
   id = serializers.IntegerField( read_only=True )
   #method 1 for validation calls an external function
   #date = serializers.DateField( read_only=True , validators=[is_valid_date])
   dt_query = serializers.DateField(required=True)

   #method #2 calls method in same class the method name should  contain validate_field_name
   # ex: field is called dt_query so method should be called validate_dt_query 
   def validate_dt_query(self, dt_query):

        try:
            datetime.strptime( str(dt_query), '%Y-%m-%d')
        except ValueError:
            raise ValueError("Incorrect date format, should be YYYY-MM-DD")
