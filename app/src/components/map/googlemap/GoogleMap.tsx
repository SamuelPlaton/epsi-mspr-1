import React, { FunctionComponent, useState } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import { getLocationInformation } from '../../../promise/PromiseLocation';
import { getStoresInformation } from '../../../promise/PromiseStores';

const GoogleMap: FunctionComponent = () => {
  const [markersArray, setMarkersArray] = useState<Array<Marker>>([]);
  const position = getLocationInformation();
  const storesObj = getStoresInformation();

  Promise.all([storesObj]).then((value) => {
    const markers = value[0].filteredStores.map((store) => {
      const lat = parseFloat(store.attributes.localization.split(',')[0]);
      const lng = parseFloat(store.attributes.localization.split(',')[1]);
      return (
        <Marker
          key={store.id}
          coordinate={{
            latitude: lat,
            longitude: lng,
          }}
        />
      );
    });
    setMarkersArray((arr) => [...arr, markers]);
  });
  return (
    <MapView style={{ flex: 1 }} provider={PROVIDER_GOOGLE} showsUserLocation>
      {markersArray}
    </MapView>
  );
};
export default GoogleMap;
