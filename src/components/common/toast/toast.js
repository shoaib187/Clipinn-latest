import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
  runOnJS,
} from 'react-native-reanimated';
import Ionicons from 'react-native-vector-icons/Ionicons';

const {width} = Dimensions.get('window');

export default function Toast({
  type = 'success', // 'success' | 'error'
  title,
  visible,
  message,
  duration = 3000,
  onClose,
}) {
  const translateY = useSharedValue(-100);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      // Animate in
      translateY.value = withTiming(0, {
        duration: 400,
        easing: Easing.out(Easing.exp),
      });
      opacity.value = withTiming(1, {duration: 400});

      // Auto-close after duration
      const timeout = setTimeout(() => {
        hideToast();
      }, duration);

      return () => clearTimeout(timeout);
    }
  }, [visible, duration]);

  const hideToast = () => {
    translateY.value = withTiming(
      -100,
      {
        duration: 400,
      },
      finished => {
        if (finished && onClose) {
          runOnJS(onClose)();
        }
      },
    );
    opacity.value = withTiming(0, {duration: 400});
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{translateY: translateY.value}],
    opacity: opacity.value,
  }));

  if (!visible) return null;

  // Styles & icons based on type
  const backgroundColor = type === 'success' ? '#4CAF50' : '#F44336';
  const iconName = type === 'success' ? 'checkmark-circle' : 'close-circle';

  return (
    <Animated.View style={[styles.container, {backgroundColor}, animatedStyle]}>
      <Ionicons
        name={iconName}
        size={24}
        color="#fff"
        style={styles.leftIcon}
      />
      <View style={styles.textWrapper}>
        <Text style={styles.title}>{title}</Text>
        {message ? <Text style={styles.message}>{message}</Text> : null}
      </View>
      <TouchableOpacity onPress={hideToast}>
        <Ionicons name="close" size={20} color="#fff" />
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 50,
    alignSelf: 'center',
    width: width * 0.9,
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftIcon: {
    marginRight: 10,
  },
  textWrapper: {
    flex: 1,
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  message: {
    color: '#fff',
    fontSize: 14,
    marginTop: 2,
    opacity: 0.9,
  },
});
