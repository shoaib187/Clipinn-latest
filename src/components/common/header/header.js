import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import BackButton from '../button/backButton';
import { COLORS } from '../../constants/colors';

export default function Header({
  title,
  onPress,
  navigation,
  showIcon = false,
  showClearAll = false,
}) {
  const handleClearAll = () => {
    navigation.navigate('Notifications');
  };

  return (
    <View style={styles.header}>
      {/* Left: Back Button */}
      <View style={styles.sideContainer}>
        <BackButton
          navigation={navigation}
          onPress={onPress}
          iconColor={'#fff'}
        />
      </View>

      {/* Center: Title */}
      <Text style={styles.headerTitle} numberOfLines={1}>
        {title}
      </Text>

      {/* Right: Clear All or Icon */}
      <TouchableOpacity style={styles.sideContainer} onPress={handleClearAll}>
        {showClearAll && (
          <Text style={styles.clearAllText}>Mark all as read</Text>
        )}
        {showIcon && <View />}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: hp('7%'),
    paddingHorizontal: wp('4%'),
    position: 'relative',
    backgroundColor: COLORS.black,
    zIndex: 1,
  },
  sideContainer: {
    width: wp('20%'), // reserve equal width for both sides
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  centerContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: -1,
  },
  headerTitle: {
    fontSize: wp('5%'),
    fontWeight: 'bold',
    color: COLORS.bgColor,
  },
  clearAllText: {
    fontSize: wp('4%'),
    color: '#007bff',
  },
});
