import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Animated,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { wp } from '../../constants/responsiveSize';
import { COLORS } from '../../constants/colors';
import { FONT } from '../../constants/font';

export default function CheckInButton({ onPress }) {
  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress}>
      <View style={styles.buttonOuterCircle}>
        <View style={styles.buttonOuter}>
          <LinearGradient
            colors={['#eee', '#fff']}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={styles.buttonInner}
          >
            <MaterialCommunityIcons
              name="fingerprint"
              size={wp(10)}
              color="#2E7D32"
            />
            <Text style={styles.text}>Check In</Text>
          </LinearGradient>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonOuterCircle: {
    width: wp(43),
    height: wp(43),
    borderRadius: wp(50),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.bgColor,
  },
  buttonOuter: {
    width: wp(36),
    height: wp(36),
    borderRadius: wp(50),
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  buttonInner: {
    width: wp(30),
    height: wp(30),
    borderRadius: wp(40),
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: wp(3.8),
    color: '#2E7D32',
    marginTop: 4,
    fontFamily: FONT.PoppinsMedium,
  },
});
