import { client } from '../client';
import {setIncludes} from "../helpers";
import {Coupon} from "../../entities";

export interface NewCouponData {
  userId: string,
  userToken: string,
  couponId: string
}

export interface ModifyCouponData {
  userId: string,
  userToken: string,
  couponId: string,
  favored: number,
  used: number,
}

export const setCoupon = (coupon: Object): Coupon => {
  return {id: coupon['id'],
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
    },
    relationships:{
      users: coupon['users'],
      stores: coupon['stores'],
    }
  };
}

const CouponsApi = {
  get: (id: string, includes?: Array<string>) => client.get(`/coupons/${id}`, setIncludes(includes)).then(response => {
    return setCoupon(response.data.coupon);
  }),
  list: (ids: Array<string>) => client.get('/coupons', {params: { ids: ids.join(',')} }).then(response => {
    return response.data.map(coupon => setCoupon(coupon));
  }),
  post: (data: NewCouponData) => client.post('/coupons', {data: {...data} }).then(response => {
    return response;
  }),
  put: (data: ModifyCouponData) => client.put('/stores', {data: {...data}}).then(response => {
    return response;
  }),
}

export default CouponsApi;
