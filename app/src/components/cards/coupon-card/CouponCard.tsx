import React, {FunctionComponent} from 'react';
import {BaseCard} from "../index";
import {CouponInfo} from "../../info";
import {Coupon} from "../../../entities";
import {StyleSheet} from "react-native";

/* Coupon Card Props
*   coupon: The coupon component
*   onClick Callback when the card is clicked
 */
export interface Props {
  coupon: Coupon,
  onClick: (coupon: Coupon) => void;
}

/**
 * The react coupon card component.
 */
const CouponCard: FunctionComponent<Props> = ({coupon, onClick}) => {

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
      <CouponInfo coupon={coupon}/>
    </BaseCard>);
}

export default CouponCard;