import React, { Component } from 'react';
import { Alert, View, Text, Button, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { genericStyles } from '../../styles';


/**
 * Register page.
 */

export default class Register extends Component {
    state = {
    email: '',
    password: '',
    confPassword: '',
  };

    confirmPassord(password, confPassword) {
        if(this.state.password !== this.state.confPassword){
            //TODO mettre un message
        }else{
            //TODO continuer
            }
    }

    onRegister() {
        const { email, password } = this.state;
        Alert.alert('Informations', `email: ${email} + Mot de passe: ${password}`);
    }

    render() {  
    return (
        <View style={genericStyles.container}>
        <Text style={genericStyles.titleText}>Créer un compte</Text>
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

            <TextInput
            value={this.state.confPassword}
            onChangeText={(confPassword) => this.setState({ confPassword })}
            placeholder={'Confirmer mdp'}
            secureTextEntry={true}
            placeholderTextColor = 'white'
            style={genericStyles.input}
          />
          
       
          <TouchableOpacity
            style={genericStyles.button}
            //TODO verif les champs avant submission
            onPress={this.onRegister.bind(this)}
         >
           <Text style={genericStyles.buttonText}> Créer un compte </Text>
         </TouchableOpacity>
          
        </View>
      );
    }
}   
