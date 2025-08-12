import {View, Text, SafeAreaView, StatusBar} from 'react-native';
import React from 'react';
import WeeklyCalendar from '../../../../components/common/weeklyCalendar/weeklyCalendar';

export default function TaskMainPage() {
  return (
    <SafeAreaView style={{flex: 1, paddingTop: StatusBar.currentHeight}}>
      <WeeklyCalendar />
    </SafeAreaView>
  );
}
