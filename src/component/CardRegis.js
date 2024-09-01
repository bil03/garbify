import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {useState} from 'react';
import React from 'react';
import {Firebase_Auth, Firestore_DB} from '../../config/Firebase';
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
} from 'firebase/auth';
import {doc, setDoc} from 'firebase/firestore';

import {useNavigation} from '@react-navigation/native';

import InputText from '../fragment/InputText';
import PwText from '../fragment/PwText';

const CardRegis = () => {
  const navigation = useNavigation();
  const [Nama, setNama] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    if (Password !== ConfirmPassword) {
      Alert.alert('Error', 'Password dan Konfirmasi Password tidak sesuai');
      return;
    }

    try {
      // Mendaftar pengguna
      const userCredential = await createUserWithEmailAndPassword(
        Firebase_Auth,
        Email,
        Password,
      );
      const user = userCredential.user;

      // Mengatur displayName
      await updateProfile(user, {displayName: Nama});

      // Menyimpan data pengguna ke Firestore
      await setDoc(doc(Firestore_DB, 'users', user.uid), {
        nama: Nama,
        email: Email,
      });

      // Logout setelah pendaftaran berhasil
      await signOut(Firebase_Auth);

      // Menampilkan pesan sukses dan navigasi ke halaman login
      Alert.alert('Sukses', 'Pendaftaran berhasil! Silakan login.');
      navigation.navigate('LoginPage');
    } catch (error) {
      const errorMessage = error.message;
      console.log('Error:', error);
      Alert.alert('Pendaftaran Gagal', errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <InputText
          placeholder={'Masukan Nama'}
          label={'Nama'}
          value={Nama}
          onChangeText={setNama}
        />
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
        <PwText
          label={'Konfirmasi Kata Sandi'}
          value={ConfirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity style={styles.loginButton} onPress={handleRegister}>
          <Text style={styles.loginButtonText}>Daftar</Text>
        </TouchableOpacity>
        <Text style={styles.registerText}>
          Sudah punya akun?{' '}
          <Text
            style={styles.registerLink}
            onPress={() => navigation.navigate('LoginPage')}>
            Login
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
    backgroundColor: '#F0F0F0',
  },
  card: {
    width: '80%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    elevation: 3,
    height: 520,
    top: 180,
  },
  loginButton: {
    width: '100%',
    height: 45,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginTop: 25,
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

export default CardRegis;
