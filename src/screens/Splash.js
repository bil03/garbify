import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import GradientBackground from '../assets/color/GradientBackground';

const Splash = () => {
  return (
    <GradientBackground style={styles.gradientBackground}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require('../assets/image/logo-garbify.png')}
        />
        <Text style={styles.text}>Garbify</Text>
        <Text style={styles.textBottom}>
          Solusi Terbaik Identifikasi Sampah Recycle
        </Text>
      </View>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  imageContainer: {
    marginTop: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 50,
    fontWeight: 'bold',
    color: 'white',
  },
  textBottom: {
    marginTop: 330,
    fontSize: 15,
    color: 'white',
  },
});

export default Splash;
