import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {AuthProvider, useAuth} from './src/Hooks/auth';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Homepage from './src/screens/Dashboard';
import PraCamerapage from './src/screens/PraCamera';
import Mappage from './src/screens/Map';
import DetailPage from './src/screens/Detail';
import LoginPage from './src/screens/Login';
import RegisterPage from './src/screens/Register';
import SplashPage from './src/screens/Splash';
import Camerapage from './src/screens/TakeCamera';
import PredictPage from './src/screens/Predict';
import Profilpage from './src/screens/Profil';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const RootHome = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: '#038E4C',
        tabBarInactiveTintColor: '#53E88B',
        tabBarShowLabel: true,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderRadius: 10,
          position: 'absolute',
          width: '100%',
          height: 65,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Homepage}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Camera"
        component={PraCamerapage}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="camera" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Map"
        component={Mappage}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="map-marker" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  const {user, loading} = useAuth();

  if (loading) {
    return <SplashPage />;
  }

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {!user ? (
        <>
          <Stack.Screen name="LoginPage" component={LoginPage} />
          <Stack.Screen name="RegisterPage" component={RegisterPage} />
        </>
      ) : (
        <>
          <Stack.Screen name="HomePage" component={RootHome} />
          <Stack.Screen name="Detail" component={DetailPage} />
          <Stack.Screen name="TakeCamera" component={Camerapage} />
          <Stack.Screen name="Predict" component={PredictPage} />
          <Stack.Screen name="Profil" component={Profilpage} />
        </>
      )}
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
