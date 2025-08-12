import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Header from '../../../../components/common/header/header';
import Button from '../../../../components/common/button/button';
import { FONT } from '../../../../components/constants/font';
import { wp } from '../../../../components/constants/responsiveSize';
import { COLORS } from '../../../../components/constants/colors';
import IconButton from '../../../../components/common/button/iconButton';

export default function OtpScreen() {
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputRefs = useRef([]);

  const handleOtpChange = (value, index) => {
    if (/^\d*$/.test(value)) {
      const updatedOtp = [...otp];
      updatedOtp[index] = value;
      setOtp(updatedOtp);

      if (value && index < otp.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && otp[index] === '') {
      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };


  const handleResendCode = () => {
  // Logic to resend code
  console.log("Code resent!");
};


  return (
    <SafeAreaView style={styles.container}>
      <Header title={'MoveEase'} />
      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        <View style={{ alignItems: 'center', marginBottom: 30 }}>
          <IconButton name={'envelope'} color={COLORS.blueColor} size={30} />
        </View>
        <View style={styles.formWrapper}>
          <Text style={styles.title}>Verify your email to continue</Text>
          <Text style={styles.message}>
            Enter the 4-digit code sent to your email address.
          </Text>

          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <View style={styles.otpInput}>
              <TextInput
                key={index}
                value={digit}
                onChangeText={(value) => handleOtpChange(value, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                ref={(ref) => (inputRefs.current[index] = ref)}
                keyboardType="numeric"
                maxLength={1}
                style={styles.input}
                />
                </View>
            ))}
          </View>
          <Button title="Verify" style={styles.button} />
          <TouchableOpacity style={styles.resendWrapper}>
            <Text style={styles.resendText}>Didn’t receive the code?</Text>
            <Text style={styles.resendButton}> Resend</Text>
          </TouchableOpacity>
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
    textAlign:'center'
  },
  message: {
    fontSize: wp(4),
    opacity: 0.5,
    textAlign: 'center',
    marginTop: 12,
    paddingHorizontal: 10,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: wp(70),
    marginTop: 34,
  },
  otpInput:{
    alignItems:'center',
    justifyContent:'center',
    width: wp(15),
    height: 50,
    borderRadius: 12,
    borderWidth: 1.4,
    borderColor: '#eee',
    backgroundColor: COLORS.bgColor,
  },
  input: {
    textAlign: 'center',
    fontSize: wp(4.5),
    fontFamily: FONT.PoppinsMedium,
    top:4
  },
  resendWrapper: {
    flexDirection: 'row',
    marginTop: 20,
  },
  resendText: {
    fontSize: wp(4),
    color: '#555',
    fontFamily: FONT.PoppinsMedium,
  },
  resendButton: {
    fontSize: wp(4),
    color: COLORS.blueColor,
    fontFamily: FONT.PoppinsMedium,
  },
  button: {
    width: wp(90),
    marginTop: 20,
  },
  backLoginWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    gap: 4,
  },
  backLoginText: {
    fontFamily: FONT.PoppinsMedium,
    fontSize: wp(4),
  },
//   resendWrapper: {
//   flexDirection: 'row',
//   justifyContent: 'center',
//   alignItems: 'center',
//   marginTop: 20,
// },

// resendText: {
//   fontSize: 14,
//   color: COLORS.primary,
// },

});
