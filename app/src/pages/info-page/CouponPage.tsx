import React, { FunctionComponent } from 'react';
import { useRoute } from '@react-navigation/native';
import { CouponCard } from '../../components';
import { Coupon } from '../../entities';

const CouponPage: FunctionComponent = () => {
  const coupon = useRoute().params;
  const handleCouponPopup = (coupon: Coupon) => {};

  return <CouponCard coupon={coupon} onClick={handleCouponPopup} />;
};

export default CouponPage;
