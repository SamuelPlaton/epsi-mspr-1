import {Coupon, Store, User, UserCoupon} from "../../../entities";
import React, {FunctionComponent} from 'react';
import {GestureResponderEvent, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {genericStyles} from "../../../styles";
import {Images} from "../../../images";
import moment from "moment";
import 'moment/locale/fr';
import {ModifyCouponData, NewCouponData} from "../../../api/coupons/CouponsApi";
import Api from "../../../api/Api";

/**
 * The react coupon detail.
 */
export interface Props {
  activeUser: User,
  coupon: Coupon,
  onUpdateUserCoupon: (userCoupon: UserCoupon) => void;
  stores: Array<Store>,
  userCoupon?: UserCoupon,
}


const CouponDetail: FunctionComponent<Props> = ({activeUser, coupon, onUpdateUserCoupon, stores, userCoupon}) => {
  const {title, offer, description, end, start, unique, maxLimit} = coupon.attributes;
  const iconInteraction = (userCoupon && parseInt(userCoupon?.attributes?.favored) === 1) ? Images.heartFull : Images.heartEmpty;
  const dateStart = moment(start).locale('fr').format('L');
  const dateEnd = moment(end).locale('fr').format('L');
  const expired = new Date(end) < new Date();
  const notActiveYet = new Date(start) > new Date();
  const storesNames = stores.map(s => s.attributes.name);
  const handleCoupon = async(e: GestureResponderEvent) => {
    e.stopPropagation();
    if (userCoupon) {
      const data: ModifyCouponData = { couponId: coupon.id,
        userId: activeUser.id,
        userToken: activeUser.attributes.token,
        userCouponId: userCoupon.id,
        used: userCoupon.attributes.used.toString(),
        favored: userCoupon.attributes.favored === "1" ? "0" : "1"}
      const updatedUserCoupon = await Api.CouponsApi.put(data);
      // Stop here if -1 is returned
      if (typeof updatedUserCoupon === 'number') {
        return;
      }
      onUpdateUserCoupon(updatedUserCoupon);
    } else {
      const data: NewCouponData = { couponId: coupon.id, userId: activeUser.id, userToken: activeUser.attributes.token}
      const newUserCoupon = await Api.CouponsApi.post(data);
      // Stop here if -1 is returned
      if (typeof newUserCoupon === 'number') {
        return;
      }
      onUpdateUserCoupon(newUserCoupon);
    }
  }

  const styles = StyleSheet.create({
    title: {
      fontSize: 25,
      overflow: 'hidden'
    },
    offer: {
      color: '#ff0000'
    },
    desc: {
      fontSize: 15,
      color: 'black'
    },
    conditions: {
      fontSize: 15,
      color: '#AAAAAA'
    }
  });

  return (
    <View style={{marginTop: 10, marginBottom: 30}}>
      <View style={{...genericStyles.rowBetween, marginBottom: 10}}>
        <Image source={require('../../../assets/icons/coupon.png')} style={genericStyles.iconMedium}/>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity activeOpacity={1} onPress={(e) => handleCoupon(e)}>
          <Image source={iconInteraction} style={genericStyles.iconSmall}/>
        </TouchableOpacity>
      </View>
      <Text style={styles.offer}>{offer}*</Text>
      <Text style={{...styles.desc, marginBottom: 10, marginTop: 10}}>{description}</Text>
      <View>
        {unique === 1 && <Text style={styles.conditions}>1 Utilisation par personne max.</Text>}
        {maxLimit && <Text style={styles.conditions}>Dans la limite des {maxLimit} premières utilisations.</Text>}
        <Text style={styles.conditions}>Eligible dans nos magasins suivants : {storesNames.join(',')}</Text>
        <Text style={{
          ...styles.conditions,
          color: `${(expired || notActiveYet) ? 'red' : '#AAAAAA'}`
        }}>{expired && 'Expiré.'}{notActiveYet && `Disponible le ${dateStart}.`}{(!notActiveYet && !expired) && `Expire le ${dateEnd}.`}</Text>
      </View>
    </View>
  );
}
export default CouponDetail;
