import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import createStore from './store';
import { Routes } from './Routes';

const store = createStore();

import './styles/tailwind.css';

const renderApp = () => {
  ReactDOM.render(
    <Provider store={store}>
      <Routes />
    </Provider>,
    document.getElementById('app')
  );
};

renderApp();
