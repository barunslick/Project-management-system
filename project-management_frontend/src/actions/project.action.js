import { projectService } from '../services/project.service';

import * as errorActions from './error.action.js';

export const PROJECT_REQUEST = 'PROJECT_REQUEST';
export const PROJECT_REQUEST_SUCCESS = 'PROJECT_REQUEST_SUCCESS';
export const PROJECT_REQUEST_FAIL = 'PROJECT_REQUEST_FAIL';

export const projectsRequest = () => ({
  type: PROJECT_REQUEST,
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
      console.log(err);
      dispatch(errorActions.loginError(err));
      dispatch(projectsRequestFail(err));
    }
  };
}
