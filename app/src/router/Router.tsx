import React, { FunctionComponent } from 'react';
<<<<<<< HEAD
=======
import {UserPage, CouponsPage, HomePage, LoginPage, RegisterPage} from '../pages';

>>>>>>> init user page
import { createStackNavigator } from '@react-navigation/stack';
import { HomePage, LoginPage, RegisterPage, ScannerPage, CouponPage, CouponsPage ,HistoricPage, MapPage, UserPage, FavStorePage} from '../pages';

const Router: FunctionComponent = () => {
  const Stack = createStackNavigator();
    return (
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Register" component={RegisterPage} />
        <Stack.Screen name='Scan' component={ScannerPage} />
        <Stack.Screen name="Coupons" component={CouponsPage} />
<<<<<<< HEAD
        <Stack.Screen name="Coupon" component={CouponPage} />
        <Stack.Screen name="Historic" component={HistoricPage} />
        <Stack.Screen name="Map" component={MapPage} />
        <Stack.Screen name="Stores" component={FavStorePage} />
=======
>>>>>>> init user page
        <Stack.Screen name="User" component={UserPage} />
      </Stack.Navigator>
    );
  }
export default Router;
