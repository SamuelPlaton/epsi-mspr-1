import { client } from '../client';
import {setIncludes} from "../helpers";
import {User, UserCoupon} from "../../entities";
import {setCoupon} from "../coupons/CouponsApi";

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

export const setUser = (user: Object): User => {
  return {id: user['id'], attributes: {
      firstName: user['firstName'],
      lastName: user['lastName'],
      email: user['email'],
      token: user['token'],
      registerDate: user['register_date'],
      birthday: user['birthday'],
    },
    relationships:{
      stores: user['stores'],
      coupons: user['coupons'],
    }
  };
}

export const setUserCoupon = (uc: Object): UserCoupon => {
  return {id: uc['id'], attributes: {
      used: uc['used'],
    },
    relationships:{
      user: uc['user'],
      coupon: uc['coupon'],
    }
  };
}

const UsersApi = {
  get: (id: string) => client.get(`/users/${id}?coupons=true`).then(response => {
    return {
      user: setUser(response.data.user[0]),
      coupons: response.data.coupons.map(c => setCoupon(c)),
      userCoupons: response.data.userCoupons.map(uc => setUserCoupon(uc)),
    }
  }),
  list: (ids: Array<string>) => client.get('/users', {data: ids}).then(response => {
    return response.data.map(user => setUser(user));
  }),
  post: (userData: NewUserData) => client.post('/users', {data: userData}).then(response => {
    if(response.data === -1){
      return -1 // Email already exist
    }else{
      return setUser(response.data);
    }

  }),
  login: (email: string, password: string) => client.post('/users/login', {data: { email, password }}).then(response => {
    if(response.data === -1){
      return -1; // Wrong email
    }else if(response.data === -2){
      return -2; // Wrong password
    }else{
      return setUser(response.data);
    }
  }),

  modify: (id: string, userData: ModifyUserData) => client.put(`/users/${id}`, {data: userData}).then(response => {
    console.log(response);
  }),
  modifyPassword: (id: string, passwordData: PasswordData) => client.put(`/users/password/${id}`, {data: passwordData}).then(response => {
    console.log(response);
  })
}

export default UsersApi;
