import { userService } from '../services/user.service';

import { history } from '../helper/history';
import * as errorActions from './error.action.js';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_REQUEST_FAIL = 'LOGIN_REQUEST_FAIL';
export const LOGIN_REQUEST_SUCCESS = 'LOGIN_REQUEST_SUCCESS';

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_REQUEST_SUCCESS = 'REGISTER_REQUEST_SUCCESS';
export const REGISTER_REQUEST_FAIL = 'REGISTER_REQUEST_FAIL';

export const loginRequest = (email) => ({
  type: LOGIN_REQUEST,
  payload: email,
});

export const loginRequestSuccess = (user) => ({
  type: LOGIN_REQUEST_SUCCESS,
  payload: user,
});

export const loginRequestFail = (msg) => ({
  type: LOGIN_REQUEST_FAIL,
  payload: msg,
});

export const registerRequest = () => ({
  type: REGISTER_REQUEST,
});

export const registerRequestSuccess = () => ({
  type: REGISTER_REQUEST_SUCCESS,
});

export const registerRequestFail = (msg) => ({
  type: REGISTER_REQUEST_FAIL,
  payload: msg,
});

/**
 * Thunk middleware to handle login request.
 *
 * @param {String} email
 * @param {String} password
 */
export function login(email, password) {
  return async (dispatch) => {
    dispatch(loginRequest(email));
    try {
      const user = await userService.login(email, password);

      dispatch(loginRequestSuccess(user));
      dispatch(errorActions.clearLoginError());

      history.push('/');
    } catch (err) {
      dispatch(errorActions.loginError(err));
      dispatch(loginRequestFail(err));
    }
  };
}

/**
 * Thunk middleware to handle login request.
 *
 * @param {Object} user
 */
export function register(user) {
  return async (dispatch) => {
    dispatch(registerRequest(user));
    try {
      await userService.register(user);

      dispatch(registerRequestSuccess());
      dispatch(errorActions.clearRegisterError());
    } catch (err) {
      dispatch(errorActions.registerError(err));
      dispatch(registerRequestFail(err));
    }
  };
}
