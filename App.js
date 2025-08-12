// import React, {useState} from 'react';
// import {AppNavigator} from './src/app/navigators/appNavigator/appNavigator';
// import {View, StyleSheet} from 'react-native';
// import Splash from './src/app/screens/splash/splash';

// export default function App() {
//   const [isSplashFinished, setIsSplashFinished] = useState(false);
//   return (
//     <View style={{flex: 1}}>
//       <AppNavigator />
//       {!isSplashFinished && (
//         <View style={StyleSheet.absoluteFill}>
//           <Splash onFinish={() => setIsSplashFinished(true)} />
//         </View>
//       )}
//     </View>
//   );
// }

import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useFrameProcessor,
} from 'react-native-vision-camera';
import { Worklets } from 'react-native-worklets-core';

import {} from "react-native-camera"

export default function App() {
  const device = useCameraDevice('front');

  React.useEffect(() => {
    Camera.requestCameraPermission();
  }, []);

  const frameProcessor = useFrameProcessor(frame => {
    'worklet';
    // Here you would run face detection code
    // Without extra libs, you'd need to implement your own ML here
    console.log(`Frame width: ${frame.width}, height: ${frame.height}`);
  }, []);

  if (!device) return null;

  return (
    <View style={StyleSheet.absoluteFill}>
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        frameProcessor={frameProcessor}
        frameProcessorFps={5}
      />
    </View>
  );
}
