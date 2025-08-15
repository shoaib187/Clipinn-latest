import React from 'react';
import {SafeAreaView} from 'react-native';
import ProjectMainPage from '../projectMainPage/projectMainPage';

export default function ProjectHomePage({navigation}) {
  return (
    <SafeAreaView style={{flex: 1}}>
      <ProjectMainPage navigation={navigation} />
    </SafeAreaView>
  );
}
