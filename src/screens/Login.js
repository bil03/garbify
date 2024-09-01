import {View, Text} from 'react-native';
import React from 'react';

import HeadLogin from '../component/HeadLogin';
import CardLogin from '../component/CardLogin';

const Login = () => {
  return (
    <View>
      <HeadLogin label={'Login'} />
      <CardLogin />
    </View>
  );
};

export default Login;
