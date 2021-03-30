import React,{ FunctionComponent } from 'react';
import {ScrollView} from 'react-native';
import { UserInfo  } from '../../components/info';

const UserPage:FunctionComponent = () => {
    return (
      <ScrollView>
        <UserInfo />
      </ScrollView>
    );
  }
  
  export default UserPage;