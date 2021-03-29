import React, { FunctionComponent } from 'react';
import {UserPage, CouponsPage, HomePage, LoginPage, RegisterPage, FavStorePage} from '../pages';

import { createStackNavigator } from '@react-navigation/stack';

const Router:FunctionComponent = () => {
  const Stack = createStackNavigator();
    return (
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Register" component={RegisterPage} />
        <Stack.Screen name="Coupons" component={CouponsPage} />
        <Stack.Screen name="Stores" component={FavStorePage} />
        <Stack.Screen name="User" component={UserPage} />
      </Stack.Navigator>
    );
  }


export default Router;
