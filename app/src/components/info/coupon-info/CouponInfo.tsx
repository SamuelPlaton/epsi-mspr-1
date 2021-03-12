import React, {FunctionComponent} from 'react';
import moment from 'moment';
import 'moment/locale/fr';
import {
  GestureResponderEvent,
  Image,
  StyleSheet,
  Text,
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
  onUpdateUserCoupon: (uc: UserCoupon) => void;
}

/**
 * The react coupon info component.
 */
const CouponInfo: FunctionComponent<Props> = ({coupon, onUpdateUserCoupon, userCoupon}) => {
  const {title, end, offer, start} = coupon.attributes;
  const dateStart = moment(start).locale('fr').format('L');
  const dateEnd = moment(end).locale('fr').format('L');
  const expired = new Date(end) < new Date();
  const notActiveYet = new Date(start) > new Date();
  const iconInteraction = (userCoupon && parseInt(userCoupon.attributes.favored) === 1) ? Images.heartFull : Images.heartEmpty;

  const styles = StyleSheet.create({
    title: {
      fontSize: 20,
      overflow: 'hidden'
    },
    offer: {
      color: '#ff0000'
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
      onUpdateUserCoupon(updatedUserCoupon);
    } else {
      const data: NewCouponData = { couponId: coupon.id, userId: activeUser.id, userToken: activeUser.attributes.token}
      const newUserCoupon = await Api.CouponsApi.post(data);
      onUpdateUserCoupon(newUserCoupon);
    }
  }

  return (
    <View>
      <Text style={{...styles.date, color: `${(expired || notActiveYet) ? 'red' : 'black'}`}}>{expired && 'Expiré'}{notActiveYet && `Disponible le ${dateStart}`}{(!notActiveYet && !expired) && `Expire le ${dateEnd}`}</Text>
      <View style={genericStyles.rowStart}>
        <Image source={require('../../../assets/icons/coupon.png')} style={genericStyles.iconMedium}/>
        <View style={{overflow: "hidden", maxWidth: "80%"}}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.offer}>{offer}*</Text>
          {(userCoupon && userCoupon.attributes.used > 0) && (
            <Text>Coupon utilisé {userCoupon.attributes.used} fois</Text>
          )}
        </View>
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