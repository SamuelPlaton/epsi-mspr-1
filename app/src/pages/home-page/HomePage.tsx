import Api from "../../api/Api";
import {Coupon, User, UserCoupon} from "../../entities";
import {CouponList, LinkCard} from "../../components";
import React, {FunctionComponent, useEffect, useState} from 'react';
import {Button, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Images} from "../../images";
import {genericStyles} from "../../styles";
import {retrieveActiveUser} from "../../store/UserManager";
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * The react home page.
 */

const HomePage: FunctionComponent = () => {
  const nav = useNavigation();
  const route = useRoute();

  const [coupons, setCoupons] = useState<Array<Coupon>>(undefined);
  const [userCoupons, setUserCoupons] = useState<Array<UserCoupon>>(undefined);
  // Retrieve our active user
  const [activeUser, setActiveUser] = useState<User | undefined>(route.params ? route.params as User : undefined);

  const getData = async () => {
    //await AsyncStorage.removeItem('activeUser'); // Disconnect
    // If no active user, retrieve it
    if(!activeUser){
      retrieveActiveUser().then(response => {
        if(response){
          setActiveUser(response);
        }
      });
    }
    // If no coupons, retrieve them else return
    if(!activeUser || coupons){
      return;
    }
    // retrieve recommended coupons
    const retrievedCoupons = await Api.CouponsApi.listRecommended(activeUser.id).then(response => response);
    setCoupons(retrievedCoupons.coupons);
    setUserCoupons(retrievedCoupons.userCoupons);
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
      {activeUser ? (
          <View>
            <Text style={{...genericStyles.marginXAuto, ...styles.greetings}}>Salut {activeUser.attributes.firstName} !</Text>
            <View style={{...genericStyles.rowBetween, ...styles.center}}>
              <LinkCard text='Scanner' icon={Images.qrCode} link='/qr-scanner'/>
              <LinkCard text='Mes coupons' icon={Images.heart} link='Coupons'/>
            </View>
            <View style={{...genericStyles.rowBetween, ...styles.center}}>
              <LinkCard text='Etablissements' icon={Images.googleMaps} link='/establishments'/>
              <LinkCard text='Commander' icon={Images.globe} link='https://google.com'/>
            </View>
            {(coupons && coupons.length > 0) ? (
              <View>
                <Text style={{...genericStyles.marginXAuto, ...styles.greetings}}> Les dernières offres ! </Text>
                <CouponList coupons={coupons} userCoupons={userCoupons}/>
              </View>
            )
            : (<Text style={{...genericStyles.marginXAuto, ...styles.greetings}}>Désolé, il n'y a pas de coupon disponible pour le moment.</Text>)}
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
