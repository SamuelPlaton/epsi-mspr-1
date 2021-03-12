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

const HistoricPage: FunctionComponent = () => {
  const nav = useNavigation();

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
    const usedCoupons = data.coupons.filter(c => {
      const userCoupon = data.userCoupons.find(uc => uc.relationships.coupon === c.id);
      return userCoupon.attributes.used > 0;
    });
    setCoupons(usedCoupons);
    setUserCoupons(data.userCoupons);
  }

  useEffect(() => {
    getData();
  }, [activeUser]);

  const styles = StyleSheet.create({
    center: {
      width: '85%',
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
      ) : (<Text style={{...genericStyles.titleText, ...styles.center}}>Vous n'avez pas encore utilisé de coupons</Text>)}
    </ScrollView>
  );
}
export default HistoricPage;
