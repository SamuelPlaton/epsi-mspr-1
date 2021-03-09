import React, { FunctionComponent, useEffect, useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Api from '../../api/Api';
import { Coupon, User } from '../../entities';
import { CouponList, LinkCard } from '../../components';
import { Images } from '../../images';
import { genericStyles } from '../../styles';
import { retrieveActiveUser } from '../../store/UserManager';

/**
 * The react home page.
 */

const HomePage: FunctionComponent = () => {
  const nav = useNavigation();
  const route = useRoute();

  const [coupons, setCoupons] = useState<Array<Coupon>>(undefined);
  // Retrieve our active user
  const [activeUser, setActiveUser] = useState<User | undefined>(route.params ? (route.params as User) : undefined);
  retrieveActiveUser().then((response) => {
    setActiveUser(response);
  });

  const getData = async () => {
    // await AsyncStorage.removeItem('activeUser'); // Disconnect
    const retrievedCoupons: Array<Coupon> = await Api.CouponsApi.list(['1', '2']).then((response) => response);
    setCoupons(retrievedCoupons);
  };

  useEffect(() => {
    getData();
  }, []);

  const styles = StyleSheet.create({
    center: {
      width: '85%',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    greetings: {
      width: '80%',
      marginTop: 10,
      marginBottom: 10,
      fontSize: 20,
    },
  });

  return (
    <ScrollView>
      {activeUser ? (
        <View>
          <Text style={{ ...genericStyles.marginXAuto, ...styles.greetings }}>
            Salut {activeUser.attributes.firstName} {activeUser.attributes.lastName}
          </Text>
          <View style={{ ...genericStyles.rowBetween, ...styles.center }}>
            <LinkCard text='Scanner' icon={Images.qrCode} link='scan' />
            <LinkCard text='Mes coupons' icon={Images.heart} link='/my-coupons' />
          </View>
          <View style={{ ...genericStyles.rowBetween, ...styles.center }}>
            <LinkCard text='Etablissements' icon={Images.googleMaps} link='/establishments' />
            <LinkCard text='Commander' icon={Images.globe} link='https://google.com' />
          </View>
          <Text style={{ ...genericStyles.marginXAuto, ...styles.greetings }}> Les dernières offres ! </Text>
          {coupons && <CouponList coupons={coupons} />}
        </View>
      ) : (
        <View>
          <View style={{ width: '50%', ...genericStyles.marginXAuto, marginTop: 15 }}>
            <Button title='Se connecter' onPress={() => nav.navigate('Login')} />
          </View>
          <Text style={{ marginTop: 5, marginBottom: 5, textAlign: 'center' }}>Ou</Text>
          <View style={{ width: '50%', ...genericStyles.marginXAuto }}>
            <Button title="S'inscrire" onPress={() => nav.navigate('Register')} />
          </View>
        </View>
      )}
    </ScrollView>
  );
};
export default HomePage;
