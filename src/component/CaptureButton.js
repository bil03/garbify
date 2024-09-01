import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

const ButtonCapture = ({onCapture}) => {
  return <TouchableOpacity style={styles.button} onPress={onCapture} />;
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 30,
    left: '50%',
    transform: [{translateX: -35}], // Sesuaikan posisi untuk center
    width: 70, // Ukuran lingkaran
    height: 70, // Ukuran lingkaran
    backgroundColor: 'white', // Warna latar belakang putih
    borderRadius: 35, // Membuat tombol berbentuk lingkaran
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5, // Menambahkan bayangan untuk efek 3D
  },
});

export default ButtonCapture;
