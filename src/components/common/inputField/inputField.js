import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { wp } from '../../constants/responsiveSize';
import { FONT } from '../../constants/font';

const InputField = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  keyboardType,
  autoCapitalize,
  leftIconName,
  showLeftIcon,
  rightIconName,
  showRightIcon,
  onRightIconPress,
  containerStyle,
  inputStyle,
  iconColor,
  label,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const labelAnim = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(labelAnim, {
      toValue: isFocused || value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isFocused, value]);

  const labelTranslateY = labelAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [14, -12],
  });

  const labelFontSize = labelAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [wp(4), wp(3)],
  });

  const labelColor = isFocused ? '#5A67D8' : '#9E9E9E';

  return (
    <View style={[styles.inputWrapper, containerStyle]}>
      <View style={styles.container}>
        {showLeftIcon && leftIconName && (
          <Icon
            name={leftIconName}
            size={20}
            color={iconColor || '#757575'}
            style={styles.leftIcon}
          />
        )}

        {/* Floating Label */}
        <Animated.Text
          style={[
            styles.floatingLabel,
            {
              transform: [{ translateY: labelTranslateY }],
              fontSize: labelFontSize,
              color: labelColor,
            },
          ]}
        >
          {label}
        </Animated.Text>

        <TextInput
          style={[styles.input, inputStyle]}
          placeholder={isFocused ? '' : placeholder}
          placeholderTextColor="#9E9E9E"
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />

        {showRightIcon && rightIconName && (
          <TouchableOpacity onPress={onRightIconPress} style={styles.rightIcon}>
            <Icon
              name={rightIconName}
              size={20}
              color={iconColor || '#757575'}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputWrapper: {
    marginVertical: 10,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.3,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingTop: 16,
    paddingBottom: 4,
    position: 'relative',
  },
  input: {
    flex: 1,
    fontSize: wp(4),
    fontFamily: FONT.PoppinsRegular,
    paddingLeft: 4,
    paddingTop: 4,
  },
  floatingLabel: {
    position: 'absolute',
    left: 15,
    top: 14,
    fontFamily: FONT.PoppinsRegular,
    backgroundColor: '#fff',
    paddingHorizontal: 4,
  },
  leftIcon: {
    marginRight: 10,
  },
  rightIcon: {
    padding: 5,
    marginLeft: 5,
  },
});

export default InputField;
