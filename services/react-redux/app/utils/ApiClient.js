import axios from 'axios';
import { LOCAL_BASE_URL, PRODUCTION_BASE_URL } from 'shared/constants';
import {
  filter, map, uniq, remove, maxBy
} from 'lodash';
/* logic to determin which api endpoint to interact with */
const getBaseURL = () => {
  console.log('APICLIENT fetching baseurl.....');
  // determin the baseulr based on hostname using window.location.href
  const currentUrl = window.location.href;
  // perform a regex for ip or domain name
  const patt = new RegExp('16.118|dashboard.sunnxt.com'); // new RegExp("16.118|dashboard");
  const res = patt.test(currentUrl);
  // if true use remote ip else local ip
  const BASE_URL = res ? PRODUCTION_BASE_URL : LOCAL_BASE_URL;
  // based on currentUrl change the baseUrl
  console.log('BASE_URL', BASE_URL);
  return BASE_URL;
};

const ApiClient = () => {
  const defaultOptions = {
    baseURL: getBaseURL(),
    timeout: 180000, // 3 minutes of 180 seconds
    headers: {
      'Content-Type': 'application/json'
    }
  };

  // Create instance
  const instance = axios.create(defaultOptions);

  // Set the AUTH token for any request
  instance.interceptors.request.use((config) => {
    const nonApi = ['custom/login/'];
    // for non api requests use header without authorization token
    if (nonApi.indexOf(config.url) >= 0) {
      config.headers = {
        'Content-Type': 'multipart/form-data'
      };
    } else {
      const data = localStorage.getItem('userinfo');
      const jsonObj = JSON.parse(data);
      const { token } = jsonObj;
      // otherwise use header with bearer token
      config.headers = {
        'Content-Type': 'application/json',
        Authorization: token ? `Bearer ${token}` : ''
      };
    }

    return config;
  });

  return instance;
};

export default ApiClient();
