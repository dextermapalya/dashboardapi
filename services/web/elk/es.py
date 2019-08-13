import json
import logging
from time import sleep
from connector import connect_elasticsearch
from insert import store_record
from setup_index import create_index
import random, string
from datetime import datetime
from search import search
from datetime import timedelta  
from memory_profiler import profile

#def random_generator(size=15, chars):
#        return ''.join(random.choice(chars) for x in range(size))

#@profile
def random_date_in_epoch():
    try:
        startDate = datetime.strptime("2000-01-01", "%Y-%m-%d") #DateTime(2000,1,1)
        endDate = datetime.strptime("2019-01-01", "%Y-%m-%d") #DateTime(2019,8,13)
        daysToAdd = (endDate - startDate).days
        rdays = random.randint(1, daysToAdd)
        newdate = startDate +  timedelta(days= rdays )
        d_in_ms = int( float(  newdate.timestamp() ) * 1000 )
        return d_in_ms
        ###yield (startDate +  timedelta(days= rdays ) )
        #yield d_in_ms
        #dt = str( random.randint(1,30) ) + "." + str( random.randint(1,12) ) + "." + str(random.randint(2000, 2018) ) 
        #tm = str( random.randint(0,23) ) + ":" + str( random.randint(0,59) ) + ":" + str(random.randint(0, 59) )
        #d = datetime.strptime(dt + " " + tm + ",76", "%d.%m.%Y %H:%M:%S,%f").strftime('%s.%f')
        #d_in_ms = int(float(d)*1000)
    except Exception as e:
        exit(1)
        raise

    #return d_in_ms

#@profile
def run_forever():

    es = connect_elasticsearch()
    max = 15
    idx = 0
    recipe_title = ["Sweet Potato and Pea Samosas", "MAC ‘N’ CHEESE", "Alla Fratelli", "Passionfruit Mousse Slice", "Idly", "Dosa", "Samosa", "Chicken Roast", "Veg Sandwich", "Burger", "Roti", "Dal", "Rice"]
    #check if index called recipes already exists by creating one with same name    
    if create_index(es, 'recipes'):
            print('Data indexed successfully')        
    else:
        while True:
        #while idx < max: 
            rtitle = recipe_title[ random.randint(0,12) ]
            json_data = {
                    #"title": "recipe " + str( random_generator(15, 'abcdefghi98765') ),
                    "title" : rtitle,
                    "submitter": "User" + str(  random.randint(1,101) ),
                    "description": rtitle,
                    "calories": random.randint(1,250),
                    "created_at": random_date_in_epoch(),
                    "ingredients": [{'step': '1 bunch kale, large ' 'stems discarded, ' 'leaves finely ' 'chopped'},
                                    {'step': '1/2 teaspoon salt'}, {'step': '1 tablespoon apple ' 'cider vinegar'}, {'step': '1 apple, diced'},
                                    {'step': '1/3 cup feta cheese'}, {'step': '1/4 cup currants'}, {'step': '1/4 cup toasted pine ' 'nuts'}]
                }

            store_record(es, 'recipes', json_data)
            #print(out)
            #idx += 1

    search_object = {'_source': ['title'], 'query': {'range': {'calories': {'gte': 120}}}}
    search(es, 'recipes', json.dumps(search_object))
    

if __name__ == '__main__':
    logging.basicConfig(level=logging.ERROR)
    run_forever()


