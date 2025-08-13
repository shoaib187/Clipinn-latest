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
  SafeAreaView,
} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCodeScanner,
} from 'react-native-vision-camera';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Toast from '../../../../components/common/toast/toast';
import {Easing} from 'react-native-reanimated';

const {width} = Dimensions.get('window');

export default function MarkWithQrCode({navigation}) {
  const [toast, setToast] = useState({
    visible: false,
    type: 'success',
    title: '',
    message: '',
  });

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
      if (codes.length > 0 && codes[0].value !== scannedData && isActive) {
        setScannedData(codes[0].value);
        setIsActive(false);

        // Simulate API call to verify employee
        setTimeout(() => {
          const success = Math.random() > 0.3; // 70% success rate for demo
          handleScanResult(success, codes[0].value);
        }, 1000);
      }
    },
  });

  const handleScanResult = (success, data) => {
    setToast({
      visible: true,
      type: success ? 'success' : 'error',
      title: success ? 'Attendance Marked!' : 'Scan Failed',
      message: success
        ? 'Your attendance has been recorded successfully'
        : 'Invalid QR code. Please try again.',
      duration: success ? 3000 : 4000,
    });

    // Reset scanner after showing toast
    setTimeout(
      () => {
        setScannedData(null);
        setIsActive(true);
      },
      success ? 3000 : 4000,
    );
  };

  const toggleFlash = () => {
    setFlash(flash === 'off' ? 'on' : 'off');
  };

  const closeScanner = () => {
    Alert.alert('Close Scanner', 'Would you like to close the scanner?', [
      {text: 'Cancel', style: 'cancel'},
      {text: 'Yes', onPress: () => navigation.goBack()},
    ]);
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
    <SafeAreaView style={styles.safeArea}>
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
            <View style={styles.flashButtonPlaceholder} />
            <Text style={styles.title}>Scan QR Code</Text>
            <TouchableOpacity onPress={closeScanner} style={styles.closeButton}>
              <Ionicons name="close" size={28} color="#fff" />
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
              Align QR code within the frame to scan
            </Text>
          </View>

          {/* Bottom Bar */}
          <View style={styles.bottomBar}>
            <TouchableOpacity onPress={toggleFlash} style={styles.lightButton}>
              <MaterialIcons
                name={flash === 'on' ? 'highlight' : 'highlight-off'}
                size={28}
                color="#fff"
              />
              <Text style={styles.lightButtonText}>
                {flash === 'on' ? 'Light On' : 'Light Off'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Toast Notification */}
        <Toast
          visible={toast.visible}
          type={toast.type}
          title={toast.title}
          message={toast.message}
          duration={toast.duration}
          onClose={() => setToast({...toast, visible: false})}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000',
  },
  container: {
    flex: 1,
    backgroundColor: '#000',
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
    paddingVertical: 10,
  },
  closeButton: {
    padding: 10,
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  flashButtonPlaceholder: {
    width: 48,
  },
  scannerContainer: {
    alignItems: 'center',
  },
  scannerFrame: {
    width: width * 0.7,
    height: width * 0.7,
    position: 'relative',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 20,
  },
  corner: {
    position: 'absolute',
    width: 30,
    height: 30,
  },
  topLeft: {
    top: 0,
    left: 0,
    borderTopWidth: 3,
    borderLeftWidth: 3,
    borderColor: '#fff',
  },
  topRight: {
    top: 0,
    right: 0,
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderColor: '#fff',
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderColor: '#fff',
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderColor: '#fff',
  },
  scanLine: {
    width: '100%',
    height: 2,
    backgroundColor: 'green',
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
  lightButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
  },
  lightButtonText: {
    color: '#fff',
    marginLeft: 10,
    fontSize: 16,
  },
});
