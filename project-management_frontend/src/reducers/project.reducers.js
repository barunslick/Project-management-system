import * as userActions from '../actions/user.action';
import * as projectActions from '../actions/project.action';

const INITIAL_STATE = {
  projectsList: {},
  currentProject: {},
  fetchingProject: true,
  creatingProject: true,
};

/**
 * Performs action based on given payload ,i.e fetched data from an api and returns new state.
 *
 * @param {Object} state Current State.
 * @param {String} action Takes the action that has been dispatched.
 * @returns
 */
function projectActionReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case projectActions.PROJECT_REQUEST:
      return {
        ...state,
        fetchingProject: true,
      };

    case projectActions.PROJECT_REQUEST_SUCCESS:
      return {
        ...state,
        fetchingProject: false,
        projectsList: { ...action.payload.projects },
      };

    case projectActions.PROJECT_REQUEST_BY_ID_SUCCESS:
      return {
        ...state,
        fetchingProject: false,
        currentProject: { ...action.payload.project },
      };

    case projectActions.PROJECT_REQUEST_FAIL:
      return {
        ...state,
        fetchingProject: false,
      };

    case projectActions.PROJECT_CREATE:
      return {
        ...state,
        creatingProject: true,
      };

    case projectActions.PROJECT_CREATE_SUCCESS:
      return {
        ...state,
        creatingProject: false,
      };

    case projectActions.PROJECT_CREATE_FAIL:
      return {
        ...state,
        creatingProject: false,
      };

    case userActions.LOGOUT:
      return {
        ...INITIAL_STATE,
      };

    default:
      return state;
  }
}

export default projectActionReducer;
