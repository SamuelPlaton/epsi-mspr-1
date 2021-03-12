import { client } from '../client';
import {setIncludes} from "../helpers";
import {Coupon} from "../../entities";
import {setUserCoupon} from "../users/UsersApi";

export interface NewCouponData {
  userId: string;
  userToken: string;
  couponId: string;
}

export interface ModifyCouponData {
  userId: string,
  userToken: string,
  couponId: string,
  userCouponId: string,
  used: string,
  favored: string,
}

export const setCoupon = (coupon: Object): Coupon => {
  return {
    id: coupon.id,
    attributes: {
      title: coupon['title'],
      start: coupon['start'],
      end: coupon['end'],
      offer: coupon['offer'],
      icon: coupon['icon'],
      description: coupon['description'],
      maxLimit: coupon['max_limit'],
      unique: coupon['unique'],
      code: coupon['code'],
      valid: coupon['valid']
    },
  };
};

const CouponsApi = {
  get: (id: string, includes?: Array<string>) => client.get(`/coupons/${id}`, setIncludes(includes)).then(response => {
    return setCoupon(response.data.coupon);
  }),
  getByCode: (code: string, includes?: Array<string>) => client.get(`/coupons/code/${code}`, setIncludes(includes)).then(response => {
    return setCoupon(response.data[0]);
  }),
  list: (ids: Array<string>) => client.get('/coupons', {params: { ids: ids.join(',')} }).then(response => {
    return response.data.map(coupon => setCoupon(coupon));
  }),
  listRecommended: (idUser: string) => client.get(`/coupons/recommended/${idUser}`).then(response => {
    return {
      coupons : response.data.coupons.map(coupon => setCoupon(coupon)),
      userCoupons: response.data.userCoupons.map(uc => setUserCoupon(uc))
    };
  }),
  post: (data: NewCouponData) => client.post('/coupons', {data: {...data} }).then(response => {
    return setUserCoupon(response.data);
  }),
  put: (data: ModifyCouponData) => client.put('/coupons', {data: {...data}}).then(response => {
    return setUserCoupon(response.data);
  }),
}

export default CouponsApi;
