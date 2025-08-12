import { View, Text, StyleSheet } from 'react-native';
import React, { useMemo } from 'react';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';

export default function markWithQrCode() {
  const device = useCameraDevice('back', {
    physicalDevices: ['wide-angle-camera'],
  });

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: codes => {
      console.log(`Scanned ${codes.length} codes!`);
    },
  });
  if (device == null) return <Text>fasfsadf</Text>;

  return (
    <Camera
      codeScanner={codeScanner}
      style={StyleSheet.absoluteFill}
      device={device}
      isActive={true}
    />
  );
}
