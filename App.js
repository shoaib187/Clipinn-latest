// import React, {useState} from 'react';
// import {AppNavigator} from './src/app/navigators/appNavigator/appNavigator';
// import {GestureHandlerRootView} from 'react-native-gesture-handler';
// import {View, StyleSheet, SafeAreaView} from 'react-native';
// import Splash from './src/app/screens/splash/splash';

// export default function App() {
//   const [isSplashFinished, setIsSplashFinished] = useState(false);

//   return (
//     <SafeAreaView style={{flex: 1}}>
//       <GestureHandlerRootView style={{flex: 1}}>
//         <AppNavigator />
//       </GestureHandlerRootView>
//       {!isSplashFinished && (
//         <View style={StyleSheet.absoluteFill}>
//           <Splash onFinish={() => setIsSplashFinished(true)} />
//         </View>
//       )}
//     </SafeAreaView>
//   );
// }

import React, {useState} from 'react';
import {AppNavigator} from './src/app/navigators/appNavigator/appNavigator';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {View, StyleSheet} from 'react-native';
import Splash from './src/app/screens/splash/splash';
import {KeyboardProvider} from 'react-native-keyboard-controller';

export default function App() {
  const [isSplashFinished, setIsSplashFinished] = useState(false);

  return (
    <KeyboardProvider>
      <GestureHandlerRootView style={{flex: 1}}>
        <AppNavigator />
        {!isSplashFinished && (
          <View style={StyleSheet.absoluteFill}>
            <Splash onFinish={() => setIsSplashFinished(true)} />
          </View>
        )}
      </GestureHandlerRootView>
    </KeyboardProvider>
  );
}
