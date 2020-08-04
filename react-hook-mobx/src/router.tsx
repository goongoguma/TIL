import * as React from 'react';
import Header from './view/header';
import Main from './view/main';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

export const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Main} />
      </Switch>
    </BrowserRouter>
  )
}