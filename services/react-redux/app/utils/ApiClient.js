import axios from 'axios';
import {LOCAL_BASE_URL, PRODUCTION_BASE_URL} from 'config/APIEndPoints'

const ApiClient = () => {
  const defaultOptions = {
    baseURL: PRODUCTION_BASE_URL,
    timeout:65000,
    //method: 'get',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Create instance
  let instance = axios.create(defaultOptions);

  // Set the AUTH token for any request
  instance.interceptors.request.use(function (config) {
    const nonApi = ['auth/login/']
    //for non api requests use header without authorization token
    if ( nonApi.indexOf( config.url ) >= 0 )
     config.headers = { 'Content-Type': 'multipart/form-data',} 
    else{
        const data   = localStorage.getItem('userinfo')
        const jsonObj = JSON.parse( data )
        const token = jsonObj.token
        //otherwise use header with bearer token
        config.headers = { 'Content-Type': 'application/json',
                            'Authorization': token ? `Bearer ${token}` : ''
                         }

    } 

    return config;
  });

  return instance;
};

export default ApiClient();