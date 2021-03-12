
import React, {FunctionComponent} from 'react';
import {RegisterForm} from "../../components";

import {ScrollView} from "react-native";

const RegisterPage: FunctionComponent = () => {
  return (

    <ScrollView>
      <RegisterForm/>
    </ScrollView>

  );
}

export default RegisterPage;
