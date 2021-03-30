
import { client } from '../client';
import { handleErrorMessages, setIncludes } from "../helpers";
import {Store} from "../../entities";

export const setStore = (store: Object): Store => {
  return {id: store['id'],
    attributes: {
      name: store['name'],
      localization: store['localization'],
    },
    relationships:{
      users: store['users'],
      coupons: store['coupons'],
    }
  };
}

const StoresApi = {
  get: (id: string, includes?: Array<string>) => client.get(`/stores/${id}`, setIncludes(includes)).then(response => {
    return setStore(response.data);
  }).catch(err => handleErrorMessages(err.response.data)),

  list: (ids?: Array<string>) => client.get(ids ? `/stores/selected?ids=${ids.join(',')}` : '/stores').then(response => {
    return response.data.map(store => setStore(store));
  }).catch(err => handleErrorMessages(err.response.data)),

  put: (userId: string, stores: Array<string>, userToken: string) => client.put('/stores', {data: { userId, stores, userToken }}).then(response => {
    return response;
  }).catch(err => handleErrorMessages(err.response.data)),
}

export default StoresApi;