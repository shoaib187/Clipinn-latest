import React, { useCallback, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Image,
  Animated,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { COLORS } from '../../../../components/constants/colors';
import { wp } from '../../../../components/constants/responsiveSize';
import { FONT } from '../../../../components/constants/font';
import CheckInButton from '../../../../components/common/checkInButton/checkInButton';
import SlideToCheckInOut from '../../../../components/common/sliderToCheckInOut/slideToCheckInOut';
import Button from '../../../../components/common/button/button';
const { height } = Dimensions.get('window');

import RBSheet from 'react-native-raw-bottom-sheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
const ITEM_HEIGHT = height * 0.2;

export default function AttendanceMainPage({ navigation }) {
  const bottomSheetRef = useRef(null);
  const scrollY = useRef(new Animated.Value(0)).current;
  const [sheetType, setSheetType] = useState(null); // 'checkIn' | 'checkOut'
  const [isCheckedIn, setIsCheckedIn] = useState(false);

  const animatedHeight = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [ITEM_HEIGHT, 69],
    extrapolate: 'clamp',
  });

  const handleCheckInComplete = async () => {
    bottomSheetRef.current.close();
    console.log('✅ Checked in successfully');
    // API call to mark check-in
  };

  const handleCheckOutComplete = async () => {
    bottomSheetRef.current.close();
    console.log('🚪 Checked out successfully');
    // API call to mark check-out
  };

  const openSheet = type => {
    setSheetType(type);
    bottomSheetRef.current.open();
  };

  const handleCheck = () => {
    if (isCheckedIn) {
      openSheet('checkOut');
    } else {
      openSheet('checkIn');
    }
  };

  // const onConfirmCheck = type => {
  //   if (type === 'checkIn') {
  //     setIsCheckedIn(true);
  //   } else if (type === 'checkOut') {
  //     setIsCheckedIn(false);
  //   }
  // };

  const onConfirmCheck = async type => {
    const today = new Date().toISOString().split('T')[0];
    const status = type === 'checkIn' ? 'checkedIn' : 'checkedOut';

    await AsyncStorage.setItem(
      'attendanceStatus',
      JSON.stringify({ date: today, status }),
    );

    if (type === 'checkIn') {
      setIsCheckedIn(true);
    } else if (type === 'checkOut') {
      setIsCheckedIn(false);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
        paddingTop: StatusBar.currentHeight,
      }}
    >
      <StatusBar
        translucent
        animated
        backgroundColor={COLORS.black}
        barStyle={'light-content'}
        showHideTransition={'fade'}
      />

      <Animated.View
        style={[
          styles.backdrop,
          { position: 'absolute', height: animatedHeight },
        ]}
      />

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.name}>Hey Shabiii,</Text>
            <Text style={styles.greeting}>
              Good Morning, Mark your Attendance!
            </Text>
          </View>
          <Image
            source={{
              uri: 'https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
            }}
            style={styles.profileImage}
          />
        </View>
        <View style={styles.timeAlign}>
          <Text style={styles.time}>09:00 AM</Text>
          <Text style={styles.date}>Oct 26, 2022 - Wednesday</Text>
          <TouchableOpacity
            style={styles.historyButton}
            onPress={() => navigation.navigate('AttendanceHistory')}
          >
            <Text style={styles.historyButtonText}>View history</Text>
          </TouchableOpacity>
          <CheckInButton onPress={handleCheck} />
        </View>

        {/* Check In / Check Out */}
        <View style={styles.checkRow}>
          <View style={styles.checkCard}>
            <Ionicons
              name="log-in-outline"
              size={38}
              color="#3AA272"
              style={styles.icon}
            />
            <Text style={styles.checkTime}>09:12</Text>
            <Text style={styles.checkLabel}>Check In</Text>
          </View>

          <View style={styles.checkCard}>
            <Ionicons
              name="log-out-outline"
              size={38}
              color="#E86A5D"
              style={styles.icon}
            />
            <Text style={styles.checkTime}>--:--</Text>
            <Text style={styles.checkLabel}>Check Out</Text>
          </View>

          <View style={styles.checkCard}>
            <Ionicons
              name="time-outline"
              size={38}
              color="#4D7EDC"
              style={styles.icon}
            />
            <Text style={styles.checkTime}>--:--</Text>
            <Text style={styles.checkLabel}>Total Hours</Text>
          </View>
        </View>
        <Button title={'View History'} style={{ marginTop: 42 }} />
        <RBSheet
          ref={bottomSheetRef}
          height={320}
          openDuration={500}
          closeOnPressBack={true}
          closeDuration={500}
          closeOnPressMask={true}
          dragOnContent={false}
          customAvoidingViewProps={{ removeClippedSubviews: false }}
          customStyles={{
            container: {
              padding: 18,
              borderRadius: 10,
              width: '96%',
              alignSelf: 'center',
              bottom: 10,
            },
          }}
        >
          <View
            onLayout={e => console.log(e.nativeEvent.layout.height)}
            style={styles.bottomSheetView}
          >
            {/* Close Button */}
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={async () => {
                bottomSheetRef.current.close();
                await AsyncStorage.removeItem('attendanceStatus');
              }}
            >
              <Ionicons name="close" size={26} color="#444" />
            </TouchableOpacity>

            {/* Dynamic Title */}
            <Text style={styles.sheetTitle}>
              {sheetType === 'checkIn'
                ? 'Ready to Check In?'
                : 'Ready to Check Out?'}
            </Text>

            {/* Dynamic Message */}
            <Text style={styles.sheetSubtitle}>
              {sheetType === 'checkIn'
                ? 'You’re about to mark your attendance for today.'
                : 'You’re about to end your workday.'}
            </Text>

            <Text style={styles.sheetInfo}>
              {sheetType === 'checkIn' ? (
                <>
                  Once confirmed, your work hours will start counting from{' '}
                  <Text
                    style={{ fontFamily: FONT.PoppinsMedium, color: '#27ae60' }}
                  >
                    09:00 AM
                  </Text>
                  .
                </>
              ) : (
                <>Once confirmed, your total worked hours will be calculated.</>
              )}
            </Text>

            {/* Policy Note */}
            <View style={styles.policyBox}>
              <Ionicons name="information-circle" size={18} color="#2980b9" />
              <Text style={styles.policyText}>
                {sheetType === 'checkIn'
                  ? 'Make sure you’re at the workplace location before checking in.'
                  : 'Ensure all your tasks are completed before checking out.'}
              </Text>
            </View>

            {/* Slider with dynamic onComplete */}
            <SlideToCheckInOut
              type={sheetType}
              onConfirmCheck={onConfirmCheck}
              onComplete={
                sheetType === 'checkIn'
                  ? handleCheckInComplete
                  : handleCheckOutComplete
              }
            />
          </View>
        </RBSheet>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 14,
  },
  greeting: {
    fontSize: wp(4),
    color: '#777',
  },
  name: {
    fontSize: wp(6),
    marginBottom: -4,
    fontFamily: FONT.PoppinsSemiBold,
    color: '#fff',
  },
  profileImage: {
    width: wp(12),
    height: wp(12),
    borderRadius: wp(20),
    borderWidth: 2,
    borderColor: COLORS.slateColor,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 24,
  },
  timeAlign: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 30,
    backgroundColor: '#fff',
    borderRadius: 8,
    position: 'relative',
    // marginTop: 12,
  },
  time: {
    fontFamily: FONT.PoppinsSemiBold,
    fontSize: wp(10),
    marginBottom: -10,
  },
  date: {
    fontFamily: FONT.PoppinsRegular,
    fontSize: wp(4),
    color: COLORS.paraColor,
    marginBottom: wp(14),
  },
  checkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  checkCard: {
    flex: 0.3,
    // backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  checkTime: {
    fontFamily: FONT.PoppinsMedium,
    marginVertical: 6,
  },
  checkLabel: {
    fontFamily: FONT.PoppinsRegular,
  },
  backdrop: {
    position: 'absolute',
    top: StatusBar.currentHeight || 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.black,
    // zIndex: 1,
    // justifyContent: 'center',
    paddingHorizontal: 14,
  },
  historyButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  historyButtonText: {
    fontFamily: FONT.PoppinsMedium,
    color: COLORS.btnColor,
  },
  bottomSheetView: {
    position: 'relative',
  },
  closeBtn: {
    width: wp(10),
    height: wp(10),
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: -10,
    right: -10,
    zIndex: 111,
  },

  // sheet styles
  sheetTitle: {
    fontSize: wp(5),
    marginBottom: 12,
    textAlign: 'center',
    fontFamily: FONT.PoppinsMedium,
  },
  sheetSubtitle: {
    fontSize: wp(4),
    color: COLORS.btnColor,
    textAlign: 'center',
    marginBottom: 4,
    fontFamily: FONT.PoppinsRegular,
  },
  sheetInfo: {
    fontSize: wp(4),
    color: COLORS.paraColor,
    textAlign: 'center',
    marginBottom: 14,
  },
  policyBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ecf6fc',
    padding: 8,
    borderRadius: 6,
    marginBottom: 16,
  },
  policyText: {
    flex: 1,
    fontSize: wp(3.5),
    color: '#2980b9',
    marginLeft: 6,
    fontFamily: FONT.PoppinsRegular,
    lineHeight: 18,
  },
});
