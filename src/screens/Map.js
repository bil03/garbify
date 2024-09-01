import {View, Text, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {PermissionsAndroid} from 'react-native';
import BankSampah from '../utils/marker.json';

const Map = () => {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  const getCurrentPosition = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setLocation({
          latitude,
          longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
        setLoading(false); // Selesai loading ketika lokasi didapatkan
      },
      error => {
        console.log(error);
        setLoading(false); // Selesai loading meskipun ada error
      },
      {enableHighAccuracy: false, timeout: 10000, maximumAge: 1000},
    );
  };

  const requestPermission = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      getCurrentPosition();
    } else {
      setLoading(false); // Selesai loading jika izin tidak diberikan
    }
  };

  useEffect(() => {
    requestPermission();
  }, []);

  return (
    <View style={{flex: 1, marginBottom: 60}}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : location ? (
        <MapView
          style={{flex: 1}}
          zoomControlEnabled={true}
          region={location}
          showsUserLocation={true}
          showsMyLocationButton={true}>
          {BankSampah.map((marker, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
              }}
              title={marker.title}
            />
          ))}
        </MapView>
      ) : (
        <Text>Lokasi tidak dapat ditemukan</Text> // Pesan jika lokasi tidak ditemukan
      )}
    </View>
  );
};

export default Map;
