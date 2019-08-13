API_END_POINT = 'http://35.154.19.132:9200'
EVENTS_URL = '/events/event/' 
POST_QUERY = { 'query':{  
    'bool':{  
       'must':[  
          {  
             'match_all':{  

             }
          },
          {  
             'match_phrase':{  
                'error.message.keyword':{  
                   'query':'{0}'
                }
             }
          },
          {  
             'range':{  
                'timestamp':{  
                   'gte':{1},
                   'lte':{2},
                   'format':'epoch_millis'
                }
             }
          }
       ],
       'filter':[  

       ],
       'should':[  

       ],
       'must_not':[  

       ]
    }
  }
}

query_errors = [{"key": "sign_in_up", "search_terms": ["Sign in", "Sign up"]  },
   {"key":"forgot_password", "search_terms": ["Forgotten Password"] },
   {"key":"subscription", "search_terms": ["Not able to subscribe"] },
   {"key":"playback", "search_terms": ["Playback Error"] },
   {"key":"applaunch", "search_terms": ["App launch issue"]},
]
