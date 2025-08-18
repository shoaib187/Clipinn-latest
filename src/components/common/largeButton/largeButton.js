// LargeButton.js
import React from 'react';
import {Text, TouchableOpacity, StyleSheet, View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {FONT} from '../../constants/font';
import {COLORS} from '../../constants/colors';

const ICONS = {
  user: <Feather name="user" size={24} color={COLORS.black} />,
  info: <Feather name="info" size={24} color={COLORS.black} />,
  headphones: (
    <MaterialCommunityIcons name="headphones" size={24} color={COLORS.black} />
  ),
  shield: <Feather name="shield" size={24} color={COLORS.black} />,
  'log-out': <Feather name="log-out" size={24} color={COLORS.red} />,
};

export default function LargeButton({
  title,
  icon,
  onPress,
  style,
  textIconStyle,
}) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.btnStyle, style]}>
      <View style={styles.leftContent}>
        {ICONS[icon]}
        <Text style={[styles.title, textIconStyle]}>{title}</Text>
      </View>
      <Feather name="chevron-right" size={22} color={COLORS.grey} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btnStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 18,
    justifyContent: 'space-between',
    backgroundColor: COLORS.whiteColor,
    marginBottom: 2,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  title: {
    fontFamily: FONT.PoppinsMedium,
    fontSize: 15,
    color: COLORS.black,
  },
});
