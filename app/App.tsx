import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import BaseCard from './src/components/cards/base-card/BaseCard';
import { NativeRouter } from 'react-router-native';
import Router from './src/router/Router';

export default function App() {
  return (
    <NativeRouter>
      <Router/>
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
