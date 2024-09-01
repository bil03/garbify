import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import {useEffect, useState} from 'react';
import {Firebase_Auth} from './../../config/Firebase';

const Welcome = () => {
  const [userName, setUserName] = useState('Loading...');

  useEffect(() => {
    const checkAuth = async () => {
      const currentUser = Firebase_Auth.currentUser;
      if (currentUser) {
        const name = currentUser.displayName || currentUser.name || 'User';
        setUserName(name);
        console.log('User detected:', name);
      } else {
        console.log('No user is currently signed in.');
        setUserName('User');
      }
    };
    checkAuth();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.welcome}>
        <Image
          style={styles.image}
          source={require('../assets/image/avatar1.png')}
        />
        <View style={styles.text}>
          <Text style={styles.text1}>Selamat Datang</Text>
          <Text style={styles.text2}>{userName}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  welcome: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 20,
  },
  text: {
    marginLeft: 20,
  },
  text1: {
    color: '#FFFFFF',
    fontFamily: 'Poppins',
    fontSize: 15,
  },
  text2: {
    color: '#FFFFFF',
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    fontSize: 25,
  },
});

export default Welcome;
