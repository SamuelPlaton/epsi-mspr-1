import React, { FunctionComponent, useState} from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import { genericStyles } from '../../../styles';
import Api from "../../../api/Api";
import {storeActiveUser} from "../../../store/UserManager";
import {User} from "../../../entities";
import {useNavigation} from "@react-navigation/native";

/**
 * Login form.
 */

const LoginForm: FunctionComponent = () => {
  const nav = useNavigation();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

    const handleLogin = async () => {
      const data = await Api.UsersApi.login(email, password);
      console.log(data);
      // Stop here if -1 is returned
      if (typeof data === 'number') {
        return;
      }
      await storeActiveUser(data as User);
      nav.navigate('Home', data);
    }

    return (
        <View style={genericStyles.container} accessibilityLabel="page-de-connexion">
          <Text style={genericStyles.titleText}>Connexion</Text>
          <Text style={genericStyles.label}>Entrez votre email</Text>
          <TextInput
            value={email}
            keyboardType = 'email-address'
            onChangeText={(value) => setEmail(value)}
            placeholder='Email'
            placeholderTextColor = '#999999'
            style={genericStyles.input}
            accessibilityLabel="email"
          />
          <Text style={genericStyles.label}>Entrez votre mot de passe</Text>
          <TextInput
            value={password}
            onChangeText={(value) => setPassword(value)}
            placeholder={'******'}
            secureTextEntry={true}
            placeholderTextColor = '#999999'
            style={genericStyles.input}
            accessibilityLabel="password"

          />
          <Button accessibilityLabel="connexion" title={'Se connecter'} onPress={handleLogin} />
        </View>
      );
}

export default LoginForm;
