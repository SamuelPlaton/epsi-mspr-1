import React, {FunctionComponent} from 'react';
import {useNavigation} from '@react-navigation/native';
import {View, Alert} from "react-native";
import {Coupon, UserCoupon} from "../../../entities";
import {CouponCard} from "../../cards";

/* Coupon List Props
*   coupons: The coupons array component
 */
export interface Props {
  coupons: Array<Coupon>;
  userCoupons?: Array<UserCoupon>;
}

/**
 * The react coupon list component.
 */
const CouponList: FunctionComponent<Props> = ({coupons, userCoupons}) => {

  const nav = useNavigation();
  const handleCouponPopup = (coupon: Coupon) => {
    if(coupon.attributes.valid === 0){
      Alert.alert("Ce coupon n'est plus valide");
      return;
    }
    nav.navigate('Coupon', {id: coupon.id});
  }

  const getUserCoupon = (coupon: Coupon): UserCoupon|undefined => {
    return userCoupons?.find(uc => uc.relationships.coupon === coupon.id);
  }

  return (
    <View>
      {coupons.map(coupon => <CouponCard coupon={coupon} key={coupon.id} onClick={handleCouponPopup} userCoupon={getUserCoupon(coupon)}/>)}
    </View>
  );
}

export default CouponList;