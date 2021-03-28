import React, { FunctionComponent, useState } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import { getLocationInformation } from './promise/PromiseLocation';
import { getStorsInformation } from './promise/PromiseStors';

const GoogleMap: FunctionComponent = () => {
  const [markersArray, setMarkersArray] = useState<Array<Marker>>([]);
  const coords = getLocationInformation();
  const storesObj = getStorsInformation();

  Promise.all([storesObj]).then((value) => {
    const markers = value[0].stores.map((store) => {
      if (store.id != 1) {
        const lat = parseFloat(store.attributes.localization[0]);
        const lng = parseFloat(store.attributes.localization[1]);
        return (
          <Marker
            key={store.id}
            coordinate={{
              latitude: lat,
              longitude: lng,
            }}
          />
        );
      }
    });
    setMarkersArray((arr) => [...arr, markers]);
  });
  return (
    <MapView
      style={{ flex: 1 }}
      provider={PROVIDER_GOOGLE}
      showsUserLocation
      /* initialRegion={{
        latitude: coords.latitude,
        longitude: coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,

      }} */
    >
      {markersArray}
    </MapView>
  );
};
export default GoogleMap;
