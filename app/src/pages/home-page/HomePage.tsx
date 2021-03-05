import React, { FunctionComponent } from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

/**
 * The react home page.
 */

const HomePage:FunctionComponent = () => {
  const nav = useNavigation();
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        title="Se connecter"
        onPress={() => nav.navigate('Login')}
      />
      <Button
        title="S'enregistrer"
        onPress={() => nav.navigate('Register')}
      />
    </View>
  );
}

export default HomePage;
