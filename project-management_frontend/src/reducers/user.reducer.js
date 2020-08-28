import * as userActions from '../actions/user.action';

const user = JSON.parse(localStorage.getItem('user'));
const INITIAL_STATE = user ? { loggedIn: true, user } : { loggedIn: false };

/**
 * Performs action based on given payload ,i.e fetched data from an api and returns new state.
 *
 * @param {Object} state Current State.
 * @param {String} action Takes the action that has been dispatched.
 * @returns
 */
function userActionReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case userActions.LOGIN_REQUEST:
      return {
        ...state,
        loggingIn: true,
        user: action.payload,
      };

    case userActions.LOGIN_REQUEST_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        loggingIn: false,
        userDetails: action.payload.user,
      };

    case userActions.LOGIN_REQUEST_FAIL:
      return {
        ...state,
        loggingIn: false,
        user: {},
      };

    case userActions.REGISTER_REQUEST:
      return {
        ...state,
        registering: true,
      };

    case userActions.REGISTER_REQUEST_SUCCESS:
      return {
        ...state,
        registering: false,
      };

    case userActions.REGISTER_REQUEST_FAIL:
      return {
        ...state,
        registering: false,
      };

    case userActions.LOGOUT:
      return {
        ...INITIAL_STATE,
      };

    default:
      return state;
  }
}

export default userActionReducer;
