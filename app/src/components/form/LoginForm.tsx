import React, { Component } from 'react';
import { Alert, View, Text, Button, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { genericStyles } from '../../styles';

/**
 * Login page.
 */

export default class Login extends Component {
    state = {
    email: '',
    password: '',
  };


    onLogin() {
        const { email, password } = this.state;
        Alert.alert('Informations', `email: ${email} + Mot de passe: ${password}`);
    }

    render() {  
    return (
        <View style={genericStyles.container}>
        <Text style={genericStyles.titleText}>Se connecter</Text>
          <TextInput
            value={this.state.email}
            keyboardType = 'email-address'
            onChangeText={(email) => this.setState({ email })}
            placeholder='email'
            placeholderTextColor = 'white'
            style={genericStyles.input}
          />
          <TextInput
            value={this.state.password}
            onChangeText={(password) => this.setState({ password })}
            placeholder={'Mot de passe'}
            secureTextEntry={true}
            placeholderTextColor = 'white'
            style={genericStyles.input}
          />
          
       
          <TouchableOpacity
            style={genericStyles.button}
            onPress={this.onLogin.bind(this)}
         >
           <Text style={genericStyles.buttonText}> Connexion </Text>
         </TouchableOpacity>
          
        </View>
      );
    }
}  
