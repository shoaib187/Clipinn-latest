import React, {useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Animated,
  Dimensions,
} from 'react-native';
import {COLORS} from '../../../../components/constants/colors';
import TabHeader from '../../../../components/common/tabHeader/tabHeader';
import StatsCards from '../../../../components/static/home/statsCards/statsCards';
import Categories from '../../../../components/categories/categories';
import QuickActions from '../../../../components/static/home/quickActions/quickActions';
import RecentActivities from '../../../../components/static/home/recentActivities/recentActivities';
import UpcomingEvents from '../../../../components/static/home/upcomingEvents/upcomingEvents';
const {height} = Dimensions.get('window');
const ITEM_HEIGHT = height * 0.2;

const HomeMainPage = ({navigation}) => {
  const scrollY = useRef(new Animated.Value(0)).current;

  const categories = [
    {
      id: 'dashboard',
      name: 'Dashboard',
      icon: 'dashboard',
      bgColor: 'rgba(63, 81, 181, 0.08)', // Light indigo
      activeBgColor: '#3F51B5', // Active state color
    },
    {
      id: 'attendance',
      name: 'Attendance',
      icon: 'fingerprint',
      bgColor: 'rgba(76, 175, 80, 0.08)', // Light green
      activeBgColor: '#4CAF50',
    },
    {
      id: 'leave',
      name: 'Leave',
      icon: 'beach-access',
      bgColor: 'rgba(33, 150, 243, 0.08)', // Light blue
      activeBgColor: '#2196F3',
    },
    {
      id: 'payroll',
      name: 'Payroll',
      icon: 'attach-money',
      bgColor: 'rgba(255, 193, 7, 0.08)', // Light amber
      activeBgColor: '#FFC107',
    },
    {
      id: 'projects',
      name: 'Projects',
      icon: 'work',
      bgColor: 'rgba(233, 30, 99, 0.08)', // Light pink
      activeBgColor: '#E91E63',
    },
    {
      id: 'performance',
      name: 'Performance',
      icon: 'star-rate',
      bgColor: 'rgba(255, 152, 0, 0.08)', // Light orange
      activeBgColor: '#FF9800',
    },
    {
      id: 'meetings',
      name: 'Meetings',
      icon: 'meeting-room',
      bgColor: 'rgba(156, 39, 176, 0.08)', // Light purple
      activeBgColor: '#9C27B0',
    },
    {
      id: 'expenses',
      name: 'Expenses',
      icon: 'receipt',
      bgColor: 'rgba(0, 150, 136, 0.08)', // Light teal
      activeBgColor: '#009688',
    },
  ];
  const quickActions = [
    {
      id: 'punch',
      title: 'Punch In/Out',
      icon: 'touch-app',
      color: '#4CAF50',
      bgColor: 'rgba(76, 175, 80, 0.04)', // Very light green
    },
    {
      id: 'ApplyForLeave',
      title: 'Apply Leave',
      icon: 'flight-takeoff',
      color: '#FF9800',
      bgColor: 'rgba(255, 152, 0, 0.08)', // Very light orange
    },
    {
      id: 'expense',
      title: 'Add Expense',
      icon: 'receipt',
      color: '#9C27B0',
      bgColor: 'rgba(156, 39, 176, 0.08)', // Very light purple
    },
    {
      id: 'ticket',
      title: 'Raise Ticket',
      icon: 'help-outline',
      color: '#F44336',
      bgColor: 'rgba(244, 67, 54, 0.08)', // Very light red
    },
  ];
  const recentActivities = [
    {
      id: 1,
      type: 'leave',
      title: 'Leave Approved',
      description: 'Your annual leave request has been approved',
      time: '2 hours ago',
      icon: 'check-circle',
      color: '#4CAF50',
    },
    {
      id: 2,
      type: 'payroll',
      title: 'Salary Credited',
      description: 'Salary for June has been credited to your account',
      time: '1 day ago',
      icon: 'account-balance-wallet',
      color: '#2196F3',
    },
    {
      id: 3,
      type: 'meeting',
      title: 'Team Meeting',
      description: 'Scheduled for tomorrow at 11:00 AM',
      time: '3 days ago',
      icon: 'event',
      color: '#FF9800',
    },
  ];

  const [finalHeight, setFinalHeight] = useState(null);
  // Animate from 60 → 0 height on scroll
  const animatedHeight = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [ITEM_HEIGHT, finalHeight],
    extrapolate: 'clamp',
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        backgroundColor={COLORS.black}
        barStyle="light-content"
        animated
      />

      {/* animated, fixed header */}
      <Animated.View
        style={[styles.header, {position: 'absolute', height: animatedHeight}]}
      />
      <TabHeader navigation={navigation} setFinalHeight={setFinalHeight} />

      {/* Scrollable content */}
      <Animated.ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: false},
        )}>
        <View style={{paddingHorizontal: 14}}>
          <StatsCards />
        </View>
        <Categories categories={categories} />
        <QuickActions navigation={navigation} quickActions={quickActions} />
        <RecentActivities recentActivities={recentActivities} />
        <UpcomingEvents recentActivities={recentActivities} />
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    position: 'absolute',
    // top: StatusBar.currentHeight || 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.black,
  },
  scrollContainer: {
    // marginTop: 14,
    // paddingHorizontal: 14,
    backgroundColor: COLORS.white,
    paddingBottom: 20,
    marginHorizontal: 14,
    paddingTop: 14,
    borderRadius: 8,
  },
});

export default HomeMainPage;
