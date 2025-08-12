import React from 'react';
import AttendanceMainPage from '../attendanceMainPage/attendanceMainPage';
import { SafeAreaView } from 'react-native';

export default function AttendanceHomePage({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <AttendanceMainPage navigation={navigation} />
    </SafeAreaView>
  );
}
