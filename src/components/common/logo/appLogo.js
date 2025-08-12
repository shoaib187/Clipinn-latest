import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { wp } from '../../constants/responsiveSize';

export default function AppLogo() {
  return (
    <Image
      source={require('../../../../assets/png/dark1.png')}
      style={styles.logo}
    />
  );
}

const styles = StyleSheet.create({
  logo: {
    width: wp(30),
    resizeMode: 'contain',
  },
});
