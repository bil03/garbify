import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {signInWithEmailAndPassword} from 'firebase/auth';

import {Firebase_Auth} from '../../config/Firebase';

import InputText from '../fragment/InputText';
import PwText from '../fragment/PwText';

const CardLogin = () => {
  const navigation = useNavigation();

  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const Auth = Firebase_Auth;

  const HandleLogin = () => {
    if (!Email || !Password) {
      alert('Error', 'Email dan kata sandi harus diisi');
      return;
    }
    signInWithEmailAndPassword(Auth, Email, Password)
      .then(userCredential => {
        const user = userCredential.user;
        console.log('Login berhasil:', user);
        navigation.navigate('HomePage'); // Navigasi ke halaman utama setelah login berhasil
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('Error:', errorCode, errorMessage);
        alert('Login Gagal', errorMessage); // Menampilkan alert jika login gagal
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <InputText
          placeholder={'Masukan Email'}
          label={'Email'}
          value={Email}
          onChangeText={setEmail}
        />
        <PwText
          label={'Kata Sandi'}
          value={Password}
          onChangeText={setPassword}
        />
        <TouchableOpacity>
          <Text style={styles.forgotPasswordText}>Lupa Kata Sandi?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginButton} onPress={HandleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.registerText}>
          Belum memiliki akun?{' '}
          <Text
            style={styles.registerLink}
            onPress={() => navigation.navigate('RegisterPage')}>
            Daftar
          </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F0F0', // Background abu-abu muda di sekitar card
  },
  card: {
    width: '80%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    elevation: 3,
    height: 350,
    top: 100,
  },
  forgotPasswordText: {
    // alignSelf: 'flex-end',
    left: 83,
    color: '#4CAF50',
    marginBottom: 20,
  },
  loginButton: {
    width: '100%',
    height: 45,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerText: {
    color: '#808080',
    fontSize: 14,
    marginTop: 20,
  },
  registerLink: {
    color: '#00A3FF',
    fontWeight: 'bold',
  },
});

export default CardLogin;
