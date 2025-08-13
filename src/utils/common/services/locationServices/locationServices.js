import {Alert} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {checkLocationPermission, haversineDistance} from './locationUtils';

export const OFFICE_LOCATION = {
  // latitude: 30.33641 + 0.000008983, // +1m north
  // longitude: 71.95182166666667,
  latitude: 30.336418333333334,
  longitude: 71.95182871133332,
};

export const getCurrentLocation = async () => {
  try {
    const hasPerm = await checkLocationPermission();
    if (!hasPerm) {
      return new Promise((_, reject) => {
        Alert.alert(
          'Permission Required',
          'Location permission is required to continue',
          [
            {
              text: 'OK',
              onPress: () =>
                reject(new Error('Location permission not granted')),
            },
          ],
        );
      });
    }

    // console.log('object');
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        position => {
          const {latitude, longitude, accuracy} = position.coords;
          const dist = haversineDistance(
            latitude,
            longitude,
            OFFICE_LOCATION.latitude,
            OFFICE_LOCATION.longitude,
          );
          resolve({latitude, longitude, accuracy, distance: dist});
        },
        error => {
          console.error('Location error:', error);
          Alert.alert('Location Error', 'Could not get your current location', [
            {text: 'OK', onPress: () => reject(error)},
          ]);
        },
        {enableHighAccuracy: true, timeout: 10000, maximumAge: 0},
      );
    });
  } catch (err) {
    console.error('Location permission error:', err);
    Alert.alert('Error', 'Failed to check location permissions');
    throw err;
  }
};
