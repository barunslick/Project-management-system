import * as config from '../config';
import authHeader from '../helper/authHeader';
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

/**
 * To register a new user.
 *
 * @param {Object} user
 */
function register(user) {
  const auth = authHeader();

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...auth },
    body: JSON.stringify(user),
  };

  return fetch(`${config.API_URL}/auth/register`, requestOptions).then(
    handleResponse
  );
}

export const userService = {
  login,
  register,
};
