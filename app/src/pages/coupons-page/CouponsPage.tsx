import Api from "../../api/Api";
import {Coupon, User, UserCoupon} from "../../entities";
import {CouponList} from "../../components";
import React, {FunctionComponent, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
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
  const [userCoupons, setUserCoupons] = useState<Array<UserCoupon>>(undefined);
  const [activeUser, setActiveUser] = useState<User | undefined>(undefined);

  const getData = async () => {
    if(!activeUser){
      retrieveActiveUser().then(response => {
        setActiveUser(response);
        return response
      });
    }
    if(!activeUser || coupons){
      return;
    }
    const data = await Api.UsersApi.get(activeUser.id);
    const favoredCoupons = data.coupons.filter(c => {
      const userCoupon = data.userCoupons.find(uc => uc.relationships.coupon === c.id);
      const uniqueStatement = c.attributes.unique === 0 || (c.attributes.unique === 1 && userCoupon && parseInt(userCoupon.attributes.used) === 0);
      return userCoupon && parseInt(userCoupon.attributes.favored) === 1 && c.attributes.valid === 1 && uniqueStatement
    });
    setCoupons(favoredCoupons);
    setUserCoupons(data.userCoupons);
  }

  useEffect(() => {
    getData();
  }, [activeUser]);

  const styles = StyleSheet.create({
    center: {
      width: '80%',
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  });

  return (
    <ScrollView>
      {( coupons && coupons.length > 0) ? (
        <View>
          <Text style={{...genericStyles.subtitleText, ...genericStyles.marginXAuto}}> Mes Coupons ({coupons.length})</Text>
          <CouponList coupons={coupons} userCoupons={userCoupons}/>
        </View>
      ) : (<Text style={{...genericStyles.subtitleText, ...styles.center}}>Vous n'avez pas de coupons favoris</Text>)}
      <TouchableOpacity activeOpacity={1} onPress={() => nav.navigate('Historic')}>
        <Text style={{...styles.center, color: '#AAAAAA'}}>Voir mon historique</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
export default CouponsPage;
