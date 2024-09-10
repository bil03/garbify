import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import GradientBackground from '../assets/color/GradientBackground';
import Icon from 'react-native-vector-icons/Ionicons';
import InputText from '../fragment/InputText';
import PwText from '../fragment/PwText';
import {
  updateProfile,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  getAuth,
} from 'firebase/auth';
import {Firebase_Auth} from '../../config/Firebase';
import {doc, updateDoc, getDoc} from 'firebase/firestore';
import {Firestore_DB} from '../../config/Firebase';

const Profil = ({navigation}) => {
  const [nama, setNama] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  // Fetch current user profile data
  useEffect(() => {
    const fetchUserProfile = async () => {
      const user = Firebase_Auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(Firestore_DB, 'users', user.uid));
        if (userDoc.exists()) {
          setNama(userDoc.data().nama);
        }
      }
    };

    fetchUserProfile();
  }, []);

  const handleUpdate = async () => {
    if (newPassword !== confirmNewPassword) {
      Alert.alert(
        'Error',
        'Kata sandi baru dan konfirmasi kata sandi baru tidak cocok!',
      );
      return;
    }

    try {
      const user = Firebase_Auth.currentUser;

      if (user) {
        // Update password jika ada perubahan
        if (newPassword) {
          const credential = EmailAuthProvider.credential(
            user.email,
            oldPassword,
          );
          await reauthenticateWithCredential(user, credential);
          await updatePassword(user, newPassword);
        }

        // Update profil di Firebase Authentication
        await updateProfile(user, {displayName: nama});

        // Update nama di Firestore
        await updateDoc(doc(Firestore_DB, 'users', user.uid), {nama});

        // Verify if update is successful
        const updatedUser = Firebase_Auth.currentUser;
        console.log('Updated Display Name:', updatedUser.displayName); // Check if displayName is updated

        Alert.alert('Sukses', 'Profil berhasil diperbarui!');
        navigation.navigate('HomePage');
      }
    } catch (error) {
      console.error('Update failed:', error);
      Alert.alert('Gagal memperbarui profil.', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <GradientBackground style={styles.gradientBackground}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-back-outline" size={25} color="white" />
        </TouchableOpacity>
        <Text style={styles.text}>Edit Profil</Text>
      </GradientBackground>
      <Image
        style={styles.image}
        source={require('../assets/image/avatar1.png')}
      />
      <View style={styles.card}>
        <InputText
          placeholder={'Masukan Nama'}
          label={'Nama'}
          value={nama}
          onChangeText={setNama}
        />
        <PwText
          label={'Kata Sandi Lama'}
          value={oldPassword}
          onChangeText={setOldPassword}
        />
        <PwText
          label={'Kata Sandi Baru'}
          value={newPassword}
          onChangeText={setNewPassword}
        />
        <PwText
          label={'Konfirmasi Kata Sandi Baru'}
          value={confirmNewPassword}
          onChangeText={setConfirmNewPassword}
        />
      </View>
      <TouchableOpacity style={styles.loginButton} onPress={handleUpdate}>
        <Text style={styles.loginButtonText}>Update</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradientBackground: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  text: {
    fontFamily: 'Poppins',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    right: 130,
  },
  image: {
    width: 150,
    height: 150,
    marginTop: 10,
    alignSelf: 'center',
  },
  loginButton: {
    width: '80%',
    height: 45,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginTop: 25,
    alignSelf: 'center',
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  card: {
    width: '80%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    elevation: 3,
    height: 400,
    justifyContent: 'center',
    marginTop: 20,
    alignSelf: 'center',
  },
});

export default Profil;
