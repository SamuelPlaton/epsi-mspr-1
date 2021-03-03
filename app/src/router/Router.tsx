import React, { FunctionComponent } from 'react';
import { Route } from 'react-router-native';
import { HomePage } from '../pages';

const Router: FunctionComponent = () => (
  <>
    <Route exact path='/' component={HomePage} />
  </>
);

export default Router;
