import { client } from '../client';
import { handleErrorMessages, setCoupon, setHistoriqueCoupon, setStore, setUser, setUserCoupon } from '../helpers';
import {setIncludes} from "../helpers";
import {User, UserCoupon} from "../../entities";

export interface NewUserData {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  birthday: Date,
}

export interface ModifyUserData {
  firstName: string,
  lastName: string,
  email: string,
  token: string,
}

export interface PasswordData {
  previousPassword: string,
  newPassword: string,
  token: string
}


const UsersApi = {
  get: (id: string) => client.get(`/users/${id}?coupons=true&stores=true`).then(response => {
    console.log('réponse');
    console.log(response.data['stores']);
    return {
      user: setUser(response.data.user),
      coupons: response.data.coupons.map(c => setCoupon(c)),
      userCoupons: response.data.userCoupons.map(uc => setUserCoupon(uc)),
      stores: response.data.stores.map(s => setStore(s)),
      historiqueCoupons: response.data.historiqueCoupons.map(hc => setHistoriqueCoupon(hc)),
    }
  }).catch(err => handleErrorMessages(err.response.data)),

  list: (ids: Array<string>) => client.get('/users', {data: ids}).then(response => {
    return response.data.map(user => setUser(user));
  }).catch(err => handleErrorMessages(err.response.data)),

  post: (userData: NewUserData) => client.post('/users', {data: userData}).then(response => {
    return setUser(response.data);
  }).catch(err => handleErrorMessages(err.response.data)),

  login: (email: string, password: string) => client.post('/users/login', {data: { email, password }}).then(response => {
    return setUser(response.data);
  }).catch(err => handleErrorMessages(err.response.data)),

  modify: (id: string, userData: ModifyUserData) => client.put(`/users/${id}`, {data: userData}).then(response => {
    console.log(response);
  }).catch(err => handleErrorMessages(err.response.data)),

  modifyPassword: (id: string, passwordData: PasswordData) => client.put(`/users/password/${id}`, {data: passwordData}).then(response => {
    console.log(response);
  }).catch(err => handleErrorMessages(err.response.data)),
}

export default UsersApi;
