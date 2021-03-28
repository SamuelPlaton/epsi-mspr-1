import { client } from '../client';
import { handleErrorMessages, setCoupon, setHistoriqueCoupon, setStore, setUserCoupon } from '../helpers';

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
  action?: string,
}

const CouponsApi = {
  get: (id: string, userId: string, token: string) => client.get(`/coupons/${id}?stores=true&user=${userId}&token=${encodeURIComponent(token)}`).then(response => {
    return {
      coupon: setCoupon(response.data.coupon[0]),
      historiqueCoupons: response.data.historiqueCoupons.map(hc => setHistoriqueCoupon(hc)),
      userCoupon: response.data.userCoupons.length > 0 ? setUserCoupon(response.data.userCoupons[0]) : undefined,
      stores: response.data.stores.map(s => setStore(s)),
  };
  }).catch(err => handleErrorMessages(err.response.data)),

  getByCode: (code: string) => client.get(`/coupons/code/${code}`).then(response => {
    return setCoupon(response.data[0]);
  }).catch(err => handleErrorMessages(err.response.data)),

  list: (ids: Array<string>) => client.get('/coupons', {params: { ids: ids.join(',')} }).then(response => {
    return response.data.map(coupon => setCoupon(coupon));
  }).catch(err => handleErrorMessages(err.response.data)),

  listRecommended: (idUser: string) => client.get(`/coupons/recommended/${idUser}`).then(response => {
    return {
      coupons : response.data.coupons.map(coupon => setCoupon(coupon)),
      userCoupons: response.data.userCoupons.map(uc => setUserCoupon(uc))
    };
  }).catch(err => handleErrorMessages(err.response.data)),

  post: (data: NewCouponData) => client.post('/coupons', {data: {...data} }).then(response => {
    return setUserCoupon(response.data);
  }).catch(err => handleErrorMessages(err.response.data)),

  put: (data: ModifyCouponData) => client.put('/coupons', {data: {...data}}).then(response => {
    return setUserCoupon(response.data);
  }).catch(err => handleErrorMessages(err.response.data)),
}

export default CouponsApi;
