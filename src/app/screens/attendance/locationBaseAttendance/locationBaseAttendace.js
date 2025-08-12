import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Platform,
  Image,
  Dimensions,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import RBSheet from 'react-native-raw-bottom-sheet';

const {width} = Dimensions.get('window');
const OFFICE_LOCATION = {latitude: 31.5204, longitude: 74.3587}; // example (Lahore)

function haversineDistance(lat1, lon1, lat2, lon2) {
  const toRad = v => (v * Math.PI) / 180;
  const R = 6371000; // metres
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export default function LocationBaseAttendance({user}) {
  const [loading, setLoading] = useState(false);
  const [lastStatus, setLastStatus] = useState(null);
  const bottomSheetRef = useRef(null);

  const checkLocationPermission = async () => {
    const perm = Platform.select({
      android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
    });
    let status = await check(perm);
    if (status === RESULTS.DENIED) status = await request(perm);
    return status === RESULTS.GRANTED || status === RESULTS.LIMITED;
  };

  const markAttendance = async () => {
    setLoading(true);
    setLastStatus(null);

    try {
      const hasPerm = await checkLocationPermission();
      if (!hasPerm) {
        Alert.alert(
          'Permission required',
          'Location permission is required to mark attendance.',
        );
        setLoading(false);
        return;
      }

      Geolocation.getCurrentPosition(
        async position => {
          const {latitude, longitude, accuracy} = position.coords;

          if (accuracy && accuracy > 50) {
            setLastStatus({
              ok: false,
              msg: 'Location accuracy too poor. Please try again.',
            });
            setLoading(false);
            return;
          }

          const dist = haversineDistance(
            latitude,
            longitude,
            OFFICE_LOCATION.latitude,
            OFFICE_LOCATION.longitude,
          );

          // Simulate API call
          setTimeout(() => {
            setLastStatus({
              ok: dist <= 100, // Within 100m radius
              msg:
                dist <= 100
                  ? 'Attendance marked successfully!'
                  : 'You must be within office premises',
              dist,
            });
            setLoading(false);
          }, 1500);
        },
        error => {
          console.error(error);
          setLastStatus({ok: false, msg: 'Failed to get location'});
          setLoading(false);
        },
        {enableHighAccuracy: true, timeout: 10000, maximumAge: 0},
      );
    } catch (err) {
      console.error(err);
      setLastStatus({ok: false, msg: 'Error while marking attendance'});
      setLoading(false);
    }
  };

  const openBottomSheet = () => {
    bottomSheetRef.current.open();
  };

  return (
    <View style={styles.container}>
      {/* Map View Placeholder */}
      <View style={styles.mapPlaceholder}>
        {/* <Image
          source={require('./assets/map-placeholder.png')}
          style={styles.mapImage}
          resizeMode="cover"
        /> */}
        <View style={styles.locationPin} />
      </View>

      {/* Main Button */}
      <TouchableOpacity style={styles.mainButton} onPress={openBottomSheet}>
        <Text style={styles.mainButtonText}>Mark Attendance</Text>
      </TouchableOpacity>

      {/* Bottom Sheet */}
      <RBSheet
        ref={bottomSheetRef}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={300}
        customStyles={{
          container: styles.bottomSheetContainer,
          draggableIcon: styles.draggableIcon,
        }}>
        <View style={styles.bottomSheetContent}>
          <Text style={styles.sheetTitle}>Mark Your Attendance</Text>

          {lastStatus ? (
            <View
              style={[
                styles.statusContainer,
                {backgroundColor: lastStatus.ok ? '#E8F5E9' : '#FFEBEE'},
              ]}>
              <Text
                style={[
                  styles.statusText,
                  {color: lastStatus.ok ? '#2E7D32' : '#C62828'},
                ]}>
                {lastStatus.msg}
              </Text>
              {lastStatus.dist !== undefined && (
                <Text style={styles.distanceText}>
                  Distance: {Math.round(lastStatus.dist)} meters
                </Text>
              )}
            </View>
          ) : (
            <Text style={styles.sheetSubtitle}>
              You must be within 100m of the office to mark attendance
            </Text>
          )}

          <TouchableOpacity
            style={styles.sheetButton}
            onPress={markAttendance}
            disabled={loading}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.sheetButtonText}>
                {lastStatus ? 'Try Again' : 'Mark Now'}
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </RBSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  mapPlaceholder: {
    height: '60%',
    width: '100%',
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
  locationPin: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'red',
    borderWidth: 2,
    borderColor: 'white',
  },
  mainButton: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    backgroundColor: '#3F51B5',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  mainButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  bottomSheetContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
  },
  draggableIcon: {
    backgroundColor: '#BDBDBD',
    width: 40,
  },
  bottomSheetContent: {
    flex: 1,
    paddingTop: 10,
  },
  sheetTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#212121',
  },
  sheetSubtitle: {
    fontSize: 14,
    color: '#616161',
    textAlign: 'center',
    marginBottom: 25,
  },
  sheetButton: {
    backgroundColor: '#3F51B5',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  sheetButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  statusContainer: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  statusText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  distanceText: {
    fontSize: 14,
    color: '#424242',
  },
});
