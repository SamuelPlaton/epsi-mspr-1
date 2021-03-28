import React from 'react';
import Api from '../../../../api/Api';
import StoresApi from '../../../../api/stores/StoresApi';

export async function getStorsInformation() {
  const stores = await Api.StoresApi.list();
  for (const store of stores) {
    if (store.id != 1) {
      const localisation = store.attributes.localization;
      store.attributes.localization = localisation.split(',');
    }
  }
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        stores,
      });
    }, 2000);
  });
}
