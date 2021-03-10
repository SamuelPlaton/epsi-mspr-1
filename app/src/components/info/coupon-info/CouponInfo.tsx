import React, {FunctionComponent, useEffect, useState} from 'react';
import moment from 'moment';
import {
  Button,
  Clipboard,
  GestureResponderEvent,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View
} from 'react-native';
import {Coupon, UserCoupon} from "../../../entities";
import {genericStyles} from "../../../styles";
import {Images} from "../../../images";
import Api from "../../../api/Api";
import {retrieveActiveUser} from "../../../store/UserManager";
import {ModifyCouponData, NewCouponData} from "../../../api/coupons/CouponsApi";

/* Coupon info Props
*   coupon: The coupon component
 */
export interface Props {
  coupon: Coupon;
  userCoupon?: UserCoupon;
  onUpdateUserCoupon: (uc: UserCoupon, action: string) => void;
}

/**
 * The react coupon info component.
 */
const CouponInfo: FunctionComponent<Props> = ({coupon, onUpdateUserCoupon, userCoupon}) => {
  const {title, end, offer, code} = coupon.attributes;
  const date = moment(end).format('L');
  const iconInteraction = (userCoupon && parseInt(userCoupon.attributes.favored) === 1) ? Images.heartFull : Images.heartEmpty;

  const styles = StyleSheet.create({
    title: {
      fontSize: 20,
      overflow: 'hidden'
    },
    offer: {
      color: '#ff0000'
    },
    code: {
      fontSize: 40,
      textAlign: "center"
    },
    conditions: {
      fontSize: 15,
      color: '#AAAAAA'
    },
    date: {
      marginLeft: "auto"
    }
  });

  const handleCoupon = async(e: GestureResponderEvent) => {
    e.stopPropagation();
    const activeUser = await retrieveActiveUser();
    if (userCoupon) {
      const data: ModifyCouponData = { couponId: coupon.id,
        userId: activeUser.id,
        userToken: activeUser.attributes.token,
        userCouponId: userCoupon.id,
        used: userCoupon.attributes.used.toString(),
        favored: userCoupon.attributes.favored === "1" ? "0" : "1"}
      const updatedUserCoupon = await Api.CouponsApi.put(data);
      onUpdateUserCoupon(updatedUserCoupon, 'add');
    } else {
      const data: NewCouponData = { couponId: coupon.id, userId: activeUser.id, userToken: activeUser.attributes.token}
      const newUserCoupon = await Api.CouponsApi.post(data);
      onUpdateUserCoupon(newUserCoupon, 'add');
    }
  }
  const copyCode = (e: GestureResponderEvent) => {
    e.stopPropagation();
    Clipboard.setString(code);
  }

  return (
    <View>
      <Text style={styles.date}>Expire le {date}</Text>
      <View style={genericStyles.rowStart}>
        <Image source={require('../../../assets/icons/coupon.png')} style={genericStyles.iconMedium}/>
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.offer}>{offer}*</Text>
        </View>
      </View>
      <View style={{...genericStyles.rowStart, ...genericStyles.marginXAuto, marginBottom: 5}}>
        <Text style={{...styles.code, marginRight: 10}}>{code}</Text>
        <Button title='Copier' onPress={(e) => copyCode(e)}/>
      </View>
      <View style={genericStyles.rowBetween}>
        <Text style={styles.conditions}>*Voir conditions</Text>
          <TouchableOpacity activeOpacity={1} onPress={(e) => handleCoupon(e)}>
            <Image source={iconInteraction} style={genericStyles.iconSmall}/>
          </TouchableOpacity>
      </View>
    </View>);
}

export default CouponInfo;