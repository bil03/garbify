import {View, StyleSheet} from 'react-native';
import React from 'react';

import GradientBackground from '../assets/color/GradientBackground';

import Head from '../fragment/head';
import Welcome from '../fragment/Welcome';

const HeadHome = () => {
  return (
    <View style={styles.container}>
      <GradientBackground style={styles.gradientBackground}>
        <Head />
        <Welcome />
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
    height: 220,
  },
});

export default HeadHome;
