import { TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { StyleSheet } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
export default function BackButton({ navigation, iconColor, onPress }) {
  return (
    <TouchableOpacity
      style={styles.backButton}
      onPress={() => navigation.goBack()}
    >
      <AntDesign name="arrowleft" size={24} color={iconColor} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  backButton: {
    // backgroundColor: '#F3F4F6',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    width: 48,
    height: 48,
  },
});
