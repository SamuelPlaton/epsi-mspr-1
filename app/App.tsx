import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import BaseCard from './src/components/cards/base-card/BaseCard';
import { NativeRouter } from 'react-router-native';
import Router from './src/router/Router';

export default function App() {
  return (
    <NativeRouter>
      <View style={styles.container}>
        <BaseCard bgColor={'#999999'} style={{backgroundColor: '#111111'}} rounded={true}>
          <Text style={styles.text}>Hello there</Text>
          <Text style={styles.text}>Hello there</Text>
        </BaseCard>
        <Router/>
      </View>
    </NativeRouter>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    backgroundColor: '#444444'
  }
});
