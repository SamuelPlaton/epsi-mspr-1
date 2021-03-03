import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import BaseCard from './src/components/cards/base-card/BaseCard';
import { NativeRouter } from 'react-router-native';
import Router from './src/router/Router';

export default function App() {
  return (
    <NativeRouter>
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <BaseCard>
          <Text>Hello there</Text>
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
});
