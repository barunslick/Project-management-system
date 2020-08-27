import * as config from '../config';

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
      localStorage.setItem('user', JSON.stringify(user));

      return user;
    });
}

/**
 * Checks if the respone from an api is valid and returns parsed data.
 *
 * @param {*} response
 */
function handleResponse(response) {
  return response.text().then((result) => {
    const data = result && JSON.parse(result);

    if (!response.ok) {
      const error = (data && data.message) || response.statusText;

      return Promise.reject(error);
    }

    return data;
  });
}

export const userService = {
  login,
};
