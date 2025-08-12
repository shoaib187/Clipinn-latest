import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BackButton from '../../../../components/common/button/backButton';
import AppLogo from '../../../../components/common/logo/appLogo';
import { COLORS } from '../../../../components/constants/colors';
import { FONT } from '../../../../components/constants/font';
import { wp } from '../../../../components/constants/responsiveSize';
import Button from '../../../../components/common/button/button';
import LinearGradient from 'react-native-linear-gradient';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);


  return (
    <SafeAreaView style={styles.container}>
      {/* <LinearGradient colors={['#f7f9fc', '#e3f2fd']} style={{ flex: 1 }}> */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingContainer}
      >
        <BackButton />
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
          {/* Logo and Title */}
          <View style={styles.logoContainer}>
            <View style={{alignSelf:'center'}}>
              <AppLogo />
            </View>
            <View>
            <Text style={styles.appName}>Login</Text>
            <Text style={styles.welcomeText}>Let's get to work</Text>
            </View>
          </View>

          {/* Email Input */}
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Email</Text>
            <View style={styles.inputContainer}>
              <Icon name="email-outline" size={20} color={COLORS.gray} style={styles.leftIcon} />
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor="#9E9E9E"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          {/* Password Input */}
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.inputContainer}>
              <Icon name="lock-outline" size={20} color={COLORS.gray} style={styles.leftIcon} />
              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                placeholderTextColor="#9E9E9E"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.rightIcon}>
                <Icon
                  name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={20}
                  color={COLORS.gray}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Remember Me and Forgot Password */}
<View style={styles.optionsRow}>
  <TouchableOpacity
    style={styles.rememberMeContainer}
    onPress={() => setRememberMe(!rememberMe)}
  >
    <Icon
      name={rememberMe ? 'checkbox-marked' : 'checkbox-blank-outline'}
      size={20}
      color={COLORS.primary}
    />
    <Text style={styles.rememberMeText}>Remember Me</Text>
  </TouchableOpacity>

  <TouchableOpacity onPress={() => console.log('Navigate to Forgot Password')}>
    <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
  </TouchableOpacity>
</View>


          {/* Submit Button */}
          <Button title={"Login"} />
        </ScrollView>
      </KeyboardAvoidingView>
      {/* </LinearGradient> */}
    </SafeAreaView>
  );
};

export default Login;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  keyboardAvoidingContainer: {
    flex: 1,
  },
  scrollContainer: {
    paddingHorizontal: wp(5),
    paddingBottom: 50,
  },
  logoContainer: {
    // alignItems: 'center',
    marginBottom:30
  },
  appName: {
    fontSize: wp(7),
    fontFamily: FONT.PoppinsMedium,
    color: COLORS.primary,
  },
  welcomeText: {
    fontSize: wp(4),
    fontFamily: FONT.PoppinsRegular,
    color: COLORS.gray,
    marginTop: wp(1),
  },
  inputWrapper: {
  },
  label: {
    fontSize: wp(4),
    fontFamily: FONT.PoppinsRegular,
    color: COLORS.black,
    marginTop:14
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.3,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingHorizontal: wp(2),
    paddingLeft:14,
    // backgroundColor:COLORS.white
  },
  input: {
    flex: 1,
    fontSize: wp(4),
    fontFamily: FONT.PoppinsRegular,
    color: COLORS.black,
    height:'100%',
    textAlignVertical:'center',
    top:3
  },
  leftIcon: {
    marginRight: wp(2),
  },
  rightIcon: {
    padding: wp(1),
    marginLeft: wp(1),
  },
  loginButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    alignItems: 'center',
  },
  loginText: {
    color: COLORS.black,
    fontSize: wp(4.5),
    fontFamily:FONT.PoppinsMedium
  },
optionsRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: 14,
  marginBottom: 24,
},

rememberMeContainer: {
  flexDirection: 'row',
  alignItems: 'center',
},

rememberMeText: {
  marginLeft: 6,
  fontSize: wp(3.5),
  fontFamily: FONT.PoppinsRegular,
  color: COLORS.gray,
  marginTop:4
},

forgotPasswordText: {
  fontSize: wp(3.5),
  fontFamily: FONT.PoppinsRegular,
  color: COLORS.primary,
  textDecorationLine: 'underline',
},

});
