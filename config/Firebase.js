// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {initializeAuth, getReactNativePersistence} from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBkIUVxvqZ-QXjx2hEmgQEvqjq4Tzum67M',
  authDomain: 'garbify-431205.firebaseapp.com',
  projectId: 'garbify-431205',
  storageBucket: 'garbify-431205.appspot.com',
  messagingSenderId: '989262154899',
  appId: '1:989262154899:web:2e47407abbcc8c41641166',
  measurementId: 'G-ECPRV4PMQB',
};

// Initialize Firebase
const Firebaseapp = initializeApp(firebaseConfig);
const Firebase_Auth = initializeAuth(Firebaseapp, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
const Firestore_DB = getFirestore(Firebaseapp);

export {Firebaseapp, Firebase_Auth, Firestore_DB};
