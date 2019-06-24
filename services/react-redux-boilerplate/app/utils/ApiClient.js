import axios from 'axios';
import API from '../config/API'
//https://stackoverflow.com/questions/43051291/attach-authorization-header-for-all-axios-requests

const ApiClient = () => {
  const defaultOptions = {
    //baseURL: process.env.REACT_APP_API_PATH,
    baseURL: API.baseURL,
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Create instance
  let instance = axios.create(defaultOptions);

  // Set the AUTH token for any request
  instance.interceptors.request.use(function (config) {
    //const token = localStorage.getItem('token');
    console.log('adding token....')
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyLCJ1c2VybmFtZSI6ImFwcCIsImV4cCI6MTU2MTM4MDYyNCwiZW1haWwiOiJhcHBAYXBhbHlhLmNvbSJ9.7LnFLF1Ef4W3MosMnlfiP23dPPpwD8-yt4qmnN8hnz4' 
    config.headers.Authorization =  token ? `Bearer ${token}` : '';
    return config;
  });

  return instance;
};

export default ApiClient();