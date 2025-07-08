import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.css';
import Modal from 'react-modal';
import * as serviceWorker from './serviceWorker';
import store from './store';
import App from './App';

Modal.setAppElement('#root');
Modal.defaultProps.ariaHideApp = false;

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

serviceWorker.unregister();
