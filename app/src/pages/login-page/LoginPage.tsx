import React, {FunctionComponent} from 'react';
import {LoginForm} from "../../components";
import {ScrollView} from "react-native";

const LoginPage: FunctionComponent = () => {
  return (
    <ScrollView>
      <LoginForm/>
    </ScrollView>
  );
}

export default LoginPage;