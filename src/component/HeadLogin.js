import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

import GradientBackground from '../assets/color/GradientBackground';

const HeadLogin = ({label}) => {
  return (
    <View style={styles.container}>
      <GradientBackground style={styles.gradientBackground}>
        <Text style={styles.text}>{label}</Text>
        <Text style={styles.subtext}>Untuk menggunakan aplikasi</Text>
      </GradientBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Poppins',
  },
  gradientBackground: {
    width: '100%',
    height: 250,
    paddingHorizontal: 30,
  },
  text: {
    fontFamily: 'Poppins',
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginTop: 50,
  },
  subtext: {
    fontFamily: 'Poppins',
    fontSize: 15,
    color: '#FFFFFF',
    marginTop: 10,
  },
});

export default HeadLogin;
