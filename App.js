import React, {useState} from 'react';
import {AppNavigator} from './src/app/navigators/appNavigator/appNavigator';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {View, StyleSheet, SafeAreaView} from 'react-native';
import Splash from './src/app/screens/splash/splash';

import ProfileMainPage from './src/app/screens/profile/profileMainPage/profileMainPage';
import ProfileHomePage from './src/app/screens/profile/profileHomePage/profileHomePage';
import About from './src/app/screens/profile/about/about';
import Support from './src/app/screens/profile/support/support';
import PrivacyPolicy from './src/app/screens/profile/privacyPolicy/privacyPolicy';
import PersonalInfo from './src/app/screens/profile/personalInfo/personalInfo';
import BootSplash from 'react-native-bootsplash';

export default function App() {
  const [isSplashFinished, setIsSplashFinished] = useState(false);
  return (
    <SafeAreaView style={{flex: 1}}>
      <GestureHandlerRootView style={{flex: 1}}>
        <AppNavigator />
        {!isSplashFinished && (
          <View style={StyleSheet.absoluteFill}>
            <Splash onFinish={() => setIsSplashFinished(true)} />
          </View>
        )}
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}
