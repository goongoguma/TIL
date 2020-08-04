import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import MainStore from '../src/store/main';
import ShareStore from '../src/store/share';
import HeaderStore from '../src/store/header';
import 'normalize.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Router } from '../src/router';

const App = () => (
  <Router />
)

ShareStore.setWindowSize()

ReactDOM.render(
  <Provider HeaderStore={ HeaderStore } MainStore={ MainStore } ShareStore={ ShareStore }>
    <App />
  </Provider>,
  document.getElementById('root')
);
