import React, { FunctionComponent } from 'react';
import { Route } from 'react-router-native';
import { HomePage, LoginPage, RegisterPage } from '../pages';

import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

// const Router: FunctionComponent = () => (
//   <Stack.Navigator>
//     <Stack.Screen name="Home" component={HomeScreen} />
//       <Stack.Screen name="Login" component={LoginScreen} />
//     <Stack.Navigator>
// );


function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomePage} />
      <Stack.Screen name="Login" component={LoginPage} />
      <Stack.Screen name="Register" component={RegisterPage} />
    </Stack.Navigator>
  );
}


export default MyStack;
