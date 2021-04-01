import React, { FunctionComponent, useState} from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import { genericStyles } from '../../../styles';
import Api from "../../../api/Api";
import {storeActiveUser} from "../../../store/UserManager";
import {User} from "../../../entities";
import { ModifyUserData } from "../../../api/users/UsersApi";

/**
 * Login form.
 */

export interface Props {
  activeUser: User;
  onSubmit: (user: User) => void;
}

const UserForm: FunctionComponent<Props> = ({ activeUser, onSubmit }) => {
  const [firstName, setFirstName] = useState<string>(activeUser.attributes.firstName);
  const [lastName, setLastName] = useState<string>(activeUser.attributes.lastName);
  const [email, setEmail] = useState<string>(activeUser.attributes.email);

  const handleSubmit = async () => {
    const newData: ModifyUserData = {
      email: email,
      firstName: firstName,
      lastName: lastName,
      token: activeUser.attributes.token
    };
    const data =  await Api.UsersApi.modify(activeUser.id, newData);

    console.log(data);
    // Stop here if -1 is returned
    if (typeof data === 'number') {
      console.log('error');
      return;
    }

    console.log('on passe');
    const newUser: User = {
      ...activeUser,
      attributes: {
        ...activeUser.attributes,
        email: email,
        firstName: firstName,
        lastName: lastName,
      }
    }
    console.log(newUser);
    await storeActiveUser(newUser);
    onSubmit(newUser);
  }

  return (
    <View style={genericStyles.container}>
      <Text style={genericStyles.label}>Email</Text>
      <TextInput
        value={email}
        keyboardType = 'email-address'
        onChangeText={(value) => setEmail(value)}
        placeholder='Email'
        placeholderTextColor = '#999999'
        style={genericStyles.input}
      />
      <Text style={genericStyles.label}>Prénom</Text>
      <TextInput
        value={firstName}
        onChangeText={(value) => setFirstName(value)}
        placeholderTextColor = '#999999'
        style={genericStyles.input}
      />
      <Text style={genericStyles.label}>Nom</Text>
      <TextInput
        value={lastName}
        onChangeText={(value) => setLastName(value)}
        placeholderTextColor = '#999999'
        style={genericStyles.input}
      />
      <Button title={'Modifier'} onPress={handleSubmit} />
    </View>
  );
}

export default UserForm;
