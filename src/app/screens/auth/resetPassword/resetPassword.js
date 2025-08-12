import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import Header from '../../../../components/common/header/header';
import Button from '../../../../components/common/button/button';
import { FONT } from '../../../../components/constants/font';
import { wp } from '../../../../components/constants/responsiveSize';
import { COLORS } from '../../../../components/constants/colors';
import IconButton from '../../../../components/common/button/iconButton';

export default function ResetPassword() {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleResetPassword = () => {
    // Add reset logic
    console.log('Password reset submitted');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title={'MoveEase'} />
      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        <View style={{ alignItems: 'center', marginBottom: 30 }}>
          <IconButton name={'key'} color={COLORS.blueColor} size={30} />
        </View>

        <View style={styles.formWrapper}>
          <Text style={styles.title}>Reset your password</Text>
          <Text style={styles.message}>
            Enter your new password below to regain access to your account.
          </Text>

          {/* New Password Field */}
          <View style={styles.inputWrapper}>
            <Feather name="lock" size={20} color={"#333"} style={styles.iconStyle} />
            <TextInput
              style={styles.input}
              placeholder="Enter new password"
              placeholderTextColor="#999"
              secureTextEntry={!showNewPassword}
              value={newPassword}
              onChangeText={setNewPassword}
            />
            <TouchableOpacity onPress={() => setShowNewPassword(!showNewPassword)}>
              <Icon
                name={showNewPassword ? 'eye' : 'eye-slash'}
                size={16}
                color="#999"
              />
            </TouchableOpacity>
          </View>

          {/* Confirm Password Field */}
          <View style={styles.inputWrapper}>
            <Feather name="lock" size={20} color="#333" style={styles.iconStyle} />
            <TextInput
              style={styles.input}
              placeholder="Confirm password"
              placeholderTextColor="#999"
              secureTextEntry={!showConfirmPassword}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
              <Icon
                name={showConfirmPassword ? 'eye' : 'eye-slash'}
                size={16}
                color="#999"
              />
            </TouchableOpacity>
          </View>

          <Button
            title="Reset Password"
            style={styles.button}
            onPress={handleResetPassword}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainerStyle: {
    flexGrow: 1,
    paddingHorizontal: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  title: {
    fontSize: wp(7.5),
    fontFamily: FONT.PoppinsMedium,
    textAlign: 'center',
  },
  message: {
    fontSize: wp(4),
    opacity: 0.5,
    textAlign: 'center',
    marginTop: 12,
    paddingHorizontal: 10,
    marginBottom:30
  },
  button: {
    width: wp(90),
    marginTop: 30,
  },
  input: {
    flex: 1,
    fontFamily: FONT.PoppinsMedium,
    textAlignVertical: 'center',
    paddingTop: 16,
  },
  inputWrapper: {
    width: wp(90),
    borderRadius: 40,
    borderWidth: 1.4,
    borderColor: "#eee",
    height: 50,
    marginTop: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingLeft: wp(5),
    paddingRight: wp(5),
    overflow: "hidden",
    backgroundColor: COLORS.bgColor,
  },
});
