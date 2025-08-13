import {getCurrentLocation} from './locationService';
import {Alert} from 'react-native';

export const markAttendance = async (
  currentLocation,
  setLoading,
  setLastStatus,
  setCurrentLocation,
  setDistance,
) => {
  setLoading(true);
  setLastStatus(null);

  try {
    // If no current location, fetch it first
    const locationData = currentLocation
      ? currentLocation
      : await getCurrentLocation();

    // Update state with new location if it was fetched
    if (!currentLocation && locationData) {
      setCurrentLocation({
        latitude: locationData.latitude,
        longitude: locationData.longitude,
        accuracy: locationData.accuracy,
      });
      setDistance(locationData.distance);
    }

    // Check accuracy
    if (locationData.accuracy && locationData.accuracy > 50) {
      setLastStatus({
        ok: false,
        msg: 'Location accuracy too poor. Please try again.',
        dist: locationData.distance,
      });
      setLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      const isWithinRange = locationData.distance <= 100;
      setLastStatus({
        ok: isWithinRange,
        msg: isWithinRange
          ? 'Attendance marked successfully!'
          : 'You must be within office premises',
        dist: locationData.distance,
      });
      setLoading(false);
    }, 1500);
  } catch (err) {
    console.error(err);
    setLastStatus({ok: false, msg: 'Error while marking attendance'});
    setLoading(false);
    Alert.alert(
      'Error',
      err.message || 'Failed to mark attendance. Please try again.',
    );
  }
};
