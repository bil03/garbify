import React, {Fragment, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Firestore_DB} from '../../config/Firebase';
import {doc, getDoc} from 'firebase/firestore';
import LoadingSpinner from '../component/Loading';
import GradientBackground from '../assets/color/GradientBackground';
import Icon from 'react-native-vector-icons/Ionicons';
import MapCard from '../component/MapCard';

const Detail = ({route, navigation}) => {
  const {id} = route.params; // Mendapatkan id dari params
  const [data, setData] = useState(null); // State untuk menyimpan data yang diambil
  const [loading, setLoading] = useState(true); // State untuk loading indicator

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const docRef = doc(Firestore_DB, 'sampah', id); // Referensi dokumen berdasarkan id
        const docSnap = await getDoc(docRef); // Mendapatkan dokumen

        if (docSnap.exists()) {
          setData(docSnap.data()); // Menyimpan data ke state
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching document:', error); // Menangkap error
      } finally {
        setLoading(false); // Menghentikan loading setelah data diambil
      }
    };

    fetchDocument();
  }, [id]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!data) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Data not found</Text>
      </View>
    );
  }

  return (
    <Fragment>
      <GradientBackground style={styles.gradientBackground}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-back-outline" size={25} color="white" />
        </TouchableOpacity>
        <Text style={styles.text}>Detail Sampah</Text>
      </GradientBackground>
      <ScrollView style={styles.container}>
        <Image source={{uri: data.imageUrl}} style={styles.image} />
        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Kategori</Text>
            <View style={[styles.circle, styles.categoryCircle]}>
              <Text style={styles.circleText}>{data.category}</Text>
            </View>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Tipe Sampah</Text>
            <View style={[styles.circle, styles.typeCircle]}>
              <Text style={styles.circleText}>{data.type}</Text>
            </View>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Daur Ulang</Text>
            <View style={[styles.circle, styles.recyclableCircle]}>
              <Text style={styles.circleText}>{data.recyclable}</Text>
            </View>
          </View>
        </View>

        <View style={styles.detailContainer}>
          <Text style={styles.sectionTitle}>Deskripsi</Text>
          <Text style={styles.detailText}>{data.description}</Text>
        </View>

        <View style={styles.detailContainer}>
          <Text style={styles.sectionTitle}>Cara Penanganannya</Text>
          <Text style={styles.detailText}>{data.handling1}</Text>
          <Text style={styles.detailText}>{data.handling2}</Text>
        </View>

        <MapCard style={styles.mapCard} />
      </ScrollView>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '90%',
    height: 200,
    alignSelf: 'center',
    marginTop: 10,
    borderRadius: 10,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  infoItem: {
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
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
  detailContainer: {
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 15,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    elevation: 5, // menambahkan shadow untuk Android
    shadowColor: '#000', // shadow untuk iOS
    shadowOffset: {width: 0, height: 2}, // shadow untuk iOS
    shadowOpacity: 0.1, // shadow untuk iOS
    shadowRadius: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  detailText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'justify',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    marginHorizontal: 20,
    padding: 15,
    backgroundColor: '#E0F8E0',
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
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
    right: 110,
  },
});

export default Detail;
