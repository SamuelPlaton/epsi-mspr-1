import React, { FunctionComponent } from 'react';
import { useRoute } from '@react-navigation/native';
import { Text } from 'react-native';
import { CouponCard } from '../../components';

const CouponPage: FunctionComponent = () => {
  const coupon = useRoute().params;
  console.log('pages coupons');
  console.log(coupon);

  return <CouponCard coupon={coupon} key={coupon.id} />;
};

export default CouponPage;
