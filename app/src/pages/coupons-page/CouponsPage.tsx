import Api from "../../api/Api";
import {Coupon, User} from "../../entities";
import {CouponList, LinkCard} from "../../components";
import React, {FunctionComponent, useEffect, useState} from 'react';
import {Button, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Images} from "../../images";
import {genericStyles} from "../../styles";
import {retrieveActiveUser} from "../../store/UserManager";
import {useNavigation, useRoute} from '@react-navigation/native';

/**
 * The react coupons page.
 */

const CouponsPage: FunctionComponent = () => {
  const nav = useNavigation();
  const route = useRoute();

  const [coupons, setCoupons] = useState<Array<Coupon>>(undefined);
  const [activeUser, setActiveUser] = useState<User | undefined>(undefined);
  retrieveActiveUser().then(response => {
    setActiveUser(response);
    return response
  });
  // todo: handle data
  const getData = async () => {
    await Api.UsersApi.get(activeUser.id);
  }

  useEffect(() => {
    getData();
  }, [activeUser]);

  const styles = StyleSheet.create({
    center: {
      width: '85%',
      marginLeft: 'auto',
      marginRight: 'auto'
    },
    greetings: {
      width: '80%',
      marginTop: 10,
      marginBottom: 10,
      fontSize: 20
    }
  });

  return (
    <ScrollView>
      <Text>Salutt ca va oui</Text>
    </ScrollView>
  );
}
export default CouponsPage;
