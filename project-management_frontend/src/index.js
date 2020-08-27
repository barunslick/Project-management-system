import React from 'react';

import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import App from './App';
import Store from './store';

import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={Store.store}>
      <PersistGate persistor={Store.persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
