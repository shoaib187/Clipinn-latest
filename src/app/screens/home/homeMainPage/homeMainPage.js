import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { COLORS } from '../../../../components/constants/colors';
import { wp } from '../../../../components/constants/responsiveSize';
import { FONT } from '../../../../components/constants/font';
import Button from '../../../../components/common/button/button';
import Donut from '../../../../components/common/donut/donut';
// import CheckInOutSheet from '../../../../components/common/bottomsheet/bottomSheet';

export default function HomeMainPage() {
  const [isCheckIn, setIsCheckIn] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        animated
        translucent
        backgroundColor={COLORS.btnColor}
        barStyle={'light-content'}
      />
      <View
        onLayout={e => console.log(e.nativeEvent.layout.height)}
        style={styles.animatedWrapper}
      >
        <View style={styles.headerWrapper}>
          <View style={styles.left}>
            <Image
              source={{
                uri: 'https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?cs=srgb&dl=pexels-souvenirpixels-414612.jpg&fm=jpg',
              }}
              style={styles.profileImage}
            />
            <View style={styles.details}>
              <Text style={styles.name}>Muhammad Shoaib</Text>
              <Text style={styles.role}>Front End Developer</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.icon}>
            <Icon name="notifications-outline" size={22} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.attendaceCard}>
        <Text style={styles.day}>Monday 18, Nov 2024</Text>
        <Text style={styles.timeSpent}>Your last checkin was 2 hours ago</Text>
        <View style={styles.barWrapper}>
          {[0, 1, 2, 3, 4, 5, 6].map((item, index, array) => {
            const today = new Date().getDay();
            const isTodayOrBefore = item <= today;

            return (
              <View
                key={index}
                style={[
                  styles.bar,
                  index !== array.length - 1 && { marginRight: 4 },
                  {
                    backgroundColor: isTodayOrBefore ? COLORS.btnColor : '#eee',
                  },
                ]}
              />
            );
          })}
        </View>
        <View style={styles.shiftTime}>
          <Text style={styles.timeIn}>09:00 AM</Text>
          <Text style={styles.timeIn}>06:00 PM</Text>
        </View>
        {/* <View style={styles.attendaceDonutWrapper}>
          <View>
            <Text style={styles.attendance}>Attendance Overview</Text>
            <Text style={styles.month}>Monhtly</Text>
          </View>
          <Donut max={100} percentage={60} color={COLORS.btnColor} />
        </View> */}
        {isCheckIn ? (
          <View style={styles.btnWrapper}>
            <TouchableOpacity style={styles.checkInButton}>
              <Fontisto
                name="coffeescript"
                size={16}
                color="#111"
                style={styles.icon}
              />
              <Text style={styles.btnText}>Break Time</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setIsCheckIn(false)}
              style={[styles.checkInButton, styles.checkOutButton]}
            >
              <Octicons
                name="sign-out"
                size={18}
                color="#fff"
                style={styles.icon}
              />
              <Text style={[styles.btnText, { color: COLORS.white }]}>
                Check Out
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <Button
            textStyle={{ top: 0, fontSize: wp(4) }}
            onPress={() => setIsCheckIn(true)}
            title="Check In"
            style={{ borderRadius: 6, height: 44, marginTop: 12 }}
            iconName="log-in-outline"
          />
        )}

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
            marginTop: 16,
          }}
        >
          <View style={styles.card}>
            <View
              style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}
            >
              <Fontisto name="clock" size={20} />
              <Text
                style={{
                  fontFamily: FONT.PoppinsRegular,
                  top: 3,
                  fontSize: wp(3.6),
                }}
              >
                Working hours
              </Text>
            </View>
            <Text
              style={{
                fontFamily: FONT.PoppinsSemiBold,
                top: 3,
                fontSize: wp(4.6),
              }}
            >
              01:00 Hrs
            </Text>
          </View>
          <View style={styles.card}>
            <View
              style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}
            >
              <Fontisto name="clock" size={20} />
              <Text
                style={{
                  fontFamily: FONT.PoppinsRegular,
                  top: 3,
                  fontSize: wp(3.6),
                }}
              >
                Working hours
              </Text>
            </View>
            <Text
              style={{
                fontFamily: FONT.PoppinsSemiBold,
                top: 3,
                fontSize: wp(4.6),
              }}
            >
              01:00 Hrs
            </Text>
          </View>
        </View>
        <View style={styles.timing}>
          <Text style={styles.checkIn}>Check In</Text>
          <Text style={styles.timeIn}>06:00 PM</Text>
        </View>
        <View style={styles.timing}>
          <Text style={styles.checkIn}>Break</Text>
          <Text style={styles.timeIn}>12:00 PM</Text>
        </View>
        <View style={styles.timing}>
          <Text style={styles.checkIn}>Check Out</Text>
          <Text style={styles.timeIn}>06:00 PM</Text>
        </View>
      </View>
      {/* <CheckInOutSheet /> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  animatedWrapper: {
    backgroundColor: COLORS.btnColor,
    paddingHorizontal: 14,
    paddingVertical: 20,
    height: 200,
  },
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  profileImage: {
    width: wp(12),
    height: wp(12),
    borderRadius: wp(10),
  },
  name: {
    fontFamily: FONT.PoppinsMedium,
    color: COLORS.white,
    fontSize: wp(4),
  },
  role: {
    fontFamily: FONT.PoppinsLight,
    fontSize: 14,
    color: COLORS.whiteColor,
  },
  attendaceCard: {
    position: 'absolute',
    zIndex: 10,
    top: 130,
    backgroundColor: COLORS.white,
    borderRadius: 8,
    width: wp(92),
    alignSelf: 'center',
    padding: 16,
  },
  barWrapper: {
    flexDirection: 'row',
    marginVertical: 12,
  },
  bar: {
    flex: 1,
    height: 5,
    backgroundColor: '#4f46e5',
    borderRadius: 4,
  },
  shiftTime: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btnWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
    gap: 14,
  },
  checkInButton: {
    // width:wp(40),
    flex: 1,
    height: 44,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.slateColor,
    flexDirection: 'row',
    gap: 6,
  },
  checkOutButton: {
    backgroundColor: 'chocolate',
    borderWidth: 0,
  },
  timeIn: {
    fontFamily: FONT.PoppinsSemiBold,
    fontSize: wp(3.5),
  },
  btnText: {
    fontFamily: FONT.PoppinsRegular,
    top: 2,
  },
  day: {
    fontFamily: FONT.PoppinsMedium,
    // marginBottom: 2,
  },
  timeSpent: {
    fontFamily: FONT.PoppinsRegular,
    color: COLORS.paraColor,
  },
  card: {
    borderRadius: 12,
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderWidth: 1.5,
    borderColor: COLORS.bgColor,
  },
  timing: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 8,
    paddingHorizontal: 4,
  },
  checkIn: {
    fontFamily: FONT.PoppinsMedium,
    color: COLORS.paraColor,
  },
  attendaceDonutWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 8,
    borderRadius: 8,
    paddingVertical: 6,
    marginVertical: 6,
  },
  attendance: {
    fontFamily: FONT.PoppinsMedium,
  },
  month: {
    fontFamily: FONT.PoppinsRegular,
    color: COLORS.paraColor,
  },
});
