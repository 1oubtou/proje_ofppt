import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { legacy_createStore } from 'redux';
import { persistStore } from 'redux-persist';
import cartReducer from './redux/reducers';
import { Provider } from 'react-redux';

const store = legacy_createStore(cartReducer);
const persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={ store } >
    <App />
  </Provider>
);
