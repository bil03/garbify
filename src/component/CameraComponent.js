import React, {useState, useEffect, useRef} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import ButtonCapture from './CaptureButton';
import {useNavigation} from '@react-navigation/native';

const CameraPage = () => {
  const navigation = useNavigation();
  const camera = useRef(null);
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

  const takePhoto = async () => {
    if (camera.current) {
      const photo = await camera.current.takePhoto({
        qualityPrioritization: 'balanced',
      });
      setPhotoUri(photo.uri);
      navigation.navigate('Pracamera', {photoUri: photo.uri}); // Navigate to PraCamera and pass the photoUri
    }
  };

  if (device == null || !hasPermission) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera
        ref={camera}
        style={styles.camera}
        device={device}
        isActive={true}
        photo={true}
      />
      <View style={styles.controls}>
        <ButtonCapture onCapture={takePhoto} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: 'black',
  },
  camera: {
    alignItems: 'center',
    alignSelf: 'center',
    width: '80%',
    height: 380,
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
