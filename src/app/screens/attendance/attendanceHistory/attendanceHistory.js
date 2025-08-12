import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Animated,
  Dimensions,
} from 'react-native';
import React, { useRef } from 'react';
import CalendarCard from '../../../../components/static/attendance/calendarCard/calendarCard';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../../../components/constants/colors';
import { wp } from '../../../../components/constants/responsiveSize';
import { FONT } from '../../../../components/constants/font';
import Header from '../../../../components/common/header/header';

const { height } = Dimensions.get('window');
const ITEM_HEIGHT = height * 0.2;

export default function AttendanceHistory({ navigation }) {
  const scrollY = useRef(new Animated.Value(0)).current;

  const renderItem = ({ item }) => {
    return (
      <View style={styles.attendanceList}>
        <View style={styles.dateCard}>
          <Text style={styles.dateText}>02</Text>
          <Text style={styles.dayText}>Wed</Text>
        </View>
        <View style={styles.columnView}>
          <View style={styles.rowItem}>
            <View style={styles.item}>
              <Text style={styles.timeText}>04:43</Text>
              <Text style={styles.labelText}>Check In</Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.timeText}>17:00</Text>
              <Text style={styles.labelText}>Check Out</Text>
            </View>
            <View style={[styles.item, { borderRightWidth: 0 }]}>
              <Text style={styles.timeText}>08:05</Text>
              <Text style={styles.labelText}>Total Hours</Text>
            </View>
          </View>

          <View style={styles.locationRow}>
            <Ionicons
              name="location-outline"
              size={14}
              color={COLORS.paraColor}
            />
            <Text style={styles.locationText}>Jakarta, Indonesia</Text>
          </View>
        </View>
      </View>
    );
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
      }}
    >
      <StatusBar
        translucent={true}
        animated
        backgroundColor={COLORS.black}
        barStyle={'light-content'}
        showHideTransition={'fade'}
      />
      <Header navigation={navigation} title="Attendance History" />
      <Animated.View
        style={[
          styles.backdrop,
          { position: 'absolute', height: animatedHeight },
        ]}
      />
      <View style={{ flex: 1 }}>
        <Animated.FlatList
          onScroll={Animated.event([
            { nativeEvent: { contentOffset: { y: scrollY } } },
          ])}
          data={[1, 2, 3, 4, 5]}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          ListHeaderComponent={<CalendarCard />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  attendanceList: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 12,
    marginVertical: 6,
    marginHorizontal: 14,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  dateCard: {
    backgroundColor: COLORS.btnColor,
    borderRadius: 12,
    width: 60,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  dateText: {
    fontSize: wp(6),
    color: '#fff',
    fontFamily: FONT.PoppinsMedium,
    marginBottom: -10,
  },
  dayText: {
    fontSize: wp(3),
    color: COLORS.white,
    fontFamily: FONT.PoppinsMedium,
  },
  columnView: {
    flex: 1,
  },
  rowItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: '#eee',
  },
  timeText: {
    fontSize: wp(4),
    color: COLORS.btnColor,
    fontFamily: FONT.PoppinsMedium,
    marginBottom: -4,
  },
  labelText: {
    fontSize: wp(3),
    color: COLORS.paraColor,
    fontFamily: FONT.PoppinsRegular,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopColor: '#eee',
    borderTopWidth: 1,
    paddingTop: 4,
  },
  locationText: {
    fontSize: wp(3),
    color: COLORS.darkCard,
    marginLeft: 4,
    fontFamily: FONT.PoppinsMedium,
    marginBottom: -4,
  },

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
