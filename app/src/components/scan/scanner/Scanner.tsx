import React, { useState, useEffect, FunctionComponent } from 'react';
import { Text, View, StyleSheet, Button, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useNavigation } from '@react-navigation/native';
import { Coupon } from '../../../entities';
import Api from '../../../api/Api';

const Scanner = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const nav = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      if (status === 'denied') nav.navigate('Home');
      setHasPermission(status === 'granted');
    })();
  }, []);

  const getData = async (data: any) => {
    const coupon = await Api.CouponsApi.getByCode(data).then((response) => response);
    // Stop here if -1 is returned
    if (typeof coupon === 'number') {
      setScanned(true);
      return;
    }
    nav.navigate('Coupon', coupon);
  };

  const handleBarCodeScanned = ({ data }) => {

    if (scanned) {
      return;
    }
    getData(data);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner onBarCodeScanned={handleBarCodeScanned} style={StyleSheet.absoluteFillObject} />
      {scanned && <Button title='Scanner à nouveau' onPress={() => setScanned(false)} />}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    backgroundColor: '#444444',
  },
});

export default Scanner;
