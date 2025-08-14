import React from 'react';
import {View, Text, StatusBar, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {COLORS} from '../../constants/colors';
import {wp} from '../../constants/responsiveSize';
import {FONT} from '../../constants/font';

export default function RecentAttendanceCard({item}) {
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
          <View style={[styles.item, {borderRightWidth: 0}]}>
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
    shadowOffset: {width: 0, height: 2},
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
