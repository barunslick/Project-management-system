import { combineReducers } from 'redux';

import userActionReducer from './user.reducer';
import errorActionReducers from './error.reducer';

const reducer = combineReducers({
  user: userActionReducer,
  error: errorActionReducers,
});

export default reducer;
