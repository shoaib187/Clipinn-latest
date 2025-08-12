import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { wp } from '../../constants/responsiveSize';
import { FONT } from '../../constants/font';
import { COLORS } from '../../constants/colors';

export default function TabHeader({
  navigation,
  style,
  textStyle,
  setFinalHeight,
}) {
  return (
    <View
      onLayout={e => setFinalHeight(e.nativeEvent.layout.height)}
      style={[styles.headerContainer, style]}
    >
      <View style={styles.header}>
        <View>
          <Text style={styles.name}>Hey Shabiii,</Text>
          <Text style={styles.greeting}>
            Good Morning, Mark your Attendance!
          </Text>
        </View>
      </View>

      <TouchableOpacity style={styles.bellIcon}>
        <Ionicons name="notifications-outline" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingVertical: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 9999,
    paddingHorizontal: 14,
  },

  bellIcon: {
    width: wp(12),
    height: wp(12),
    alignItems: 'center',
    justifyContent: 'center',
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
  },
});
