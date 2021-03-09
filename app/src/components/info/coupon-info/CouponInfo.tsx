import React, { FunctionComponent } from 'react';
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
  View,
} from 'react-native';
import { Coupon, UserCoupon } from '../../../entities';

/* Coupon info Props
 *   coupon: The coupon component
 */
export interface Props {
  coupon: Coupon;
  userCoupon?: UserCoupon;
}

/**
 * The react coupon info component.
 */
const CouponInfo: FunctionComponent<Props> = ({ coupon, userCoupon }) => {
  const { title, end, offer, code } = coupon.attributes;
  const date = moment(end).format('L');
  const iconInteraction = userCoupon
    ? require('../../../assets/icons/trash.png')
    : require('../../../assets/icons/plus.png');

  const styles = StyleSheet.create({
    title: {
      fontSize: 30,
    },
    offer: {
      color: '#ff0000',
    },
    code: {
      fontSize: 40,
      textAlign: 'center',
    },
    conditions: {
      fontSize: 15,
      color: '#AAAAAA',
    },
    date: {
      marginLeft: 'auto',
    },
    row: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    marginXAuto: {
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    iconSmall: {
      width: 30,
      height: 30,
      margin: 5,
    },
    iconMedium: {
      width: 50,
      height: 50,
      margin: 5,
    },
  });

  const handleCoupon = (e: GestureResponderEvent) => {
    e.stopPropagation();
    if (userCoupon) {
      // Remove user coupon
    } else {
      // Add user Coupon
    }
  };
  const copyCode = (e: GestureResponderEvent) => {
    e.stopPropagation();
    Clipboard.setString(code);
  };

  return (
    <View>
      <Text style={styles.date}>Expire le {date}</Text>
      <View style={styles.row}>
        <Image source={require('../../../assets/icons/coupon.png')} style={styles.iconMedium} />
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.offer}>{offer}*</Text>
        </View>
      </View>
      <View style={{ ...styles.row, ...styles.marginXAuto, marginBottom: 5 }}>
        <Text style={{ ...styles.code, marginRight: 10 }}>{code}</Text>
        <Button title='Copier' onPress={(e) => copyCode(e)} />
      </View>
      <View style={{ ...styles.row, justifyContent: 'space-between' }}>
        <Text style={styles.conditions}>*Voir conditions</Text>
        <TouchableHighlight onPress={(e) => handleCoupon(e)}>
          <TouchableOpacity activeOpacity={1} onPress={(e) => handleCoupon(e)}>
            <Image source={iconInteraction} style={styles.iconSmall} />
          </TouchableOpacity>
        </TouchableHighlight>
      </View>
    </View>
  );
};

export default CouponInfo;
