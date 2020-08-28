import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userActionReducer from './user.reducer';
import errorActionReducers from './error.reducer';
import projectActionReducers from './project.reducers';

import * as userActions from '../actions/user.action';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'error', 'projects'],
};

const appReducer = combineReducers({
  user: userActionReducer,
  error: errorActionReducers,
  projects: projectActionReducers,
});

const rootReducer = (state, action) => {
  if (action.type === userActions.LOGOUT) {
    storage.removeItem('persist:root');
    state = undefined;
  }
  
  return appReducer(state, action);
};

export default persistReducer(persistConfig, rootReducer);
