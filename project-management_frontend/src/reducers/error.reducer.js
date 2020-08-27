import * as errorActions from '../actions/error.action';

const INITIAL_STATE = { authenticationError: {} };

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

    default:
      return state;
  }
}

export default errorActionReducer;
