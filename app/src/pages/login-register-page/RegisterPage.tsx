import React, { Component } from 'react';
import { Alert, View, Text, Button, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

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
        <View style={styles.container}>
        <Text style={styles.titleText}>Créer un compte</Text>
          <TextInput
            value={this.state.email}
            keyboardType = 'email-address'
            onChangeText={(email) => this.setState({ email })}
            placeholder='email'
            placeholderTextColor = 'white'
            style={styles.input}
          />
          <TextInput
            value={this.state.password}
            onChangeText={(password) => this.setState({ password })}
            placeholder={'Mot de passe'}
            secureTextEntry={true}
            placeholderTextColor = 'white'
            style={styles.input}
          />

            <TextInput
            value={this.state.confPassword}
            onChangeText={(confPassword) => this.setState({ confPassword })}
            placeholder={'Confirmer mdp'}
            secureTextEntry={true}
            placeholderTextColor = 'white'
            style={styles.input}
          />
          
       
          <TouchableOpacity
            style={styles.button}
            //TODO verif les champs avant submission
            onPress={this.onRegister.bind(this)}
         >
           <Text style={styles.buttonText}> Créer un compte </Text>
         </TouchableOpacity>
          
        </View>
      );
    }
}   


const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'grey',
    },
    titleText:{
      fontSize: 50,
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: {
      alignItems: 'center',
      backgroundColor: 'powderblue',
      width: 200,
      height: 44,
      padding: 10,
      borderWidth: 1,
      borderColor: 'white',
      borderRadius: 25,
      marginBottom: 10,
    },
    buttonText:{
      fontSize: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
    input: {
      width: 200,
      fontSize: 20,
      height: 44,
      padding: 10,
      borderWidth: 1,
      borderColor: 'white',
      marginVertical: 10,
    },
  });