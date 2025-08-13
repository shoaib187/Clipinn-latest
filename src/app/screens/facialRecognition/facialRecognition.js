// import React, {useState, useEffect, useRef} from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Animated,
//   Easing,
//   Dimensions,
//   Image,
// } from 'react-native';
// import {Camera, useCameraDevice} from 'react-native-vision-camera';

// const {width, height} = Dimensions.get('window');
// const SCAN_BOX_SIZE = 280;

// export default function FaceScan() {
//   const device = useCameraDevice('back');
//   const cameraRef = useRef(null);
//   const [hasPermission, setHasPermission] = useState(false);
//   const [capturedPhoto, setCapturedPhoto] = useState(null);
//   const [scanning, setScanning] = useState(false);
//   const [scanResult, setScanResult] = useState(null); // success or fail

//   const scanLineAnim = useRef(new Animated.Value(0)).current;

//   useEffect(() => {
//     const requestPermission = async () => {
//       const status = await Camera.requestCameraPermission();
//       setHasPermission(status === 'granted');
//     };
//     requestPermission();
//   }, []);

//   useEffect(() => {
//     if (scanning) {
//       Animated.loop(
//         Animated.sequence([
//           Animated.timing(scanLineAnim, {
//             toValue: SCAN_BOX_SIZE - 4,
//             duration: 2000,
//             easing: Easing.linear,
//             useNativeDriver: true,
//           }),
//           Animated.timing(scanLineAnim, {
//             toValue: 0,
//             duration: 2000,
//             easing: Easing.linear,
//             useNativeDriver: true,
//           }),
//         ]),
//       ).start();
//     } else {
//       scanLineAnim.stopAnimation();
//       scanLineAnim.setValue(0);
//     }
//   }, [scanning, scanLineAnim]);

//   const takePhotoAndScan = async () => {
//     if (cameraRef.current && !scanning) {
//       setScanResult(null); // reset
//       try {
//         const photo = await cameraRef.current.takePhoto({
//           flash: 'off',
//         });
//         setCapturedPhoto(photo);
//         setScanning(true);

//         // Simulate API call delay
//         setTimeout(() => {
//           setScanning(false);
//           const success = Math.random() > 0.3;
//           setScanResult(success ? 'success' : 'fail');
//         }, 3000);
//       } catch (error) {
//         console.error('Take photo error:', error);
//       }
//     }
//   };

//   if (!device)
//     return (
//       <View style={styles.centered}>
//         <Text style={{color: 'white'}}>Loading camera...</Text>
//       </View>
//     );
//   if (!hasPermission)
//     return (
//       <View style={styles.centered}>
//         <Text style={{color: 'white'}}>No camera permission</Text>
//       </View>
//     );

//   return (
//     <View style={styles.container}>
//       {/* Camera preview fills whole screen */}
//       <Camera
//         style={StyleSheet.absoluteFill}
//         device={device}
//         isActive={!scanning} // pause preview while scanning
//         photo={true}
//         ref={cameraRef}
//       />

//       {/* Dark overlays, transparent scan box area */}
//       <View style={styles.overlay}>
//         {/* Top dark area */}
//         <View
//           style={[styles.overlayRow, {height: (height - SCAN_BOX_SIZE) / 2}]}
//         />
//         {/* Middle row with sides dark, center transparent */}
//         <View style={styles.middleRow}>
//           <View style={styles.overlaySide} />
//           <View style={styles.scanBox}>
//             {/* Show captured photo on top of camera preview when captured */}
//             {capturedPhoto && (
//               <Image
//                 source={{
//                   uri: capturedPhoto.path.startsWith('file://')
//                     ? capturedPhoto.path
//                     : 'file://' + capturedPhoto.path,
//                 }}
//                 style={styles.capturedImage}
//               />
//             )}

//             {/* Corner lines */}
//             <View style={[styles.corner, styles.topLeft]} />
//             <View style={[styles.corner, styles.topRight]} />
//             <View style={[styles.corner, styles.bottomLeft]} />
//             <View style={[styles.corner, styles.bottomRight]} />

//             {/* Scanning animation line */}
//             {scanning && (
//               <Animated.View
//                 style={[
//                   styles.scanLine,
//                   {transform: [{translateY: scanLineAnim}]},
//                 ]}
//               />
//             )}
//           </View>
//           <View style={styles.overlaySide} />
//         </View>
//         {/* Bottom dark area */}
//         <View
//           style={[styles.overlayRow, {height: (height - SCAN_BOX_SIZE) / 2}]}
//         />
//       </View>

