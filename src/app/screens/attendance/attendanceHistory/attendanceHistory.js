import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Animated,
  Dimensions,
} from 'react-native';
import React, {useRef} from 'react';
import CalendarCard from '../../../../components/static/attendance/calendarCard/calendarCard';
import {COLORS} from '../../../../components/constants/colors';
import Header from '../../../../components/common/header/header';
import RecentAttendanceCard from '../../../../components/common/recentAttendanceCard/recentAttendanceCard';

const {height} = Dimensions.get('window');
const ITEM_HEIGHT = height * 0.2;

export default function AttendanceHistory({navigation}) {
  const scrollY = useRef(new Animated.Value(0)).current;

  const renderItem = ({item}) => {
    return <RecentAttendanceCard item={item} />;
  };

  const animatedHeight = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [ITEM_HEIGHT, 40],
    extrapolate: 'clamp',
  });

  return (
    <SafeAreaView
      style={{
        backgroundColor: '#f6f6f6',
        paddingTop: StatusBar.currentHeight,
        flex: 1,
      }}>
      <StatusBar
        backgroundColor={COLORS.black}
        barStyle="light-content"
        animated
      />
      <Header navigation={navigation} title="Attendance History" />
      <Animated.View
        style={[
          styles.backdrop,
          {position: 'absolute', height: animatedHeight},
        ]}
      />
      <View style={{flex: 1}}>
        <Animated.FlatList
          onScroll={Animated.event([
            {nativeEvent: {contentOffset: {y: scrollY}}},
          ])}
          data={[1, 2, 3, 4, 5]}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          ListHeaderComponent={<CalendarCard />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 20}}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // backdrop
  backdrop: {
    position: 'absolute',
    top: StatusBar.currentHeight || 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.black,
    paddingHorizontal: 14,
  },
});
