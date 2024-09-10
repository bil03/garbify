import {View, Text, StyleSheet} from 'react-native';
import React, {Fragment} from 'react';
import {useNavigation} from '@react-navigation/native';
import {doc, getDoc} from 'firebase/firestore';
import {Firestore_DB} from '../../config/Firebase';

import BoxImage from '../fragment/BoxImage';

const CardBox = () => {
  const navigation = useNavigation();

  const handlePress = async id => {
    try {
      // Mengambil data dari Firestore berdasarkan ID
      const docRef = doc(Firestore_DB, 'sampah', id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        navigation.navigate('Detail', {id, data});
      } else {
        console.log('Document does not exist');
      }
    } catch (error) {
      console.error('Error fetching document:', error);
    }
  };

  return (
    <Fragment>
      <Text style={styles.headerText}>Kategori Sampah</Text>
      <View style={styles.container}>
        <View style={styles.colom}>
          <BoxImage
            label="Kaca"
            iconSource={require('../assets/image/glass.png')}
            style={styles.boxImage}
            onPress={() => handlePress('55e702d7-6a35-414f-8359-61c564f29a4b')}
          />
          <BoxImage
            label="Plastik"
            iconSource={require('../assets/image/plastic.png')}
            style={styles.boxImage}
            onPress={() => handlePress('204ce923-87b4-4b3c-a290-67f34d57ccba')}
          />
          <BoxImage
            label="Kertas"
            iconSource={require('../assets/image/paper.png')}
            style={styles.boxImage}
            onPress={() => handlePress('78bae206-7835-4edb-b43a-b4846075d905')}
          />
          <BoxImage
            label="Logam"
            iconSource={require('../assets/image/scrap.png')}
            style={styles.boxImage}
            onPress={() => handlePress('c65d1a34-1bb0-4caa-b829-05fd3fcf89ac')}
          />
        </View>
        <View style={styles.colom}>
          <BoxImage
            label="Sepatu"
            iconSource={require('../assets/image/shoes.png')}
            style={styles.boxImage}
            onPress={() => handlePress('9a3304eb-3220-4361-962c-b73e597014ac')}
          />
          <BoxImage
            label="Pakaian"
            iconSource={require('../assets/image/clothes.png')}
            style={styles.boxImage}
            onPress={() => handlePress('2f3e79fb-0c80-415f-9d05-66f334f5a0a9')}
          />
          <BoxImage
            label="Baterai"
            iconSource={require('../assets/image/battery.png')}
            style={styles.boxImage}
            onPress={() => handlePress('af89dedb-cd64-4768-82be-514ff1d96855')}
          />
          <BoxImage
            label="makanan"
            iconSource={require('../assets/image/healthy-food.png')}
            style={styles.boxImage}
            onPress={() => handlePress('07ab47c6-e55a-4c46-94af-c0be61c8fffc')}
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
