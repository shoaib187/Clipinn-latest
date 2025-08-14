import React, {useState} from 'react';
import {AppNavigator} from './src/app/navigators/appNavigator/appNavigator';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {View, StyleSheet} from 'react-native';
import Splash from './src/app/screens/splash/splash';

export default function App() {
  const [isSplashFinished, setIsSplashFinished] = useState(false);

  return (
    <View style={{flex: 1}}>
      <GestureHandlerRootView style={{flex: 1}}>
        <AppNavigator />
      </GestureHandlerRootView>
      {!isSplashFinished && (
        <View style={StyleSheet.absoluteFill}>
          <Splash onFinish={() => setIsSplashFinished(true)} />
        </View>
      )}
    </View>
  );
}
