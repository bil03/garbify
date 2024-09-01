import {View, ScrollView} from 'react-native';
import React from 'react';

import HeadHome from '../component/HeadHome';
import CardBox from '../component/CardBox';
import BoxTipe from '../component/BoxTipe';
import MapCard from '../component/MapCard';

const Dashboard = () => {
  return (
    <View>
      <ScrollView>
        <HeadHome />
        <CardBox />
        <BoxTipe />
        <MapCard />
      </ScrollView>
    </View>
  );
};

export default Dashboard;
