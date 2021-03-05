import React, {FunctionComponent} from 'react';
import {View, Text, ScrollView} from "react-native";
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

  const handleCouponPopup = (coupon: Coupon) => {
  }

  return (
    <View>
      {coupons.map(coupon => <CouponCard coupon={coupon} key={coupon.id} onClick={handleCouponPopup}/>)}
    </View>
  );
}

export default CouponList;