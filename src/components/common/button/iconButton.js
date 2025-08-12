import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { COLORS } from '../../constants/colors';
import { wp } from '../../constants/responsiveSize';

export default function IconButton({ name, color = '#000', size = 24, onPress, style }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[styles.iconButton, style]}
    >
      <Icon name={name} size={size} color={color} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  iconButton: {
    width:wp(14),
    height:wp(14),
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth:1,
    borderColor:COLORS.slateColor
  },
});
