import {View, Text} from 'react-native';
import React from 'react';

import HeadLogin from '../component/HeadLogin';
import CardRegis from '../component/CardRegis';

const Register = () => {
  return (
    <View>
      <HeadLogin label={'Daftar'} />
      <CardRegis />
    </View>
  );
};

export default Register;
