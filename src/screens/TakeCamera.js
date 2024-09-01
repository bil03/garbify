import React, {useState, useEffect, useRef} from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import {
  Camera,
  useCameraDevices,
  useCameraFormat,
} from 'react-native-vision-camera';
import ButtonCapture from '../component/CaptureButton'; // Pastikan komponen ini ada
import {useNavigation} from '@react-navigation/native';
import ImageResizer from 'react-native-image-resizer'; // Import ImageResizer

const CameraPage = () => {
  const navigation = useNavigation();
  const cameraRef = useRef(null);
  const devices = useCameraDevices();
  const device = devices.back;
  const [hasPermission, setHasPermission] = useState(false);
  const [photoUri, setPhotoUri] = useState(null);

  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized');
    })();
  }, []);

  const format = useCameraFormat(device, [
    {photoResolution: {width: 500, height: 500}}, // Resolusi foto
  ]);

  const takePhoto = async () => {
    try {
      if (cameraRef.current) {
        const photo = await cameraRef.current.takePhoto({
          quality: 0.5, // Kualitas foto
        });

        const photoUri = photo.path;
        console.log('Original Photo URI:', photoUri);
        setPhotoUri(photoUri);

        // Kompresi gambar
        const resizedImage = await ImageResizer.createResizedImage(
          photoUri,
          800, // Width
          600, // Height
          'JPEG', // Format
          80, // Quality
          0, // Rotation
        );

        const resizedPhotoUri = resizedImage.uri;
        console.log('Resized Photo URI:', resizedPhotoUri);
        navigation.navigate('Camera', {photoUri: resizedPhotoUri});
      } else {
        console.error('Camera reference is not set.');
      }
    } catch (error) {
      console.error('Error taking photo:', error);
    }
  };

  if (device == null || !hasPermission) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera
        ref={cameraRef}
        style={styles.camera}
        device={device}
        isActive={true}
        photo={true}
        format={format}
      />
      <View style={styles.controls}>
        <ButtonCapture onCapture={takePhoto} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  camera: {
    flex: 1,
    alignSelf: 'center',
    width: '100%',
  },
  controls: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

export default CameraPage;
