import thunkMiddleware from 'redux-thunk';
import { persistStore } from 'redux-persist';
import { createStore, applyMiddleware, compose } from 'redux';

import rootReducer from './reducers';
/* const INITIAL_VALUE = []; */

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunkMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

const persistor = persistStore(store);

export default { store, persistor };
