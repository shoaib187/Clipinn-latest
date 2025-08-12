import { View, Text, Animated, TextInput, StyleSheet } from 'react-native';
import React, { useRef } from 'react';
import Svg, { Circle, G } from 'react-native-svg';
import { FONT } from '../../constants/font';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedInput = Animated.createAnimatedComponent(TextInput);

export default function Donut({
  percentage = 100,
  radius = 25,
  strokeWidth = 7,
  duration = 500,
  color = 'blue',
  delay = 2000,
  textColor,
  max = 100,
  title,
}) {
  const circleRef = useRef();
  const inputRef = useRef();
  const halfCircle = radius + strokeWidth;
  const circleCircumference = 2 * Math.PI * radius;
  const animatedValue = useRef(new Animated.Value(0)).current;

  const animation = toValue => {
    return Animated.timing(animatedValue, {
      toValue,
      duration,
      delay,
      useNativeDriver: true,
    }).start();
  };
  React.useEffect(() => {
    animation(percentage);
    animatedValue.addListener(v => {
      if (circleRef?.current) {
        const maxPerc = (100 * v.value) / max;
        const strokeDashoffset =
          circleCircumference - (circleCircumference * maxPerc) / 100;
        circleRef.current.setNativeProps({
          strokeDashoffset,
        });
      }
      if (inputRef.current) {
        inputRef.current.setNativeProps({
          text: `${Math.round(v.value)}`,
        });
      }
    });
    // const maxPerc = (100 * percentage) / max;
    return () => animatedValue.removeAllListeners();
  }, [max, percentage]);
  return (
    <View style={styles.container}>
      <Svg
        width={radius * 2}
        height={radius * 2}
        viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}
      >
        <G rotation={'-90'} origin={`${halfCircle},${halfCircle}`}>
          <Circle
            cx={'50%'}
            cy={'50%'}
            stroke={color}
            strokeWidth={strokeWidth}
            r={radius}
            strokeOpacity={0.1}
            fill={'transparent'}
          />
          <AnimatedCircle
            ref={circleRef}
            cx={'50%'}
            cy={'50%'}
            stroke={color}
            strokeWidth={strokeWidth}
            r={radius}
            strokeDasharray={circleCircumference}
            strokeDashoffset={circleCircumference}
            fill={'transparent'}
            strokeLinecap="round"
          />
        </G>
      </Svg>
      <View
        style={[
          StyleSheet.absoluteFillObject,
          {
            alignItems: 'center',
            justifyContent: 'center',
          },
        ]}
      >
        <AnimatedInput
          ref={inputRef}
          style={[styles.target]}
          defaultValue="0"
          editable={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  target: {
    fontSize: 12,
    position: 'absolute',
    fontFamily: FONT.PoppinsMedium, // Font family
    top: 6,
  },
});
