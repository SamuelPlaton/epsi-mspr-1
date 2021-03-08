import { client } from '../client';
import {setIncludes} from "../helpers";
import {User} from "../../entities";

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

const UsersApi = {
  get: (id: string, includes?: Array<string>) => client.get(`/users/${id}`, setIncludes(includes)).then(response => {
    console.log(JSON.stringify(response.data));
    return setUser(response.data);
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
    console.log(response.data);
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
