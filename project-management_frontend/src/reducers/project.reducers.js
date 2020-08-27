import * as projectActions from '../actions/project.action';

const INITIAL_STATE = {};

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
        fetchedproject: false,
        fetchingProject: false,
        projectsList: { ...action.payload.projects },
      };

    case projectActions.PROJECT_REQUEST_FAIL:
      return {
        ...state,
        fetchingProject: false,
      };

    default:
      return state;
  }
}

export default projectActionReducer;
