import Api from "../../api/Api";
import {Coupon} from "../../entities";
import {CouponList, LinkCard} from "../../components";
import React, { FunctionComponent, useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import {Images} from "../../images";
import {genericStyles} from "../../styles";

/**
 * The react home page.
 */

const HomePage: FunctionComponent = () => {

  const [coupons, setCoupons] = useState<Array<Coupon>>(undefined);

  const getData = async () => {
    const retrievedCoupons: Array<Coupon> = await Api.CouponsApi.list(['1', '2']).then(response => response);
    setCoupons(retrievedCoupons);
  }

  useEffect(() => {
    getData();
  }, []);


  const styles = StyleSheet.create({
    center:{
      width: '85%',
      marginLeft: 'auto',
      marginRight: 'auto'
    },
  });

  return (
    <ScrollView>
      <View style={{...genericStyles.rowBetween, ...styles.center}}>
        <LinkCard text='Scanner' icon={Images.qrCode} link='/qr-scanner'/>
        <LinkCard text='Mes coupons' icon={Images.heart} link='/my-coupons'/>
      </View>
      <View style={{...genericStyles.rowBetween, ...styles.center}}>
        <LinkCard text='Etablissements' icon={Images.googleMaps} link='/establishments'/>
        <LinkCard text='Commander' icon={Images.globe} link='https://google.com'/>
      </View>
      {coupons && <CouponList coupons={coupons}/>}
    </ScrollView>
  );
}
export default HomePage;
