import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {launchImageLibrary} from 'react-native-image-picker';
import {useNavigation, useRoute} from '@react-navigation/native';
import axios from 'axios';
import {Firebase_Auth} from '../../config/Firebase';
import LoadingSpinner from '../component/Loading'; // Import the custom spinner

const PraCamera = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [image, setImage] = useState(route.params?.photoUri || null);
  const [loading, setLoading] = useState(false); // State untuk loading

  useEffect(() => {
    console.log('Received photo URI: ', route.params?.photoUri);
    if (route.params?.photoUri) {
      const androidUri = route.params.photoUri.startsWith('file://')
        ? route.params.photoUri
        : `file://${route.params.photoUri}`;
      setImage(androidUri);
    }
  }, [route.params]);

  const openGallery = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        const selectedImageUri = response.assets[0].uri;
        setImage(selectedImageUri);
      }
    });
  };

  const analyzeImage = async () => {
    if (!image) {
      Alert.alert('No image selected', 'Please select an image to analyze.');
      return;
    }

    setLoading(true); // Mengaktifkan animasi loading

    try {
      const correctedUri = image.replace('file://file://', 'file://');
      console.log('Corrected Image URI:', correctedUri);

      const formData = new FormData();
      formData.append('image', {
        uri: correctedUri,
        type: 'image/jpeg',
        name: 'image.jpg',
      });

      // Ambil token dari Firebase Authentication
      const user = Firebase_Auth.currentUser;
      if (!user) {
        Alert.alert('User is not authenticated');
      }
      const token = await user.getIdToken(); // Ambil token dari Firebase Authentication

      const config = {
        method: 'post',
        url: 'https://garbify-api-989262154899.asia-southeast2.run.app/models/predict',
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`, // Tambahkan token ke header
        },
        data: formData,
      };

      const response = await axios.request(config);

      console.log('API result:', JSON.stringify(response.data));
      navigation.navigate('Predict', {
        result: response.data,
        imageUrl: image,
      });
    } catch (error) {
      console.error('Error analyzing image:', error);
      Alert.alert('Failed to analyze image', `Error: ${error.message}`);
    } finally {
      setLoading(false); // Menonaktifkan animasi loading
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {image ? (
          <Image source={{uri: image}} style={styles.imagePlaceholder} />
        ) : (
          <Icon name="image-outline" size={150} color="#A9A9A9" />
        )}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={openGallery}>
          <Text style={styles.buttonText}>GALLERY</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('TakeCamera')}>
          <Text style={styles.buttonText}>CAMERA</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.analyzeButton} onPress={analyzeImage}>
        <Text style={styles.analyzeButtonText}>ANALYZE</Text>
      </TouchableOpacity>

      {/* Include the custom loading spinner */}
      <LoadingSpinner visible={loading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D3EBCD',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholder: {
    width: 350,
    height: 350,
    resizeMode: 'contain',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  analyzeButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 60,
    borderRadius: 5,
    marginTop: 20,
  },
  analyzeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PraCamera;
