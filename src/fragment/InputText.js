import {View, Text, TextInput, StyleSheet} from 'react-native';
import React from 'react';

const InputText = ({placeholder, label, value, onChangeText}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#D3D3D3"
        value={value}
        onChangeText={onChangeText}
      />
      <View style={styles.underline} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    width: '100%',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#535353',
    marginBottom: 5,
  },
  input: {
    fontSize: 16,
    color: '#333333',
    paddingVertical: 5,
    paddingHorizontal: 0,
    width: '100%',
  },
  underline: {
    height: 1,
    backgroundColor: '#D3D3D3',
    marginTop: 5,
  },
});

export default InputText;
