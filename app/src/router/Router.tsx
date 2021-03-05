import React, { FunctionComponent } from 'react';
import { Route } from 'react-router-native';
import { HomePage } from '../pages';
import {ScrollView} from "react-native";

const Router: FunctionComponent = () => (
  <>
    <Route exact path='/' component={HomePage} />
  </>
);

export default Router;
