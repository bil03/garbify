import {View, Text, StyleSheet, TouchableOpacity, Modal} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {signOut} from 'firebase/auth';
import {Firebase_Auth} from '../../config/Firebase';
import {useNavigation} from '@react-navigation/native';

const Head = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(Firebase_Auth);
      console.log('User signed out!');
      setModalVisible(false);
      navigation.navigate('LoginPage');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <View style={styles.head}>
      <Text style={styles.title}>Garbify</Text>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Icon name="settings-sharp" color={'#FFFFFF'} size={25} />
      </TouchableOpacity>

      {/* Dropdown/Modal untuk logout */}
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}>
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setModalVisible(false)}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={handleLogout} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  head: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontFamily: 'Poppins',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 200,
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
  },
  modalButton: {
    paddingVertical: 10,
    borderBottomColor: '#ccc',
  },
  modalButtonText: {
    fontSize: 18,
    color: '#038E4C',
  },
});

export default Head;
