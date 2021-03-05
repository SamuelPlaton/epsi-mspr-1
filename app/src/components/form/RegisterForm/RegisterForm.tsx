import React, {FunctionComponent, useState} from 'react';
import {Alert, Button, Text, TextInput, View} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {genericStyles} from '../../../styles';
import {NewUserData} from "../../../api/users/UsersApi";
import Api from "../../../api/Api";
import {storeActiveUser} from "../../../store/UserManager";
import {User} from "../../../entities";


/**
 * Register form.
 */

const RegisterForm: FunctionComponent = () => {
  const nav = useNavigation();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confPassword, setConfPassword] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [day, setDay] = useState<number>(1);
  const [month, setMonth] = useState<number>(1);
  const [year, setYear] = useState<number>(2000);

  const onRegister = async() => {
    if (password !== confPassword) {
      Alert.alert('Les mots de passe ne sont pas les mêmes');
      return;
    }
    const date = new Date();
    date.setFullYear(year, month, day);
    const userData: NewUserData = {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      birthday: date,
    }
    const data = await Api.UsersApi.post(userData);
    if(data === -1){
      Alert.alert('Cet email est déjà pris');
      return;
    }
    await storeActiveUser(data as User);
    nav.navigate('Home', data);
  }

    return (
      <View style={genericStyles.container}>
        <Text style={genericStyles.titleText}>Bienvenue !</Text>
        <Text style={genericStyles.label}>Entrez votre email</Text>
        <TextInput
          value={email}
          keyboardType='email-address'
          onChangeText={(value) => setEmail(value)}
          placeholder='john.doe@email.com'
          placeholderTextColor='#999999'
          style={genericStyles.input}
        />
        <Text style={genericStyles.label}>Entrez votre mot de passe</Text>
        <TextInput
          value={password}
          onChangeText={(value) => setPassword(value)}
          placeholder='******'
          secureTextEntry={true}
          placeholderTextColor='#999999'
          style={genericStyles.input}
        />
        <Text style={genericStyles.label}>Confirmez votre mot de passe</Text>
        <TextInput
          value={confPassword}
          onChangeText={(value) => setConfPassword(value)}
          placeholder='******'
          secureTextEntry={true}
          placeholderTextColor='#999999'
          style={genericStyles.input}
        />
        <View style={{...genericStyles.rowBetween, width: '60%'}}>
          <Text style={{...genericStyles.label, width: '40%'}}>Prénom</Text>
          <Text style={{...genericStyles.label, width: '40%'}}>Nom</Text>
        </View>
        <View style={{...genericStyles.rowBetween, width: '60%', marginBottom: 10}}>
          <TextInput
            value={firstName}
            onChangeText={(value) => setFirstName(value)}
            placeholder='John'
            placeholderTextColor='#999999'
            style={{...genericStyles.input, width: '40%'}}
          />
          <TextInput
            value={lastName}
            onChangeText={(value) => setLastName(value)}
            placeholder='Doe'
            placeholderTextColor='#999999'
            style={{...genericStyles.input, width: '40%'}}
          />
        </View>
        <Text style={{...genericStyles.label, width: '60%'}}>Date de naissance</Text>
        <View style={{...genericStyles.rowBetween, width: '60%', marginBottom: 10}}>
          <TextInput value={day.toString()}
                     onChangeText={(value) => setDay(value.length > 0 ? parseInt(value) : 0)}
                     style={{...genericStyles.input, width: '20%'}}
                     keyboardType='number-pad'/>
          <TextInput value={month.toString()}
                     onChangeText={(value) => setMonth(value.length > 0 ? parseInt(value) : 0)}
                     style={{...genericStyles.input, width: '20%'}}
                     keyboardType='number-pad'/>
          <TextInput value={year.toString()}
                     onChangeText={(value) => setYear(value.length > 0 ? parseInt(value) : 0)}
                     style={{...genericStyles.input, width: '40%'}}
                     keyboardType='number-pad'/>
        </View>
        <Button title={'Créer mon compte'} onPress={onRegister} />
      </View>
    );
}   

export default RegisterForm;
