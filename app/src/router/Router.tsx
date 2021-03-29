import React, { FunctionComponent } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HomePage, LoginPage, RegisterPage, ScannerPage, CouponPage, CouponsPage ,HistoricPage, MapPage} from '../pages';

const Router: FunctionComponent = () => {
  const Stack = createStackNavigator();
    return (
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Register" component={RegisterPage} />
        <Stack.Screen name='Scan' component={ScannerPage} />
        <Stack.Screen name="Coupons" component={CouponsPage} />
        <Stack.Screen name="Coupon" component={CouponPage} />
        <Stack.Screen name="Historic" component={HistoricPage} />
        <Stack.Screen name="Map" component={MapPage} />
      </Stack.Navigator>
    );
  }
export default Router;
