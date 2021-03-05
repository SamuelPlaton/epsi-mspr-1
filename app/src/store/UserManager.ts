import AsyncStorage from '@react-native-async-storage/async-storage';

import {User} from "../entities";

export const retrieveActiveUser = async () => {
  const value = await AsyncStorage.getItem('activeUser').then(response => response);
  if (value !== null) {
    return JSON.parse(value);
  }else{
    return undefined;
  }
}

export const storeActiveUser = async (user: User) => {
    await AsyncStorage.setItem('activeUser', JSON.stringify(user));
}
