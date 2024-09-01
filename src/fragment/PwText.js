import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

import Icon from 'react-native-vector-icons/Ionicons';

const InputText = ({label, value, onChangeText}) => {
  const [show, setShow] = React.useState(false);
  const [Visible, setVisible] = React.useState(true);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="************"
          secureTextEntry={Visible}
          placeholderTextColor="#D3D3D3" // Warna placeholder abu-abu
          value={value}
          onChangeText={onChangeText}
        />
        <TouchableOpacity
          onPress={() => {
            setVisible(!Visible);
            setShow(!show);
          }}>
          <Icon
            name={show === false ? 'eye-off' : 'eye'}
            color={'#D3D3D3'}
            size={25}
          />
        </TouchableOpacity>
      </View>
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
    width: 250,
  },
  underline: {
    height: 1,
    backgroundColor: '#D3D3D3',
    marginTop: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default InputText;
