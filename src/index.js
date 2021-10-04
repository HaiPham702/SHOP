import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { createStore,applyMiddleware,compose } from 'redux';
import appReducer from './reducers/index';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const store = createStore(
  appReducer,
  composeEnhancer(applyMiddleware(thunk)),
);
ReactDOM.render(
  <React.StrictMode>
    <Provider store = {store}>
    <App />
  </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();


