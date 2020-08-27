import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userActionReducer from './user.reducer';
import errorActionReducers from './error.reducer';
import projectActionReducers from './project.reducers';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'error', 'projects'],
};

const rootReducer = combineReducers({
  user: userActionReducer,
  error: errorActionReducers,
  projects: projectActionReducers,
});

export default persistReducer(persistConfig, rootReducer);
