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
  Modal,
  Image,
  Easing,
} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCodeScanner,
} from 'react-native-vision-camera';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {wp} from '../../../../components/constants/responsiveSize';
import Toast from '../../../../components/common/toast/toast';

const {width, height} = Dimensions.get('window');

export default function QRCodeScanner() {
  const [scannedData, setScannedData] = useState(null);
  const [isActive, setIsActive] = useState(true);
  const [flash, setFlash] = useState('off');
  const [hasPermission, setHasPermission] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [scanStatus, setScanStatus] = useState(''); // 'success' or 'error'
  const [employeeData, setEmployeeData] = useState(null);
  const device = useCameraDevice('back');
  const camera = useRef(null);
  const scanLineAnim = useRef(new Animated.Value(0)).current;
  const modalAnim = useRef(new Animated.Value(0)).current;

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
          // This would be your actual API call in a real app
          const success = Math.random() > 0.3; // 70% success rate for demo
          handleScanResult(success, codes[0].value);
        }, 1000);
      }
    },
  });

  const handleScanResult = (success, data) => {
    setScanStatus(success ? 'success' : 'error');

    // Mock employee data - replace with actual API response
    setEmployeeData({
      id: 'EMP-12345',
      name: success ? 'John Doe' : 'Invalid QR Code',
      position: success ? 'Software Developer' : 'N/A',
      department: success ? 'Engineering' : 'N/A',
      time: new Date().toLocaleTimeString(),
      date: new Date().toLocaleDateString(),
      avatar: success ? 'https://randomuser.me/api/portraits/men/4.jpg' : null,
    });

    // Animate modal in
    modalAnim.setValue(0);
    Animated.spring(modalAnim, {
      toValue: 1,
      friction: 5,
      useNativeDriver: true,
    }).start();

    setShowResultModal(true);
  };

  const closeModal = () => {
    Animated.timing(modalAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setShowResultModal(false);
      setScannedData(null);
      setIsActive(true);
    });
  };

  const toggleFlash = () => {
    setFlash(flash === 'off' ? 'on' : 'off');
  };

  const closeScanner = () => {
    // Navigation.goBack() would be used in a real app with navigation
    Alert.alert('Close Scanner', 'Would you like to close the scanner?', [
      {text: 'Cancel', style: 'cancel'},
      {text: 'Yes', onPress: () => console.log('Scanner closed')},
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

  const modalTranslateY = modalAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [300, 0],
  });

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
          <View style={styles.flashButtonPlaceholder} />
          <Text style={styles.title}>Scan QR Code</Text>
          <TouchableOpacity onPress={closeScanner} style={styles.closeButton}>
            <Ionicons name="close" size={28} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Scanner Frame */}
        <View style={styles.scannerContainer}>
          <View style={styles.scannerFrame}>
            {/* Corners with animation */}
            <Animated.View style={[styles.corner, styles.topLeft]} />
            <Animated.View style={[styles.corner, styles.topRight]} />
            <Animated.View style={[styles.corner, styles.bottomLeft]} />
            <Animated.View style={[styles.corner, styles.bottomRight]} />

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

      {/* Result Modal */}
      <Toast
        message={'Attendance marked Successfully!'}
        onClose={() => setShowResultModal(false)}
        title={'Success'}
        duration={4000}
      />
    </View>
  );
}

const styles = StyleSheet.create({
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
    // backgroundColor: 'rgba(0, 0, 0, 0.9)',
    // zIndex: 1,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    width: wp(10),
  },
  scannerContainer: {
    alignItems: 'center',
    // zIndex: 1,
  },
  scannerFrame: {
    width: width * 0.7,
    height: width * 0.7,
    position: 'relative',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    // overflow: 'hidden',
    borderRadius: 20,
    // zIndex: 1,
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
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#1E1E1E',
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    padding: 25,
    paddingBottom: 40,
    alignItems: 'center',
  },
  modalCloseButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    padding: 5,
  },
  successHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  successTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#4CAF50',
    marginBottom: 20,
  },
  employeeInfo: {
    alignItems: 'center',
    marginBottom: 25,
  },
  employeeName: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  employeeDetail: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 16,
    marginBottom: 3,
  },
  timeContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  timeText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  dateText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 16,
    marginTop: 5,
  },
  errorHeader: {
    alignItems: 'center',
    marginBottom: 25,
  },
  errorTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
  },
  errorText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  tryAgainButton: {
    backgroundColor: '#F44336',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 20,
  },
  tryAgainText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
