import Api from "../../api/Api";
import {Coupon, HistoriqueCoupon, Store, User, UserCoupon} from "../../entities";
import React, {FunctionComponent, useEffect, useState} from 'react';
import {Button, ScrollView, Text, View} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import {retrieveActiveUser} from "../../store/UserManager";
import {useNavigation, useRoute} from '@react-navigation/native';
import {CouponDetail} from "../../components/detail";
import {genericStyles} from "../../styles";
import {UseCouponForm} from "../../components/form";

/**
 * The react coupon page.
 */

const CouponPage: FunctionComponent = () => {
  const nav = useNavigation();
  const route = useRoute();


  const couponId = route.params['id'];

  const [coupon, setCoupon] = useState<Coupon>(undefined);
  const [userCoupon, setUserCoupon] = useState<UserCoupon>(undefined);
  const [stores, setStores] = useState<Array<Store>>([]);
  const [historiqueCoupons, setHistoriqueCoupons] = useState<Array<HistoriqueCoupon>>([]);
  const [activeUser, setActiveUser] = useState<User | undefined>(undefined);

  const getData = async () => {
    if (!activeUser) {
      retrieveActiveUser().then(response => {
        setActiveUser(response);
        return response
      });
    }
    if (!activeUser || coupon) {
      return;
    }
    const data = await Api.CouponsApi.get(couponId, activeUser.id, activeUser.attributes.token);
    setHistoriqueCoupons(data.historiqueCoupons);
    setUserCoupon(data.userCoupon);
    setStores(data.stores);
    setCoupon(data.coupon);
  }

  useEffect(() => {
    getData();
  }, [activeUser]);

  const handleUseCoupon = () => {

  }

  return (
    <ScrollView>
      {coupon && (
        <View style={genericStyles.center}>
          <CouponDetail activeUser={activeUser} coupon={coupon} stores={stores} userCoupon={userCoupon}
                        onUpdateUserCoupon={(uc) => setUserCoupon(uc)}/>
          <UseCouponForm activeUser={activeUser} coupon={coupon} onUpdateUserCoupon={(uc) => setUserCoupon(uc)} userCoupon={userCoupon} />
        </View>
      )}

    </ScrollView>
  );
}
export default CouponPage;
