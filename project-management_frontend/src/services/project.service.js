import * as config from '../config';
import authHeader from '../helper/authHeader';
import handleResponse from '../helper/handleResponse';

/**
 * Performs login in api endpoint.
 *
 */
const getProjectsForUser = () => {
  const request = {
    method: 'GET',
    headers: authHeader(),
  };

  return fetch(`${config.API_URL}/project`, request)
    .then(handleResponse)
    .then((user) => {
      return user;
    });
};

/**
 * Gets the project with its relevant project manager.
 *
 * @param {Number} projectId
 */
const getProjectById = (projectId) => {
  const request = {
    method: 'GET',
    headers: authHeader(),
  };

  return fetch(`${config.API_URL}/project/${projectId}`, request)
    .then(handleResponse)
    .then((user) => {
      return user;
    });
};

const createProject = (project) => {
  const auth = authHeader();

  const projectFomatted = {
    name: project.projectName,
    description: project.projectDescription,
    projectManagerEmail: project.projectManagerEmail,
  };

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...auth },
    body: JSON.stringify(projectFomatted),
  };

  return fetch(`${config.API_URL}/project`, requestOptions)
    .then(handleResponse)
    .then((result) => {
      return result;
    });
};

export const projectService = {
  createProject,
  getProjectById,
  getProjectsForUser,
};
