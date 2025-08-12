import React, { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, SafeAreaView } from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import { wp } from '../../../components/constants/responsiveSize';

const LOGO_WIDTH = wp(40);

export default function Splash({ onFinish }) {
  const [showSplash, setShowSplash] = useState(true);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    const init = async () => {
      // Scale in
      await new Promise(res => {
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }).start(() => res());
      });

      // Pause
      await new Promise(res => setTimeout(res, 3000));

      // Fade out + scale out
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1.5,
          duration: 1500,
          useNativeDriver: true,
        }),
      ]).start(() => {
        RNBootSplash.hide({ fade: true });
        setShowSplash(false);
        onFinish();
      });
    };

    init();
  }, []);

  if (!showSplash) return null;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          styles.splashContainer,
          { opacity: fadeAnim },
        ]}
      >
        <Animated.Image
          source={require('../../../../assets/png/simple.png')}
          style={[styles.logo, { transform: [{ scale: scaleAnim }] }]}
        />
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: LOGO_WIDTH,
    height: LOGO_WIDTH,
    resizeMode: 'contain',
  },
});
