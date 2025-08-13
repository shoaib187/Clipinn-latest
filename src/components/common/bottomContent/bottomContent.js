import React, {useRef, useState} from 'react';
import {View, Text, Platform, StyleSheet, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {wp} from '../../constants/responsiveSize';
import {FONT} from '../../constants/font';
import Animated, {FadeIn} from 'react-native-reanimated';
import {COLORS} from '../../constants/colors';

const backgroundColors = {
  status: '#E6F4EA', // light green for status
  instruction: '#FFF8E1', // light yellow for instructions
  info: '#E3F2FD', // light blue for info
};

const {height} = Dimensions.get('window');
const ITEM_HEIGHT = height * 0.2;

export default function BottomContent({
  currentLocation,
  accuracy,
  distance,
  OFFICE_LOCATION,
  lastStatus,
}) {
  return (
    <View style={styles.bottomSheetContent}>
      <Text style={styles.sheetTitle}>Mark Your Attendance</Text>
      {currentLocation && (
        <View style={styles.locationInfoContainer}>
          {/* Location Accuracy Card */}
          <View style={styles.infoCard}>
            <View style={styles.infoCardHeader}>
              <Icon name="my-location" size={20} color="#4b6cb7" />
              <Text style={styles.infoCardTitle}>Your Location</Text>
            </View>
            <View style={styles.infoCardBody}>
              <Text style={styles.infoCardText}>
                Accuracy:{' '}
                <Text style={styles.infoCardValue}>
                  {Math.round(accuracy)} meters
                </Text>
              </Text>
            </View>
          </View>

          {/* Distance Card */}
          <View
            style={[
              styles.infoCard,
              distance <= OFFICE_LOCATION
                ? styles.inRangeCard
                : styles.outOfRangeCard,
              ,
            ]}>
            <View style={styles.infoCardHeader}>
              <Icon
                name="location-on"
                size={20}
                color={distance <= OFFICE_LOCATION ? '#4CAF50' : '#F44336'}
              />
              <Text style={styles.infoCardTitle}>Office Distance</Text>
            </View>
            <View style={styles.infoCardBody}>
              <Text style={styles.infoCardText}>
                {distance >= 1000
                  ? `${(distance / 1000).toFixed(1)} km`
                  : `${Math.round(distance)} meters`}
                <Text style={styles.rangeStatus}>
                  {distance <= OFFICE_LOCATION
                    ? ' (In Range)'
                    : ' (Out of Range)'}
                </Text>
              </Text>
            </View>
          </View>
        </View>
      )}

      {lastStatus ? (
        <Animated.View
          style={[
            styles.statusCard,
            {
              backgroundColor: lastStatus.ok ? '#E8F5E9' : '#FFEBEE',
              borderLeftWidth: 5,
              borderLeftColor: lastStatus.ok ? '#2E7D32' : '#C62828',
            },
          ]}
          entering={FadeIn.duration(500)}>
          <View style={styles.statusContent}>
            <Icon
              name={lastStatus.ok ? 'check-circle' : 'error'}
              size={28}
              color={lastStatus.ok ? '#2E7D32' : '#C62828'}
            />
            <View style={styles.statusTextContainer}>
              <Text
                style={[
                  styles.statusText,
                  {color: lastStatus.ok ? '#2E7D32' : '#C62828'},
                ]}>
                {lastStatus.msg}
              </Text>
              {lastStatus.dist !== undefined && (
                <Text style={styles.distanceText}>
                  Distance:{' '}
                  {lastStatus.dist >= 1000
                    ? `${(lastStatus.dist / 1000).toFixed(1)} km`
                    : `${Math.round(lastStatus.dist)} meters`}
                </Text>
              )}
            </View>
          </View>
        </Animated.View>
      ) : (
        <View style={styles.instructionCard}>
          <Icon name="info" size={24} color="#2196F3" />
          <Text style={styles.instructionText}>
            You must be within 2m of the office to mark attendance
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  bottomSheetContent: {
    flex: 1,
  },
  sheetTitle: {
    fontSize: wp(5),
    marginBottom: 15,
    textAlign: 'center',
    color: COLORS.btnColor,
    fontFamily: FONT.PoppinsSemiBold,
  },
  locationInfoContainer: {
    flexDirection: Platform.OS === 'web' ? 'row' : 'column',
    justifyContent: 'space-between',
  },
  infoCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    width: Platform.OS === 'web' ? '48%' : '100%',
    backgroundColor: '#fff',
    elevation: 4,
    shadowColor: '#999999',
  },
  inRangeCard: {
    borderLeftWidth: 5,
    borderLeftColor: '#4CAF50',
  },
  outOfRangeCard: {
    borderLeftWidth: 5,
    borderLeftColor: '#F44336',
  },
  infoCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoCardTitle: {
    fontSize: wp(4),
    color: COLORS.btnColor,
    marginLeft: 8,
    fontFamily: FONT.PoppinsMedium,
  },
  infoCardBody: {
    paddingLeft: 28,
  },
  infoCardText: {
    fontSize: wp(3.6),
    color: COLORS.paraColor,
    fontFamily: FONT.PoppinsRegular,
  },
  infoCardValue: {
    fontWeight: 'bold',
    color: '#222',
  },
  rangeStatus: {
    fontWeight: 'bold',
  },
  statusCard: {
    borderRadius: 8,
    padding: 16,
  },
  statusContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusTextContainer: {
    flex: 1,
    marginLeft: 12,
  },
  statusText: {
    fontSize: wp(4),
    marginBottom: -4,
    fontFamily: FONT.PoppinsMedium,
  },
  distanceText: {
    fontSize: wp(4),
    color: '#424242',
    fontFamily: FONT.PoppinsRegular,
    marginBottom: -4,
  },
  instructionCard: {
    backgroundColor: '#E3F2FD',
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  instructionText: {
    fontSize: wp(3.5),
    color: '#0D47A1',
    marginLeft: 12,
    flex: 1,
    fontFamily: FONT.PoppinsRegular,
    marginBottom: -4,
  },
});
