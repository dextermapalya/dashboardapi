import request from 'shared/lib/request';
import { AUTH_LOGIN } from 'shared/constants';

function get(id) {
  return request({
    url: `/v1.1/activesubscriptions/${id}`,
    method: 'GET'
  });
}

function login(formData) {
  return request({
    url: AUTH_LOGIN,
    method: 'POST',
    data: formData
  });
}

const InstallationService = {
  get, login // , update, delete, etc. ...
};

export default InstallationService;
