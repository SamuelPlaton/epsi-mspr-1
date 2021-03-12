import React, {FunctionComponent} from 'react';
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
import {User} from "../../../entities";
import {genericStyles} from "../../../styles";
import {Images} from "../../../images";

/* Coupon info Props
*   coupon: The coupon component
 */
export interface Props {
  user: User;
  // userCoupon?: UserCoupon;
}

/**
 * The react coupon info component.
 */
const UserInfo: FunctionComponent<Props> = ({user}) => {
  const {firstName, lastName, email, birthday} = user.attributes;
  const date = moment(birthday).format('L');

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
    }
  });

  return (
    <View>
      <Text style={styles.date}>Date anniversaire {date}</Text>
      <View style={genericStyles.rowBetween}>
        <Text style={styles.conditions}>*Voir conditions</Text>
      </View>
    </View>);
}

export default UserInfo;