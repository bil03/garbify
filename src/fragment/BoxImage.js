import {View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';
import React from 'react';
// import {useNavigation} from '@react-navigation/native';

const BoxImage = ({iconSource, label, style, onPress, id}) => {
  // const navigation = useNavigation();
  return (
    <View style={[styles.container, style && style.container]}>
      <TouchableOpacity
        style={[styles.box, style && style.box]}
        onPress={onPress}
        id={id}>
        <Image source={iconSource} style={styles.icon} />
      </TouchableOpacity>
      <Text style={[styles.text, style && style.text]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: 60,
    height: 60,
    backgroundColor: '#CCF3D8',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  icon: {
    width: 40,
    height: 40,
  },
  text: {
    marginTop: 10,
    fontFamily: 'Poppins',
    fontSize: 14,
    color: '#333',
    width: 70,
    textAlign: 'center',
  },
});
export default BoxImage;
