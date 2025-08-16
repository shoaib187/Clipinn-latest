import {View, Text, SafeAreaView} from 'react-native';
import React from 'react';
import ProfileMainPage from '../profileMainPage/profileMainPage';

export default function ProfileHomePage({navigation}) {
  return (
    <SafeAreaView style={{flex: 1}}>
      <ProfileMainPage navigation={navigation} />
    </SafeAreaView>
  );
}
