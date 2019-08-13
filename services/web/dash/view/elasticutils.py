####
# generate an array that is used by python-elastic library to execute a query for given
# search conditions
# arguments phrases as array, epoch_array as array of epoch milliseconds 
# returns array 
####
# The below function can best be described using below raw query
# i.e search for 1 or more keywords by using term minimum_should_match:1, 
# scenario 1 assuming for a given date elastic has 3 records that match sign in and 2 records that match sign up the query will return count of 5
# scenario 2 assuming for a given date elastic has 3 records that match sign in and 0 records that match sign up the query will return count of 3
# scenario 3 assuming for a given date elastic has 0 records that match sign in and 2 records that match sign up the query will return count of 2
# all the 3 scenarios must fulfill an "and" condition i.e also match the given date range
# uncomment and use below raw query for verification purpose
#     query =    {"query":{  
#         "bool":{  
#            "must":[  
#               {  
#                  "bool":{  
#                     "should":[  
#                        {  
#                           "match_phrase":{  
#                              "error.source.keyword":"Sign in"
#                           }
#                        },
#                        {  
#                           "match_phrase":{  
#                              "error.source.keyword":"Sign up"
#                           }
#                        }
#                     ],
#                     "minimum_should_match":1
#                  }
#               },
#               {  
#                  "range":{  
#                     "timestamp":{  
#                        "gte":1565461800000,
#                        "lte":1566066599999,
#                        "format":"epoch_millis"
#                     }
#                  }
#               }
#            ],
#            "filter":[  
  
#            ],
#            "should":[  
  
#            ],
#            "must_not":[  
  
#            ]
#         }
#      }
#     }

def build_query_date_range_phrase(phrases, epoch_array):

    try:

        multi_condition_query = []
    
        dt_range = {  
            "range":{  
               "timestamp":{  
                  "gte":epoch_array[0],
                  "lte":epoch_array[1],
                  "format":"epoch_millis"
               }
            }
         }
        for item in phrases:
            multi_condition_query.append( {'match_phrase': {"error.source.keyword": item} } )
        query = {'query':{'bool':{'must':[{'bool': {'should': multi_condition_query, "minimum_should_match":1} }, dt_range]  } }  } 
            
        return query
    except Exception as e:
        raise

