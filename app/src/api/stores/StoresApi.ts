import { client } from '../client';
import { handleErrorMessages, setIncludes, setStore } from '../helpers';

const StoresApi = {
  get: (id: string, includes?: Array<string>) => client.get(`/stores/${id}`, setIncludes(includes)).then(response => {
    return setStore(response.data);
  }).catch(err => handleErrorMessages(err.response.data)),

  list: (ids?: Array<string>) => client.get(ids ? `/stores/selected?ids=${ids.join(',')}` : '/stores').then(response => {
    return response.data.map(store => setStore(store));
  }).catch(err => handleErrorMessages(err.response.data)),

  put: (userId: string, stores: Array<string>, token: string) => client.put('/stores', {data: { userId, stores, token }}).then(response => {
    return response;
  }).catch(err => handleErrorMessages(err.response.data)),
}

export default StoresApi;
