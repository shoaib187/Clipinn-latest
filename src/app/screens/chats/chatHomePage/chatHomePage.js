import React from 'react';
import ChatMainPage from '../chatMainPage/chatMainPage';
import {SafeAreaView} from 'react-native';

export default function ChatHomePage({navigation}) {
  return (
    <SafeAreaView style={{flex: 1}}>
      <ChatMainPage navigation={navigation} />
    </SafeAreaView>
  );
}
