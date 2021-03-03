
import Api from "../../api/Api";
import {Coupon} from "../../entities";
import {CouponList} from "../../components/list";
import React, { FunctionComponent, useEffect, useState } from 'react';
import { View } from 'react-native';

/**
 * The react home page.
 */

const HomePage: FunctionComponent = () => {

  const [coupons, setCoupons] = useState<Array<Coupon>>(undefined);

  const getData = async () => {
    const a: Array<Coupon> = await Api.CouponsApi.list(['1', '2']).then(response => response);
    setCoupons(a);
  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    console.log(coupons);
    }, [coupons]
  )

  return (
    <View style={{width: '100%'}}>
      {coupons && <CouponList coupons={coupons}/>}
    </View>
  );
}
//  {coupons && <CouponList coupons={coupons}/>}
export default HomePage;
