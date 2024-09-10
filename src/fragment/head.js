import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {signOut} from 'firebase/auth';
import {Firebase_Auth} from '../../config/Firebase';
import {useNavigation} from '@react-navigation/native';

const Head = () => {
  const navigation = useNavigation();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(Firebase_Auth);
      console.log('User signed out!');
      setDropdownVisible(false);
      navigation.navigate('LoginPage');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const navigateToProfile = () => {
    setDropdownVisible(false);
    navigation.navigate('Profil');
  };

  return (
    <View style={styles.head}>
      <Text style={styles.title}>Garbify</Text>
      <View style={styles.settingsContainer}>
        <TouchableOpacity
          onPress={() => setDropdownVisible(!dropdownVisible)}
          style={styles.settingsButton}>
          <Icon name="settings-sharp" color={'#FFFFFF'} size={25} />
        </TouchableOpacity>
        {dropdownVisible && (
          <View style={styles.dropdownMenu}>
            <TouchableOpacity
              onPress={navigateToProfile}
              style={styles.dropdownItem}>
              <Text style={styles.dropdownItemText}>Edit Profil</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleLogout}
              style={styles.dropdownItem}>
              <Text style={styles.dropdownItemText}>Logout</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
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
  settingsContainer: {
    position: 'relative',
  },
  settingsButton: {
    padding: 10,
  },
  dropdownMenu: {
    position: 'absolute',
    top: 40, // Adjust based on button height
    right: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    width: 150, // Adjust width as needed
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  dropdownItemText: {
    fontSize: 18,
    color: '#038E4C',
  },
});

export default Head;
