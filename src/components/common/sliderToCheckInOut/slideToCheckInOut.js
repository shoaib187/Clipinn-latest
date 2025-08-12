// import {
//   View,
//   StyleSheet,
//   PanResponder,
//   Dimensions,
//   Animated,
// } from 'react-native';
// import React, { useRef } from 'react';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { COLORS } from '../../constants/colors';
// import { FONT } from '../../constants/font';

// const { width } = Dimensions.get('window');

// const TRACK_SIZE = width - 62;
// const thumbSize = TRACK_SIZE * 0.15;

// export default function SlideToCheckInOut({
//   onComplete,
//   onConfirmCheck,
//   type,
// }) {
//   const panX = useRef(new Animated.Value(0)).current;
//   const panResponder = useRef(
//     PanResponder.create({
//       onMoveShouldSetPanResponder: () => true,
//       onStartShouldSetPanResponderCapture: () => true,
//       onPanResponderMove: (_, gestureState) => {
//         if (gestureState.dx >= 0 && gestureState.dx <= TRACK_SIZE - thumbSize) {
//           panX.setValue(gestureState.dx);
//         }
//       },
//       onPanResponderRelease: async (_, gestureState) => {
//         if (gestureState.dx > TRACK_SIZE * 0.6) {
//           Animated.timing(panX, {
//             toValue: TRACK_SIZE - thumbSize,
//             duration: 200,
//             useNativeDriver: false,
//           }).start(() => {
//             handleOnboardingComplete();
//           });
//         } else {
//           Animated.spring(panX, {
//             toValue: 0,
//             useNativeDriver: false,
//           }).start();
//         }
//       },
//     }),
//   ).current;

//   const handleOnboardingComplete = async () => {
//     try {
//       await AsyncStorage.setItem('slideToken', 'USER_CHECKEDIN');
//       onComplete();
//       onConfirmCheck(type);
//     } catch (err) {
//       console.warn('Failed to save onboarding token', err);
//     }
//   };

//   return (
//     <View
//       style={[
//         styles.slideBar,
//         {
//           padding: TRACK_SIZE * 0.015,
//         },
//       ]}
//     >
//       <Animated.View
//         style={[
//           { width: thumbSize, height: thumbSize, borderRadius: thumbSize },
//           styles.sliderThumb,
//           {
//             transform: [{ translateX: panX }],
//           },
//         ]}
//         {...panResponder.panHandlers}
//       >
//         <Ionicons name="arrow-forward" size={thumbSize * 0.45} />
//       </Animated.View>

//       <Animated.Text
//         style={[
//           styles.loginText,
//           {
//             fontSize: TRACK_SIZE * 0.05,
//             opacity: panX.interpolate({
//               inputRange: [0, TRACK_SIZE * 0.5],
//               outputRange: [1, 0],
//               extrapolate: 'clamp',
//             }),
//           },
//         ]}
//       >
//         {`Slide right to ${type}`}
//       </Animated.Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   slideBar: {
//     width: '100%',
//     height: 60,
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderRadius: 50,
//     overflow: 'hidden',
//     backgroundColor: COLORS.btnColor,
//   },
//   sliderThumb: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     zIndex: 20,
//     backgroundColor: '#fff',
//   },
//   loginText: {
//     marginLeft: 12,
//     color: '#fff',
//     fontFamily: FONT.PoppinsRegular,
//     marginBottom: -6,
//   },
// });

