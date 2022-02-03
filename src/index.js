import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './app/App';
import { Provider } from 'react-redux';
import configureStore from './redux/configure';
import "./i18n";
import * as serviceWorker from './serviceWorker';


ReactDOM.render(
  <BrowserRouter>
    <Provider store={configureStore()} >
    <App />
  </Provider>
  </BrowserRouter>
, document.getElementById('root'));

serviceWorker.unregister();