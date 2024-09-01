import {View, Text, StyleSheet} from 'react-native';
import React, {Fragment} from 'react';
import {useNavigation} from '@react-navigation/native';

import BoxImage from '../fragment/BoxImage';

const CardBox = () => {
  const navigation = useNavigation();
  return (
    <Fragment>
      <Text style={styles.headerText}>Kategori Sampah</Text>
      <View style={styles.container}>
        <View style={styles.colom}>
          <BoxImage
            label="Kaca"
            iconSource={require('../assets/image/glass.png')}
            style={styles.boxImage}
            onPress={() => navigation.navigate('Detail')}
          />
          <BoxImage
            label="Plastik"
            iconSource={require('../assets/image/plastic.png')}
            style={styles.boxImage}
            onPress={() => navigation.navigate('Detail')}
          />
          <BoxImage
            label="Kertas"
            iconSource={require('../assets/image/paper.png')}
            style={styles.boxImage}
            onPress={() => navigation.navigate('Detail')}
          />
          <BoxImage
            label="Logam"
            iconSource={require('../assets/image/scrap.png')}
            style={styles.boxImage}
            onPress={() => navigation.navigate('Detail')}
          />
        </View>
        <View style={styles.colom}>
          <BoxImage
            label="Sepatu"
            iconSource={require('../assets/image/shoes.png')}
            style={styles.boxImage}
            onPress={() => navigation.navigate('Detail')}
          />
          <BoxImage
            label="Pakaian"
            iconSource={require('../assets/image/clothes.png')}
            style={styles.boxImage}
            onPress={() => navigation.navigate('Detail')}
          />
          <BoxImage
            label="Baterai"
            iconSource={require('../assets/image/battery.png')}
            style={styles.boxImage}
            onPress={() => navigation.navigate('Detail')}
          />
          <BoxImage
            label="makanan"
            iconSource={require('../assets/image/healthy-food.png')}
            style={styles.boxImage}
            onPress={() => navigation.navigate('Detail')}
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
    marginVertical: 10,
    fontFamily: 'Poppins',
    color: '#404040',
  },
  container: {
    alignItems: 'center',
    width: '90%',
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    alignSelf: 'center',
    elevation: 5, // menambahkan shadow untuk Android
    shadowColor: '#000', // shadow untuk iOS
    shadowOffset: {width: 0, height: 2}, // shadow untuk iOS
    shadowOpacity: 0.1, // shadow untuk iOS
    shadowRadius: 10, // shadow untuk iOS
  },
  colom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginVertical: 5,
  },
});

export default CardBox;
