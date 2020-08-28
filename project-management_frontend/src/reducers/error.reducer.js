import * as userActions from '../actions/user.action';
import * as errorActions from '../actions/error.action';

const INITIAL_STATE = { authenticationError: {}, projectError: {} };

/**
 * Sets any error that occurs in app.
 *
 * @param {Object} state Current State.
 * @param {String} action Takes the action that has been dispatched.
 * @returns
 */
function errorActionReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case errorActions.LOGIN_ERROR:
      return {
        ...state,
        authenticationError: action.payload,
      };

    case errorActions.CLEAR_LOGIN_ERROR:
      return {
        ...state,
        authenticationError: {},
      };

    case errorActions.PROJECT_ERROR:
      return {
        ...state,
        projectError: action.payload,
      };

    case errorActions.CLEAR_PROJECT_ERROR:
      return {
        ...state,
        projectError: {},
      };

    case errorActions.REGISTER_ERROR:
      return {
        ...state,
        registerError: action.payload,
      };

    case errorActions.CLEAR_REGISTER_ERROR:
      return {
        ...state,
        registerError: {},
      };

    case userActions.LOGOUT:
      return {
        ...INITIAL_STATE,
      };

    default:
      return state;
  }
}

export default errorActionReducer;
