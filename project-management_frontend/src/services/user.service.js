import * as config from '../config';
import handleResponse from '../helper/handleResponse';
/**
 * Performs login in api endpoint.
 *
 * @param {String} email
 * @param {String} password
 */
function login(email, password) {
  const request = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  };

  return fetch(`${config.API_URL}/auth/login`, request)
    .then(handleResponse)
    .then((user) => {
      localStorage.setItem('token', user.token);

      return user;
    });
}

export const userService = {
  login,
};