//       {/* Instruction/status text */}
//       <View style={styles.instructionBox}>
//         {!scanning && !scanResult && (
//           <Text style={styles.instructionText}>
//             Align your face within the frame to scan
//           </Text>
//         )}
//         {scanning && <Text style={styles.instructionText}>Scanning...</Text>}
//         {scanResult === 'success' && (
//           <Text style={[styles.instructionText, {color: 'lime'}]}>
//             Face recognized! Attendance marked.
//           </Text>
//         )}
//         {scanResult === 'fail' && (
//           <Text style={[styles.instructionText, {color: 'red'}]}>
//             Face not recognized. Please try again.
//           </Text>
//         )}
//       </View>

//       {/* Scan button */}
//       {!scanning && (
//         <TouchableOpacity
//           style={styles.captureButton}
//           onPress={takePhotoAndScan}>
//           <Text style={styles.captureButtonText}>Scan Face</Text>
//         </TouchableOpacity>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {flex: 1, backgroundColor: 'black'},
//   centered: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'black',
//   },
//   overlay: {
//     ...StyleSheet.absoluteFillObject,
//     justifyContent: 'space-between',
//   },
//   overlayRow: {
//     backgroundColor: 'rgba(0,0,0,0.7)',
//   },
//   middleRow: {
//     flexDirection: 'row',
//   },
//   overlaySide: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.7)',
//   },
//   scanBox: {
//     width: SCAN_BOX_SIZE,
//     height: SCAN_BOX_SIZE,
//     position: 'relative',
//     overflow: 'hidden',
//     backgroundColor: 'transparent', // show camera preview behind transparent box
//   },
//   capturedImage: {
//     ...StyleSheet.absoluteFillObject,
//     resizeMode: 'cover',
//   },
//   corner: {
//     width: 30,
//     height: 30,
//     borderColor: 'lime',
//     position: 'absolute',
//   },
//   topLeft: {
//     top: 0,
//     left: 0,
//     borderLeftWidth: 4,
//     borderTopWidth: 4,
//   },
//   topRight: {
//     top: 0,
//     right: 0,
//     borderRightWidth: 4,
//     borderTopWidth: 4,
//   },
//   bottomLeft: {
//     bottom: 0,
//     left: 0,
//     borderLeftWidth: 4,
//     borderBottomWidth: 4,
//   },
//   bottomRight: {
//     bottom: 0,
//     right: 0,
//     borderRightWidth: 4,
//     borderBottomWidth: 4,
//   },
//   scanLine: {
//     position: 'absolute',
//     left: 0,
//     right: 0,
//     height: 4,
//     backgroundColor: 'lime',
//     opacity: 0.7,
//   },
//   instructionBox: {
//     position: 'absolute',
//     bottom: 120,
//     width: '100%',
//     alignItems: 'center',
//   },
//   instructionText: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: '600',
//     backgroundColor: '#00000080',
//     paddingHorizontal: 20,
//     paddingVertical: 8,
//     borderRadius: 20,
//   },
//   captureButton: {
//     position: 'absolute',
//     bottom: 40,
//     alignSelf: 'center',
//     backgroundColor: 'lime',
//     paddingHorizontal: 40,
//     paddingVertical: 14,
//     borderRadius: 30,
//     elevation: 3,
//   },
//   captureButtonText: {
//     fontWeight: '700',
//     fontSize: 18,
//     color: 'black',
//   },
// });

import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
  Dimensions,
  Image,
} from 'react-native';
import {Camera, useCameraDevice} from 'react-native-vision-camera';

const {width, height} = Dimensions.get('window');
const SCAN_BOX_SIZE = 280;

