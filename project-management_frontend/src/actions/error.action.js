export const LOGIN_ERROR = 'LOGIN_ERROR';
export const CLEAR_LOGIN_ERROR = 'CLEAR_LOGIN_ERROR';

export const PROJECT_ERROR = 'LOGIN_ERROR';
export const CLEAR_PROJECT_ERROR = 'CLEAR_LOGIN_ERROR';

export const loginError = (msg) => ({
  type: LOGIN_ERROR,
  payload: msg,
});

export const clearLoginError = () => ({
  type: CLEAR_LOGIN_ERROR,
});

export const projectError = (msg) => ({
  type: PROJECT_ERROR,
  payload: msg,
});

export const clearProjectError = () => ({
  type: CLEAR_PROJECT_ERROR,
});
