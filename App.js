import React, {useState} from 'react';
import {AppNavigator} from './src/app/navigators/appNavigator/appNavigator';
import {View, StyleSheet} from 'react-native';
import Splash from './src/app/screens/splash/splash';
import FaceScan from './src/app/screens/attendance/faceScan/faceScan';
import QRCodeScan from './src/app/screens/attendance/qrCodeScan/qrCodeScan';
import LocationBaseAttendance from './src/app/screens/attendance/locationBaseAttendance/locationBaseAttendace';

export default function App() {
  const [isSplashFinished, setIsSplashFinished] = useState(false);
  return (
    <View style={{flex: 1}}>
      <LocationBaseAttendance />
      {!isSplashFinished && (
        <View style={StyleSheet.absoluteFill}>
          <Splash onFinish={() => setIsSplashFinished(true)} />
        </View>
      )}
    </View>
  );
}
