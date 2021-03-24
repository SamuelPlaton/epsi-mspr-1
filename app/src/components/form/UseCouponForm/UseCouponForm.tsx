import {Coupon, HistoriqueCoupon, User, UserCoupon} from "../../../entities";
import React, {FunctionComponent} from 'react';
import { Alert, Button, Text, View } from 'react-native';
import {genericStyles} from "../../../styles";
import 'moment/locale/fr';
import {ModifyCouponData, NewCouponData} from "../../../api/coupons/CouponsApi";
import Api from "../../../api/Api";
import QRCode from "react-native-qrcode-svg";
import moment from "moment";

/**
 * The react coupon detail.
 */
export interface Props {
  activeUser: User,
  coupon: Coupon,
  onUpdateUserCoupon: (userCoupon: UserCoupon, historiqueCoupon: HistoriqueCoupon) => void;
  historiqueCoupons?: Array<HistoriqueCoupon>;
  userCoupon?: UserCoupon,
}


const UseCouponForm: FunctionComponent<Props> = ({activeUser, coupon, historiqueCoupons, onUpdateUserCoupon, userCoupon}) => {

  const {unique, start, end} = coupon.attributes;
  const lastHistoric = historiqueCoupons[0] ?? undefined;
  const lastHistoricDate = lastHistoric ? new Date(lastHistoric.attributes.usedTime) : undefined;
  const now = new Date();
  now.setMinutes(now.getMinutes() - 30);
  const available = lastHistoric ? lastHistoricDate > now : false;
  const uniqueUsed = unique === 1 && historiqueCoupons.length > 0;
  const expired = new Date(end) < new Date();
  const notActiveYet = new Date(start) > new Date();
  // Get difference in minutes between two dates
  const getMinutes = () => {
    const diffTime = Math.abs(now.getTime() - lastHistoricDate.getTime());
    return Math.ceil(diffTime / (1000 * 60));
  }

  const getTitle = () => {
    if (coupon.attributes.valid === 0 || expired) {
      return 'Expiré'
    } else if (uniqueUsed) {
      return 'Déjà utilisé';
    }else if (notActiveYet){
      return 'Pas encore utilisable'
    }
    return 'Utiliser'
  }
  const handleUseCoupon = async () => {
    if (userCoupon) {
      const data: ModifyCouponData = {
        couponId: coupon.id,
        userId: activeUser.id,
        userToken: activeUser.attributes.token,
        userCouponId: userCoupon.id,
        used: (userCoupon.attributes.used + 1).toString(),
        action: "use",
        favored: userCoupon.attributes.favored
      };
      const tempHistoric: HistoriqueCoupon = {
        id: 'temp', attributes: {
          usedTime: new Date().toString()
        },
        relationships: {
          userCoupon: userCoupon.id
        }
      }
      const updatedUserCoupon = await Api.CouponsApi.put(data);
      if(updatedUserCoupon === -14){
        Alert.alert(`Ce coupon a atteint sa limite d'utilisation`)
        return;
      }else if(updatedUserCoupon === -13){
        Alert.alert(`Vous avez déjà utilisé ce coupon`)
        return;
      }else if(updatedUserCoupon === -10){
        Alert.alert(`Ce coupon n'est plus valide`)
        return;
      }
      onUpdateUserCoupon(updatedUserCoupon, tempHistoric);
    } else {
      const data: NewCouponData = {couponId: coupon.id, userId: activeUser.id, userToken: activeUser.attributes.token}
      const newUserCoupon = await Api.CouponsApi.post(data);
      const modifyData: ModifyCouponData = {
        couponId: coupon.id,
        userId: activeUser.id,
        userToken: activeUser.attributes.token,
        userCouponId: newUserCoupon.id,
        used: "1",
        action: "use",
        favored: "0"
      }
      const updatedUserCoupon = await Api.CouponsApi.put(modifyData);
      const tempHistoric: HistoriqueCoupon = {
        id: 'temp', attributes: {
          usedTime: new Date().toString()
        },
        relationships: {
          userCoupon: newUserCoupon.id
        }
      }
      if(updatedUserCoupon === -14){
        Alert.alert(`Ce coupon a atteint sa limite d'utilisation`)
        return;
      }else if(updatedUserCoupon === -13){
        Alert.alert(`Vous avez déjà utilisé ce coupon`)
        return;
      }else if(updatedUserCoupon === -10){
        Alert.alert(`Ce coupon n'est plus valide`)
        return;
      }
      onUpdateUserCoupon(updatedUserCoupon, tempHistoric);
    }
  }


  return (
    <View style={genericStyles.marginXAuto}>
      <Button title={getTitle()} onPress={handleUseCoupon}
              disabled={available || coupon.attributes.valid === 0 || uniqueUsed || expired || notActiveYet}/>
      {available && (
        <View style={{marginTop: 10}}>
          <Text>Il vous reste {getMinutes()} minutes</Text>
          <View style={{marginTop: 10, ...genericStyles.marginXAuto}}>
            <QRCode value={coupon.attributes.code}/>
          </View>
          <Text style={{...genericStyles.titleText, ...genericStyles.marginXAuto}}>{coupon.attributes.code}</Text>
        </View>
      )}

    </View>
  );
}
export default UseCouponForm;
