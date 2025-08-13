import {View, Text, SafeAreaView, StatusBar} from 'react-native';
import React from 'react';
import WeeklyCalendar from '../../../../components/common/weeklyCalendar/weeklyCalendar';
import TaskManagementScreen from '../taskManagement/taskManagement';

export default function TaskMainPage() {
  return (
    <TaskManagementScreen />
    // <SafeAreaView style={{flex: 1, paddingTop: StatusBar.currentHeight}}>
    // {/* <WeeklyCalendar /> */}
    // </SafeAreaView>
  );
}
