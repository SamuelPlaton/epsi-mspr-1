import React, {FunctionComponent, useState} from 'react';
import {default as BaseCard} from "../base-card/BaseCard";
import {CouponInfo} from "../../info";
import {Coupon, UserCoupon} from "../../../entities";
import {StyleSheet} from "react-native";

/* Coupon Card Props
*   coupon: The coupon component
*   onClick Callback when the card is clicked
 */
export interface Props {
  coupon: Coupon,
  onClick: (coupon: Coupon) => void;
  userCoupon?: UserCoupon;
}

/**
 * The react coupon card component.
 */
const CouponCard: FunctionComponent<Props> = ({coupon, onClick, userCoupon}) => {

  const [syncedUserCoupon, setSyncedUserCoupon] = useState<UserCoupon|undefined>(userCoupon);
  const styles = StyleSheet.create({
    card: {
      padding: 5,
      width: '80%',
      marginLeft: 'auto',
      marginRight: 'auto',
      marginBottom: 20
    }
  });

  return (
    <BaseCard bgColor='#FEFEFE' style={styles.card} onClick={() => onClick(coupon)}>
      <CouponInfo coupon={coupon} userCoupon={syncedUserCoupon} onUpdateUserCoupon={(uc) => setSyncedUserCoupon(uc)}/>
    </BaseCard>);
}

export default CouponCard;