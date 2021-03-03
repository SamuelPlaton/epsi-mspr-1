import React, {FunctionComponent} from 'react';
import {View, Text} from "react-native";
import {Coupon} from "../../../entities";
import {CouponCard} from "../../cards";

/* Coupon List Props
*   coupons: The coupons array component
 */
export interface Props {
  coupons: Array<Coupon>;
}

/**
 * The react coupon list component.
 */
const CouponList: FunctionComponent<Props> = ({coupons}) => {

  return (
    <View>
      {coupons.map(coupon => <CouponCard coupon={coupon}/>)}
    </View>
  );
}
//{coupons.map(coupon => <CouponCard coupon={coupon}/>)}
export default CouponList;
//<FlatList data={coupons} renderItem={(coupon: Coupon) => <CouponCard coupon={coupon}/>