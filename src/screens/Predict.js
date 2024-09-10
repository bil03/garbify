import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import GradientBackground from '../assets/color/GradientBackground';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const Predict = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {result, imageUrl} = route.params || {};

  // Periksa dan format data hasil
  const resultData = result?.predictionResult || [];

  return (
    <View style={styles.container}>
      <GradientBackground style={styles.gradientBackground}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-back-outline" size={25} color="white" />
        </TouchableOpacity>
        <Text style={styles.text}>Hasil Identifikasi</Text>
      </GradientBackground>
      {imageUrl ? (
        <Image source={{uri: imageUrl}} style={styles.image} />
      ) : (
        <Text style={styles.noResultText}>No image available</Text>
      )}
      <Text style={styles.resultText}>
        Hasil Identifikasi sampah recycle di gambar :
      </Text>
      <View style={styles.resultContainer}>
        <Text style={styles.resultText3}>Kategori</Text>
        <Text style={styles.resultText3}>tipe sampah</Text>
        <Text style={styles.resultText3}>Daur ulang</Text>
      </View>
      {resultData.length > 0 ? (
        <FlatList
          data={resultData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <View style={styles.resultItem}>
              <View style={styles.circleContainer}>
                <View style={[styles.circle, styles.categoryCircle]}>
                  <Text style={styles.circleText}>{item.name || 'N/A'}</Text>
                </View>
                <View style={[styles.circle, styles.typeCircle]}>
                  <Text style={styles.circleText}>{item.type || 'N/A'}</Text>
                </View>
                <View style={[styles.circle, styles.recyclableCircle]}>
                  <Text style={styles.circleText}>
                    {item.recycleStatus || 'N/A'}
                  </Text>
                </View>
              </View>
            </View>
          )}
        />
      ) : (
        <Text style={styles.noResultText}>No result available</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  resultText: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'flex-start',
    marginLeft: 20,
  },
  resultContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
  },
  resultText3: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10,
    alignSelf: 'flex-start',
    marginHorizontal: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  image: {
    width: '90%',
    height: 300,
    marginBottom: 20,
    borderRadius: 8,
    marginTop: 20,
  },
  resultItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    width: 350,
    shadowColor: '#000',
    elevation: 1,
  },
  circleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  circle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryCircle: {
    backgroundColor: '#76c893',
  },
  typeCircle: {
    backgroundColor: '#6bb1ff',
  },
  recyclableCircle: {
    backgroundColor: '#76c893',
  },
  circleText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  noResultText: {
    fontSize: 16,
    color: '#999',
  },
  gradientBackground: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  text: {
    fontFamily: 'Poppins',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    right: 100,
  },
});

export default Predict;
