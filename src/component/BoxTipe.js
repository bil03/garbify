import {View, Text, StyleSheet} from 'react-native';
import React, {Fragment} from 'react';
import BoxImage from '../fragment/BoxImage';

const CardBox = () => {
  return (
    <Fragment>
      <Text style={styles.headerText}>Tipe Sampah</Text>
      <View style={styles.container}>
        <View style={styles.colom}>
          <BoxImage
            label="Organik"
            iconSource={require('../assets/image/recycle.png')}
            style={styles.customBoxImage}
          />
          <BoxImage
            label="Anorganik"
            iconSource={require('../assets/image/recycle-bin.png')}
            style={styles.customBoxImage}
          />
        </View>
      </View>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 20,
    // marginVertical: 10,
    fontFamily: 'Poppins',
    color: '#404040',
    marginTop: 20,
    marginBottom: 10,
  },
  container: {
    width: '90%',
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    alignSelf: 'center',
    elevation: 5, // menambahkan shadow untuk Android
    marginBottom: 10,
  },
  colom: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  customBoxImage: {
    box: {
      marginRight: 20,
    },
    text: {
      marginRight: 20,
    },
  },
});

export default CardBox;
