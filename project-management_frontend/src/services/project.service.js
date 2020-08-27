import * as config from '../config';
import authHeader from '../helper/authHeader';
import handleResponse from '../helper/handleResponse';

/**
 * Performs login in api endpoint.
 *
 */
function getProjectsForUser() {
  const request = {
    method: 'GET',
    headers: authHeader(),
  };

  return fetch(`${config.API_URL}/project`, request)
    .then(handleResponse)
    .then((user) => {
      return user;
    });
}

export const projectService = {
  getProjectsForUser,
};
