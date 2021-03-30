  
import React, { FunctionComponent, useEffect, useState } from 'react';
import { Button, ScrollView, Text, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Api from '../../api/Api';
import { Coupon, User, UserCoupon } from '../../entities';
import { CouponList, LinkCard } from '../../components';
import { Images } from '../../images';
import { genericStyles } from '../../styles';
import { retrieveActiveUser } from '../../store/UserManager';

/**
 * The react home page.
 */

const HomePage: FunctionComponent = () => {
  const nav = useNavigation();

  // Allow the page to refresh his datas even after a goBack
  useEffect(() => {
    nav.addListener('focus', async () => {
      setCoupons(undefined);
      await getData();
    });
  }, []);

  const route = useRoute();
  const [coupons, setCoupons] = useState<Array<Coupon>>(undefined);
  const [userCoupons, setUserCoupons] = useState<Array<UserCoupon>>(undefined);
  // Retrieve our active user
  const [activeUser, setActiveUser] = useState<User | undefined>(route.params ? (route.params as User) : undefined);

  const getData = async () => {
    // await AsyncStorage.removeItem('activeUser'); // Disconnect

    if (!activeUser) {
      retrieveActiveUser().then((response) => {
        if (response) {
          setActiveUser(response);
        }
      });
    }
    // If no coupons, retrieve them else return
    if (!activeUser || coupons) {
      return;
    }

    // retrieve recommended coupons

    const retrievedCoupons = await Api.CouponsApi.listRecommended(activeUser.id).then(response => response);
    // Stop here if -1 is returned
    if (typeof retrievedCoupons === 'number') {
      return;
    }

    setCoupons(retrievedCoupons.coupons);
    setUserCoupons(retrievedCoupons.userCoupons);
  };

  useEffect(() => {
    getData();
  }, [activeUser]);

  return (
    <ScrollView>
      {activeUser ? (
        <View>
          <Text style={{ ...genericStyles.marginXAuto, ...genericStyles.subtitleText }}>
            Salut {activeUser.attributes.firstName} !
          </Text>
          <Button title='Temp Profile' onPress={() => nav.navigate('User')}/>
          <View style={{ ...genericStyles.rowBetween, ...genericStyles.center }}>
            <LinkCard text='Scanner' icon={Images.qrCode} link='Scan' />
            <LinkCard text='Mes coupons' icon={Images.heart} link='Coupons' />
          </View>
          <View style={{ ...genericStyles.rowBetween, ...genericStyles.center }}>
            <LinkCard text='Etablissements' icon={Images.googleMaps} link='Map' />
            <LinkCard text='Commander' icon={Images.globe} link='https://google.com' />
          </View>
          {coupons && coupons.length > 0 ? (
            <View>
              <Text style={{ ...genericStyles.marginXAuto, ...genericStyles.subtitleText }}>
                {' '}
                Les dernières offres !{' '}
              </Text>
              <CouponList coupons={coupons} userCoupons={userCoupons} />
            </View>
          ) : (
            <Text style={{ ...genericStyles.marginXAuto, ...genericStyles.subtitleText }}>
              Désolé, il n'y a pas de coupon disponible pour le moment.
            </Text>
          )}
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