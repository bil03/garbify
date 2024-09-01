import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';

import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';

import BoxImage from '../fragment/BoxImage';

const MapCard = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('Map')}>
      <View style={styles.row}>
        <View style={styles.colom}>
          <BoxImage
            iconSource={require('../assets/image/recycle-symbol.png')}
            style={styles.customBoxImage}
            onPress={() => navigation.navigate('Map')}
          />
          <Text style={styles.text}>Ayo, Temukan Tempat Pusat Daur ulang</Text>
        </View>
        <Icon name="keyboard-arrow-right" color={'#333'} size={25} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    // height: 80,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    alignSelf: 'center',
    elevation: 5,
    marginBottom: 80,
    marginTop: 10,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
  },
  colom: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
  },
  text: {
    fontFamily: 'Poppins',
    fontSize: 13,
    color: '#404040',
    marginLeft: 10,
    width: 180,
  },
  customBoxImage: {
    container: {
      marginTop: 20,
    },
    box: {
      marginTop: 10,
    },
  },
});

export default MapCard;
