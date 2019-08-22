import 'whatwg-fetch';
import React from 'react';
import { Redirect } from 'react-router-dom';
import { LOCAL_BASE_URL, PRODUCTION_BASE_URL } from 'shared/constants';
import authService from 'utils/authService';
import Log from 'logger-init';

/* logic to determin which api endpoint to interact with */
const getBaseURL = () => {
  // determin the baseulr based on hostname using window.location.href
  const currentUrl = window.location.href;
  // perform a regex for ip or domain name
  const patt = new RegExp('16.118|dashboard.sunnxt.com'); // new RegExp("16.118|dashboard");
  const res = patt.test(currentUrl);
  // if true use remote ip else local ip
  const BASE_URL = res ? PRODUCTION_BASE_URL : LOCAL_BASE_URL;
  Log.info('BASE_URL', BASE_URL);
  // based on currentUrl change the baseUrl
  return BASE_URL;
};

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response) {
  Log.info("##########", response)
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  return response.json()
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  /* catch any forbiddene errors due to incorrect credentials */
  if (response.status === 403) {
    return <Redirect to="/login" />;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}


/**
 * Add a bearer token header to every outgoing request
 * The bearer token should be applied only if route requires authentication
 * ex: Login route should not contain the bearer token
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function addHeader(options) {
  // do not mutate the input parameters, instead clone and mutate it
  const optionsClone = Object.assign({}, options);
  let headers;
  if (optionsClone.headers) {
    headers = Object.assign({}, optionsClone.headers);
  }

  if (optionsClone.auth !== undefined && optionsClone.auth) {
    const token = authService.getToken();
    headers.Authorization = token ? `Bearer ${token}` : '';
    optionsClone.headers = headers;
  }
  return optionsClone;
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export default function request(url, options) {
  options = addHeader(options);
  return fetch(getBaseURL() + url, options)
    .then(checkStatus)
    .then(parseJSON); 
}
