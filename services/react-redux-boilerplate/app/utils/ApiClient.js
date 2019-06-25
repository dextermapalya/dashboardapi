import axios from 'axios';
import API from '../config/API'
//https://stackoverflow.com/questions/43051291/attach-authorization-header-for-all-axios-requests

const ApiClient = () => {
  const defaultOptions = {
    //baseURL: process.env.REACT_APP_API_PATH,
    baseURL: API.baseURL,
    //method: 'get','post',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Create instance
  let instance = axios.create(defaultOptions);

  // Set the AUTH token for any request
  instance.interceptors.request.use(function (config) {
    //const token = localStorage.getItem('token');
    console.log('adding token....', config.url)

    if ( [ "auth/login" ].indexOf( config.url ) > 0 ) {
      config.headers = {'Content-Type': 'multipart/form-data' } 
    } else{
      console.log('******************************')
      var user_info = JSON.parse ( localStorage.getItem('user_info') );
      var token = user_info.token

      console.log('token interceptor ....', token)
      console.log('user_info is ', user_info)
      //const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyLCJ1c2VybmFtZSI6ImFwcCIsImV4cCI6MTU2MTM4MDYyNCwiZW1haWwiOiJhcHBAYXBhbHlhLmNvbSJ9.7LnFLF1Ef4W3MosMnlfiP23dPPpwD8-yt4qmnN8hnz4' 
      config.headers.Authorization =  token ? `Bearer ${token}` : '';
    }
    console.log('config', config)
    return config;
  });

  return instance;
};

export default ApiClient();