import {
  View,
  Text,
  StyleSheet,
  PanResponder,
  Dimensions,
  Animated,
  Modal,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, { useRef, useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from '../../constants/colors';
import { FONT } from '../../constants/font';

const { width } = Dimensions.get('window');

const TRACK_SIZE = width - 62;
const thumbSize = TRACK_SIZE * 0.15;

export default function SlideToCheckInOut({
  onComplete,
  onConfirmCheck,
  type,
}) {
  const panX = useRef(new Animated.Value(0)).current;
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [actionCompleted, setActionCompleted] = useState(false);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => !actionCompleted,
      onStartShouldSetPanResponderCapture: () => !actionCompleted,
      onPanResponderMove: (_, gestureState) => {
        if (
          !actionCompleted &&
          gestureState.dx >= 0 &&
          gestureState.dx <= TRACK_SIZE - thumbSize
        ) {
          panX.setValue(gestureState.dx);
        }
      },
      onPanResponderRelease: async (_, gestureState) => {
        if (actionCompleted) return;

        if (gestureState.dx > TRACK_SIZE * 0.6) {
          Animated.timing(panX, {
            toValue: TRACK_SIZE - thumbSize,
            duration: 200,
            useNativeDriver: false,
          }).start(() => {
            setShowConfirmation(true);
          });
        } else {
          Animated.spring(panX, {
            toValue: 0,
            useNativeDriver: false,
          }).start();
        }
      },
    }),
  ).current;

  const handleConfirm = async () => {
    try {
      await AsyncStorage.setItem('slideToken', 'USER_CHECKEDIN');
      onConfirmCheck(type);
      setActionCompleted(true);
      setShowConfirmation(false);
      onComplete();

      // Reset slider after 2 seconds
      setTimeout(() => {
        Animated.spring(panX, {
          toValue: 0,
          useNativeDriver: false,
        }).start();
        setActionCompleted(false);
      }, 2000);
    } catch (err) {
      console.warn('Failed to save onboarding token', err);
      Alert.alert('Error', 'Failed to save attendance record');
    }
  };

  const handleCancel = () => {
    setShowConfirmation(false);
    Animated.spring(panX, {
      toValue: 0,
      useNativeDriver: false,
    }).start();
  };

  return (
    <>
      <View
        style={[
          styles.slideBar,
          {
            padding: TRACK_SIZE * 0.015,
            opacity: actionCompleted ? 0.6 : 1,
          },
        ]}
      >
        <Animated.View
          style={[
            { width: thumbSize, height: thumbSize, borderRadius: thumbSize },
            styles.sliderThumb,
            {
              transform: [{ translateX: panX }],
              backgroundColor: actionCompleted ? '#ccc' : '#fff',
            },
          ]}
          {...panResponder.panHandlers}
        >
          <Ionicons
            name="arrow-forward"
            size={thumbSize * 0.45}
            color={actionCompleted ? '#666' : '#000'}
          />
        </Animated.View>

        <Animated.Text
          style={[
            styles.loginText,
            {
              fontSize: TRACK_SIZE * 0.05,
              opacity: panX.interpolate({
                inputRange: [0, TRACK_SIZE * 0.5],
                outputRange: [1, 0],
                extrapolate: 'clamp',
              }),
            },
          ]}
        >
          {actionCompleted
            ? type === 'checkIn'
              ? 'Checked In Successfully'
              : 'Checked Out Successfully'
            : `Slide right to ${type}`}
        </Animated.Text>
      </View>

      {/* Confirmation Dialog */}
      <Modal
        visible={showConfirmation}
        transparent
        animationType="fade"
        onRequestClose={handleCancel}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.confirmationDialog}>
            <Text style={styles.confirmationTitle}>
              Confirm {type === 'checkIn' ? 'Check-In' : 'Check-Out'}
            </Text>
            <Text style={styles.confirmationMessage}>
              {type === 'checkIn'
                ? 'Are you sure you want to check in now?'
                : 'Are you sure you want to check out now?'}
            </Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={handleCancel}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.confirmButton]}
                onPress={handleConfirm}
              >
                <Text style={styles.buttonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  slideBar: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 50,
    overflow: 'hidden',
    backgroundColor: COLORS.btnColor,
  },
  sliderThumb: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 20,
  },
  loginText: {
    marginLeft: 12,
    color: '#fff',
    fontFamily: FONT.PoppinsRegular,
    marginBottom: -6,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmationDialog: {
    width: '70%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  confirmationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: FONT.PoppinsSemiBold,
  },
  confirmationMessage: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: FONT.PoppinsRegular,
    color: '#555',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    minWidth: 100,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#e0e0e0',
  },
  confirmButton: {
    backgroundColor: COLORS.btnColor,
  },
  buttonText: {
    color: 'white',
    fontFamily: FONT.PoppinsMedium,
    marginBottom: -4,
  },
});
