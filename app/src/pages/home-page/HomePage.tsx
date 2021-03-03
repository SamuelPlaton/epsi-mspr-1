import React, { FunctionComponent } from 'react';
import { View, Text, Button } from 'react-native';

/**
 * The react home page.
 */

// const HomePage: FunctionComponent = () => {

//   return (
//     <View>
//       <Text>Home Page</Text>
//     </View>
//   );
// }

function HomePage({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        title="Se connecter"
        onPress={() => navigation.navigate('Login')}
      />
      <Button
        title="S'enregistrer"
        onPress={() => navigation.navigate('Register')}
      />
    </View>
  );
}

export default HomePage;
