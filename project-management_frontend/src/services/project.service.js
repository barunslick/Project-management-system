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

/**
 * Gets the project with its relevant project manager.
 *
 * @param {Number} projectId
 */
function getProjectById(projectId) {
  const request = {
    method: 'GET',
    headers: authHeader(),
  };

  return fetch(`${config.API_URL}/project/${projectId}`, request)
    .then(handleResponse)
    .then((user) => {
      return user;
    });
}

export const projectService = {
  getProjectsForUser,
  getProjectById,
};
