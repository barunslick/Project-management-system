import { projectService } from '../services/project.service';

import * as errorActions from './error.action.js';

export const PROJECT_REQUEST = 'PROJECT_REQUEST';
export const PROJECT_REQUEST_SUCCESS = 'PROJECT_REQUEST_SUCCESS';
export const PROJECT_REQUEST_BY_ID_SUCCESS = 'PROJECT_REQUEST_BY_ID_SUCCESS';
export const PROJECT_REQUEST_FAIL = 'PROJECT_REQUEST_FAIL';

export const projectsRequest = () => ({
  type: PROJECT_REQUEST,
});

export const projectRequestByIdSuccess = (project) => ({
  type: PROJECT_REQUEST_BY_ID_SUCCESS,
  payload: project,
});

export const projectsRequestSuccess = (projects) => ({
  type: PROJECT_REQUEST_SUCCESS,
  payload: projects,
});

export const projectsRequestFail = (msg) => ({
  type: PROJECT_REQUEST_FAIL,
  payload: msg,
});

/**
 * Thunk middleware to handle PROJECT request.
 *
 */
export function getProjects() {
  return async (dispatch) => {
    dispatch(projectsRequest());
    try {
      const projects = await projectService.getProjectsForUser();

      dispatch(projectsRequestSuccess(projects));
      dispatch(errorActions.clearLoginError());
    } catch (err) {
      dispatch(errorActions.projectError(err));
      dispatch(projectsRequestFail(err));
    }
  };
}

/**
 * Gets project by id with its project manager.
 *
 * @param {Number} id
 */
export function getProjectById(id) {
  return async (dispatch) => {
    dispatch(projectsRequest());
    try {
      const projects = await projectService.getProjectById(id);

      dispatch(projectRequestByIdSuccess(projects));
      dispatch(errorActions.clearProjectError());
    } catch (err) {
      dispatch(errorActions.projectError(err));
      dispatch(projectsRequestFail(err));
    }
  };
}
