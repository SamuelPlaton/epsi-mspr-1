import { client } from '../client';
import {setIncludes} from "../helpers";
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
  }),
  list: (ids?: Array<string>) => client.get(ids ? `/stores/selected?ids=${ids.join(',')}` : '/stores').then(response => {
    return response.data.map(store => setStore(store));
  }),
  put: (userId: string, stores: Array<string>, token: string) => client.put('/stores', {data: { userId, stores, token }}).then(response => {
    return response;
  }),
}

export default StoresApi;