export default function FacialRecognition() {
  const device = useCameraDevice('back');
  const cameraRef = useRef(null);
  const [hasPermission, setHasPermission] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null); // success or fail

  const scanLineAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const requestPermission = async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'granted');
    };
    requestPermission();
  }, []);

  useEffect(() => {
    if (scanning) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(scanLineAnim, {
            toValue: SCAN_BOX_SIZE - 4,
            duration: 2000,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(scanLineAnim, {
            toValue: 0,
            duration: 2000,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    } else {
      scanLineAnim.stopAnimation();
      scanLineAnim.setValue(0);
    }
  }, [scanning, scanLineAnim]);

  // Core scanning function
  const takePhotoAndScan = async () => {
    if (cameraRef.current && !scanning) {
      setScanResult(null); // reset previous result
      try {
        const photo = await cameraRef.current.takePhoto({
          flash: 'off',
        });
        setCapturedPhoto(photo);
        setScanning(true);

        // Simulate API call delay
        setTimeout(() => {
          setScanning(false);
          const success = Math.random() > 0.3;
          setScanResult(success ? 'success' : 'fail');
          setCapturedPhoto(null);
        }, 3000);
      } catch (error) {
        console.error('Take photo error:', error);
      }
    }
  };

  // Retry automatically if scan failed
  useEffect(() => {
    if (scanResult === 'fail') {
      // Clear captured photo and scan result after short delay
      const retryTimeout = setTimeout(() => {
        setCapturedPhoto(null);
        setScanResult(null);
        takePhotoAndScan();
      }, 1500); // 1.5 seconds before retry

      return () => clearTimeout(retryTimeout);
    }
  }, [scanResult]);

  if (!device)
    return (
      <View style={styles.centered}>
        <Text style={{color: 'white'}}>Loading camera...</Text>
      </View>
    );
  if (!hasPermission)
    return (
      <View style={styles.centered}>
        <Text style={{color: 'white'}}>No camera permission</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      {/* Camera preview fills whole screen */}
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={!scanning} // pause preview while scanning
        photo={true}
        ref={cameraRef}
      />

      {/* Dark overlays, transparent scan box area */}
      <View style={styles.overlay}>
        {/* Top dark area */}
        <View
          style={[styles.overlayRow, {height: (height - SCAN_BOX_SIZE) / 2}]}
        />
        {/* Middle row with sides dark, center transparent */}
        <View style={styles.middleRow}>
          <View style={styles.overlaySide} />
          <View style={styles.scanBox}>
            {/* Show captured photo on top of camera preview when captured */}
            {capturedPhoto && (
              <Image
                source={{
                  uri: capturedPhoto.path.startsWith('file://')
                    ? capturedPhoto.path
                    : 'file://' + capturedPhoto.path,
                }}
                style={styles.capturedImage}
              />
            )}

            {/* Corner lines */}
            <View style={[styles.corner, styles.topLeft]} />
            <View style={[styles.corner, styles.topRight]} />
            <View style={[styles.corner, styles.bottomLeft]} />
            <View style={[styles.corner, styles.bottomRight]} />

            {/* Scanning animation line */}
            {scanning && (
              <Animated.View
                style={[
                  styles.scanLine,
                  {transform: [{translateY: scanLineAnim}]},
                ]}
              />
            )}
          </View>
          <View style={styles.overlaySide} />
        </View>
        {/* Bottom dark area */}
        <View
          style={[styles.overlayRow, {height: (height - SCAN_BOX_SIZE) / 2}]}
        />
      </View>

      {/* Instruction/status text */}
      <View style={styles.instructionBox}>
        {!scanning && !scanResult && (
          <Text style={styles.instructionText}>
            Align your face within the frame to scan
          </Text>
        )}
        {scanning && <Text style={styles.instructionText}>Scanning...</Text>}
        {scanResult === 'success' && (
          <Text style={[styles.instructionText, {color: 'lime'}]}>
            Face recognized! Attendance marked.
          </Text>
        )}
        {scanResult === 'fail' && (
          <Text style={[styles.instructionText, {color: 'red'}]}>
            Face not recognized. Trying again...
          </Text>
        )}
      </View>

      {/* Scan button */}
      {!scanning && !capturedPhoto && (
        <TouchableOpacity
          style={styles.captureButton}
          onPress={takePhotoAndScan}>
          <Text style={styles.captureButtonText}>Scan Face</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'black'},
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'space-between',
  },
  overlayRow: {
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  middleRow: {
    flexDirection: 'row',
  },
  overlaySide: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  scanBox: {
    width: SCAN_BOX_SIZE,
    height: SCAN_BOX_SIZE,
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: 'transparent', // show camera preview behind transparent box
  },
  capturedImage: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
  corner: {
    width: 30,
    height: 30,
    borderColor: 'lime',
    position: 'absolute',
  },
  topLeft: {
    top: 0,
    left: 0,
    borderLeftWidth: 4,
    borderTopWidth: 4,
  },
  topRight: {
    top: 0,
    right: 0,
    borderRightWidth: 4,
    borderTopWidth: 4,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderLeftWidth: 4,
    borderBottomWidth: 4,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderRightWidth: 4,
    borderBottomWidth: 4,
  },
  scanLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: 'lime',
    opacity: 0.7,
  },
  instructionBox: {
    position: 'absolute',
    bottom: 120,
    width: '100%',
    alignItems: 'center',
  },
  instructionText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    backgroundColor: '#00000080',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  captureButton: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    backgroundColor: 'lime',
    paddingHorizontal: 40,
    paddingVertical: 14,
    borderRadius: 30,
    elevation: 3,
  },
  captureButtonText: {
    fontWeight: '700',
    fontSize: 18,
    color: 'black',
  },
});
