import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
  Alert,
  Platform,
  ActivityIndicator,
} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCodeScanner,
} from 'react-native-vision-camera';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

const {width, height} = Dimensions.get('window');

export default function QRCodeScanner() {
  const [scannedData, setScannedData] = useState(null);
  const [isActive, setIsActive] = useState(true);
  const [flash, setFlash] = useState('off');
  const [hasPermission, setHasPermission] = useState(false);
  const device = useCameraDevice('back');
  const camera = useRef(null);
  const scanLineAnim = useRef(new Animated.Value(0)).current;

  // Scan line animation
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scanLineAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(scanLineAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  // Request camera permission
  useEffect(() => {
    const requestPermission = async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'granted');
      if (status !== 'granted') {
        Alert.alert(
          'Permission Required',
          'Camera access is needed to scan QR codes',
        );
      }
    };
    requestPermission();
  }, []);

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: codes => {
      if (codes.length > 0 && codes[0].value !== scannedData) {
        setScannedData(codes[0].value);
        setIsActive(false);
        Alert.alert(
          'Scan Successful!',
          codes[0].value,
          [
            {
              text: 'OK',
              onPress: () => {
                setScannedData(null);
                setIsActive(true);
              },
            },
          ],
          {cancelable: false},
        );
      }
    },
  });

  const toggleFlash = () => {
    setFlash(flash === 'off' ? 'on' : 'off');
  };

  if (!hasPermission) {
    return (
      <View style={styles.permissionContainer}>
        <Ionicons name="camera-off" size={50} color="#fff" />
        <Text style={styles.permissionText}>
          Camera permission not granted. Please enable in settings.
        </Text>
      </View>
    );
  }

  if (!device) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={styles.loadingText}>Loading camera...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        ref={camera}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={isActive}
        codeScanner={codeScanner}
        torch={flash}
        enableZoomGesture={true}
      />

      {/* Overlay */}
      <View style={styles.overlay}>
        {/* Top Bar */}
        <View style={styles.topBar}>
          <Text style={styles.title}>Scan QR Code</Text>
          <TouchableOpacity onPress={toggleFlash} style={styles.flashButton}>
            <MaterialIcons
              name={flash === 'on' ? 'flash-on' : 'flash-off'}
              size={28}
              color="#fff"
            />
          </TouchableOpacity>
        </View>

        {/* Scanner Frame */}
        <View style={styles.scannerContainer}>
          <View style={styles.scannerFrame}>
            {/* Corners */}
            <View style={[styles.corner, styles.topLeft]} />
            <View style={[styles.corner, styles.topRight]} />
            <View style={[styles.corner, styles.bottomLeft]} />
            <View style={[styles.corner, styles.bottomRight]} />

            {/* Animated Scan Line */}
            <Animated.View
              style={[
                styles.scanLine,
                {
                  transform: [
                    {
                      translateY: scanLineAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, width * 0.7 - 4],
                      }),
                    },
                  ],
                },
              ]}
            />
          </View>
          <Text style={styles.instructionText}>
            Align QR code within the frame
          </Text>
        </View>

        {/* Bottom Bar */}
        <View style={styles.bottomBar}>
          <Text style={styles.hintText}>Scan QR codes to get information</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00000060',
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    padding: 20,
  },
  permissionText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  loadingText: {
    color: '#fff',
    marginTop: 15,
  },
  overlay: {
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
    paddingBottom: 40,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  flashButton: {
    padding: 10,
  },
  scannerContainer: {
    alignItems: 'center',
  },
  scannerFrame: {
    width: width * 0.7,
    height: width * 0.7,
    // borderWidth: 1,
    // borderColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 20,
    position: 'relative',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    overflow: 'hidden',
  },
  corner: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderColor: '#4CAF50',
  },
  topLeft: {
    top: 0,
    left: 0,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderTopLeftRadius: 20,
    borderColor: 'red',
  },
  topRight: {
    top: 0,
    right: 0,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderTopRightRadius: 20,
    borderColor: 'green',
  },

  bottomLeft: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderBottomLeftRadius: 20,
    borderColor: 'blue',
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderBottomRightRadius: 20,
    borderColor: 'gold',
  },
  scanLine: {
    width: '100%',
    height: 3,
    backgroundColor: '#4CAF50',
    position: 'absolute',
  },
  instructionText: {
    color: '#fff',
    marginTop: 25,
    fontSize: 16,
    textAlign: 'center',
  },
  bottomBar: {
    alignItems: 'center',
  },
  hintText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
  },
});
