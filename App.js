import React, {useEffect, useState} from 'react';
import {AppNavigator} from './src/app/navigators/appNavigator/appNavigator';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {View, StyleSheet} from 'react-native';

import {getCurrentLocation} from './src/utils/common/services/locationServices/locationServices';
import Splash from './src/app/screens/splash/splash';

export default function App() {
  const [isSplashFinished, setIsSplashFinished] = useState(false);

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = async () => {
    try {
      const location = await getCurrentLocation();
      console.log('Got location:', location);
      // Use location data here
    } catch (error) {
      console.error('Failed to get location:', error);
      // Handle error here
    }
  };
  return (
    <View style={{flex: 1}}>
      <GestureHandlerRootView style={{flex: 1}}>
        <AppNavigator />
      </GestureHandlerRootView>
      {/* <GoogleMaps /> */}
      {!isSplashFinished && (
        <View style={StyleSheet.absoluteFill}>
          <Splash onFinish={() => setIsSplashFinished(true)} />
        </View>
      )}
    </View>
  );
}
