import Api from "../../api/Api";
import {Coupon} from "../../entities";
import {CouponList, LinkCard} from "../../components";
import React, {FunctionComponent, useEffect, useState} from 'react';
import {Button, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Images} from "../../images";
import {genericStyles} from "../../styles";
import {retrieveActiveUser} from "../../store/UserManager";
import { useNavigation } from '@react-navigation/native';

/**
 * The react home page.
 */

const HomePage: FunctionComponent = () => {
  const nav = useNavigation();

  const [coupons, setCoupons] = useState<Array<Coupon>>(undefined);
  // Retrieve our active user
  const [activeUser, setActiveUser] = useState<number | undefined>(undefined);
  retrieveActiveUser().then(response => {
    setActiveUser(response);
  })

  const getData = async () => {
    const retrievedCoupons: Array<Coupon> = await Api.CouponsApi.list(['1', '2']).then(response => response);
    setCoupons(retrievedCoupons);
  }

  useEffect(() => {
    getData();
  }, []);


  const styles = StyleSheet.create({
    center: {
      width: '85%',
      marginLeft: 'auto',
      marginRight: 'auto'
    },
  });

  return (
    <ScrollView>
      {activeUser ? (
          <View>
            <View style={{...genericStyles.rowBetween, ...styles.center}}>
              <LinkCard text='Scanner' icon={Images.qrCode} link='/qr-scanner'/>
              <LinkCard text='Mes coupons' icon={Images.heart} link='/my-coupons'/>
            </View>
            <View style={{...genericStyles.rowBetween, ...styles.center}}>
              <LinkCard text='Etablissements' icon={Images.googleMaps} link='/establishments'/>
              <LinkCard text='Commander' icon={Images.globe} link='https://google.com'/>
            </View>
            {coupons && <CouponList coupons={coupons}/>}
          </View>
        )
        :
        (
          <View>
            <View style={{width: '50%', ...genericStyles.marginXAuto, marginTop: 15}}>
              <Button title='Se connecter' onPress={() => nav.navigate('Login')}/>
            </View>
            <Text style={{marginTop: 5, marginBottom: 5, textAlign: 'center'}}>Ou</Text>
            <View style={{width: '50%', ...genericStyles.marginXAuto}}>
            <Button title="S'inscrire" onPress={() => nav.navigate('Register')}/>
            </View>
          </View>
        )
      }

    </ScrollView>
  );
}
export default HomePage;
