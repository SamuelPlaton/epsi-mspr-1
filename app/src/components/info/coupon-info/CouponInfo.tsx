import React, {FunctionComponent} from 'react';
import moment from 'moment';
import {Button, Clipboard, StyleSheet, Text, View} from 'react-native';
import {Coupon} from "../../../entities";

/* Coupon info Props
*   coupon: The coupon component
 */
export interface Props {
  coupon: Coupon
}

/**
 * The react coupon info component.
 */
const CouponInfo: FunctionComponent<Props> = ({coupon}) => {
  const {title, end, offer, code} = coupon.attributes;
  const date = moment(end).format('L');
  const styles = StyleSheet.create({
    title: {
      fontSize: 30,
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
    },
    row:{
      display: 'flex',
      flexDirection: "row",
      alignItems: "center"
    },
    marginXAuto:{
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  });

  return (
    <View>
      <Text style={styles.date}>Expire le {date}</Text>
      <View style={styles.row}>
        <Text style={{padding: 5}}>Icon</Text>
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.offer}>{offer}*</Text>
        </View>
      </View>
      <View style={{...styles.row, ...styles.marginXAuto, marginBottom: 5}}>
        <Text style={{...styles.code, marginRight: 10}}>{code}</Text>
        <Button title='Copier' onPress={() => Clipboard.setString(code)}/>
      </View>
      <View style={{...styles.row, justifyContent: "space-between"}}>
        <Text style={styles.conditions}>*Voir conditions</Text>
        <Text style={styles.conditions}>Fav Icon</Text>
      </View>
    </View>);
}

export default CouponInfo;