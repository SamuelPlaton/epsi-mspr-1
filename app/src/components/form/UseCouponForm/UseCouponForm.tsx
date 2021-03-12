import {Coupon, User, UserCoupon} from "../../entities";
import React, {FunctionComponent} from 'react';
import {Button, GestureResponderEvent, StyleSheet, Text, View} from 'react-native';
import {genericStyles} from "../../../styles";
import 'moment/locale/fr';
import {ModifyCouponData, NewCouponData} from "../../../api/coupons/CouponsApi";
import Api from "../../../api/Api";
import QRCode from "react-native-qrcode-svg";

/**
 * The react coupon detail.
 */
export interface Props {
  activeUser: User,
  coupon: Coupon,
  onUpdateUserCoupon: (userCoupon: UserCoupon) => void;
  userCoupon?: UserCoupon,
}


const UseCouponForm: FunctionComponent<Props> = ({activeUser, coupon, onUpdateUserCoupon, userCoupon}) => {

  const handleUseCoupon = async(e: GestureResponderEvent) => {
    e.stopPropagation();
    if (userCoupon) {
      const data: ModifyCouponData = { couponId: coupon.id,
        userId: activeUser.id,
        userToken: activeUser.attributes.token,
        userCouponId: userCoupon.id,
        used: (parseInt(userCoupon.attributes.used)+1).toString(),
        action: "use",
        favored: userCoupon.attributes.favored}
      const updatedUserCoupon = await Api.CouponsApi.put(data);
      onUpdateUserCoupon(updatedUserCoupon);
    } else {
      // todo: PUT after post
      const data: NewCouponData = { couponId: coupon.id, userId: activeUser.id, userToken: activeUser.attributes.token}
      const newUserCoupon = await Api.CouponsApi.post(data);
      onUpdateUserCoupon(newUserCoupon);
    }
  }

  return (
    <View style={genericStyles.marginXAuto}>
      <Button title={'Utiliser'} onPress={handleUseCoupon}/>
      <QRCode value={coupon.attributes.code}/>
      <Text>{coupon.attributes.code}</Text>
    </View>
  );
}
export default UseCouponForm;
