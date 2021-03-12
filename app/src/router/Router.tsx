import React, { FunctionComponent } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HomePage, LoginPage, RegisterPage, ScannerPage, CouponsPage ,HistoricPage} from '../pages';

const Router: FunctionComponent = () => {
  const Stack = createStackNavigator();


  return (
    <Stack.Navigator>
      <Stack.Screen name='Home' component={HomePage} />
      <Stack.Screen name='Login' component={LoginPage} />
      <Stack.Screen name='Register' component={RegisterPage} />
      <Stack.Screen name='Scan' component={ScannerPage} />
      <Stack.Screen name="Coupons" component={CouponsPage} />
      <Stack.Screen name="Historic" component={HistoricPage} />
    </Stack.Navigator>
  );
};

export default Router;
