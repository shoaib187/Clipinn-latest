import React from 'react';
import TaskMainPage from '../taskMainPage/taskMainPage';
import {SafeAreaView} from 'react-native';

export default function TaskHomePage({navigation}) {
  return (
    <SafeAreaView style={{flex: 1}}>
      <TaskMainPage navigation={navigation} />
    </SafeAreaView>
  );
}
