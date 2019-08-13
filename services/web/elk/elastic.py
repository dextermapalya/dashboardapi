import json
import logging
from elasticsearch import Elasticsearch
from elasticsearch_dsl import Search

from elk import API_END_POINT, EVENTS_URL

###
# connect to elastich search using python module
# arguments None
# return elasticsearch Object
###
def connect_elasticsearch():
    try:
        _es = None
        #_es = Elasticsearch([{'host': 'localhost', http_auth=('elastic', '4gKmFvoWMMcOPgdhj9V4'), 'port': 9200}])
        _es = Elasticsearch(API_END_POINT)
        if _es.ping():
            print('Yay Connect')
        else:
            print('Awww it could not connect!')
        return _es

    except Exception as e:
            raise

###
# perform a search operation on elastic using post method
# arguments es_object as elastic object, index_name as string, query as json object
# return json Object
###

def get_query_count(es_client, index_name, query):
    try:
        #res = es_object.search(index=index_name, body=search)
        res = es_client.search(index=index_name, body=query )
        return res['hits']['total']

    except Exception as e:
        raise


    #@profile
    def run_forever():
    
        es = connect_elasticsearch()
        max = 15
        idx = 0
        #check if index called recipes already exists by creating one with same name    
        search_object = { 'query': {'match_phrase': {'error.message':  'ERR_USER_NOT_SUBSCRIBED.'}}}
        #print(json.dumps(search_object))
        #search(es, 'events', json.dumps(search_object))
    
        ##s = Search(using=es, index="events") \
        ##        .filter("term", category="search") \ 1564597800000
        ##        .query("match_phrase", error__message="ERR_USER_NOT_SUBSCRIBED.")   
        ##response = s.query()  1565693530000
        ###working ### res = es.search(index="events", body={"query": {"match_phrase": {"error.message.keyword":"ERR_USER_NOT_SUBSCRIBED." }  }} )
        boolQuery = []
        boolQuery.append({'range': {"timestamp": {"gte": 1565693530000, 'format':"epoch_millis"}}})
        boolQuery.append({'match_phrase': {"error.message.keyword":"ERR_USER_NOT_SUBSCRIBED."} })
        query = {'query':{'bool':{'must':[boolQuery]}}}
    
    
        res = es.search(index="events", body=query )
        print("Searching....\n")
        #print(json.dumps(res))
        print("Got %d Hits:" % res['hits']['total'])
    
    if __name__ == '__main__':
            logging.basicConfig(level=logging.ERROR)
            run_forever()    
