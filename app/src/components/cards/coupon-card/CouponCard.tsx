import React, {FunctionComponent} from 'react';
import {BaseCard} from "../index";
import {CouponInfo} from "../../info";
import {Coupon} from "../../../entities";
import {StyleSheet} from "react-native";

/* Coupon Card Props
*   coupon: The coupon component
 */
export interface Props {
  coupon: Coupon
}

/**
 * The react coupon info component.
 */
const CouponCard: FunctionComponent<Props> = ({coupon}) => {

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
    <BaseCard rounded bgColor='#EEEEEE' style={styles.card}>
      <CouponInfo coupon={coupon}/>
    </BaseCard>);
}

export default CouponCard;