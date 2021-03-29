import React from 'react';
import Api from '../api/Api';
import StoresApi from '../api/stores/StoresApi';

export async function getStoresInformation() {
  const stores = await Api.StoresApi.list();
  const filteredStores = stores.filter((store) => store.id != 1 );
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        filteredStores,
      });
    }, 2000);
  });
}
