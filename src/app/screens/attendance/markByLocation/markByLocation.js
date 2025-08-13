import React, {useState, useRef, useEffect, useCallback, useMemo} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE, Circle} from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {markAttendance} from '../../../../utils/markAttendance/api';
import {getCurrentLocation} from '../../../../utils/common/services/locationServices/locationServices';
import {COLORS} from '../../../../components/constants/colors';
import Button from '../../../../components/common/button/button';
import {wp} from '../../../../components/constants/responsiveSize';
import {FONT} from '../../../../components/constants/font';
import BottomContent from '../../../../components/common/bottomContent/bottomContent';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import SlideToCheckInOut from '../../../../components/common/sliderToCheckInOut/slideToCheckInOut';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Office Location Constant
export const OFFICE_LOCATION = {
  latitude: 30.336418333333334,
  longitude: 71.95182871133332,
};

export default function MarkByLocation() {
  const mapRef = useRef(null);
  const bottomSheetRef = useRef(null);
  const pulseAnim = useRef(new Animated.Value(1)).current;

  const [loading, setLoading] = useState(false);
  const [lastStatus, setLastStatus] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [distance, setDistance] = useState(null);
  const [accuracy, setAccuracy] = useState(null);

  // bottom sheets stats
  const [sheetType, setSheetType] = useState(null); // 'checkIn' | 'checkOut'
  const [isCheckedIn, setIsCheckedIn] = useState(false);

  const handleCheckInComplete = async () => {
    bottomSheetRef.current.close();
    console.log('✅ Checked in successfully');
    // API call to mark check-in
  };

  const handleCheckOutComplete = async () => {
    bottomSheetRef.current.close();
    console.log('🚪 Checked out successfully');
    // API call to mark check-out
  };

  const openSheet = type => {
    setSheetType(type);
    bottomSheetRef.current.expand();
  };

  const handleCheck = () => {
    if (isCheckedIn) {
      openSheet('checkOut');
    } else {
      openSheet('checkIn');
    }
  };

  const onConfirmCheck = async type => {
    const today = new Date().toISOString().split('T')[0];
    const status = type === 'checkIn' ? 'checkedIn' : 'checkedOut';

    await AsyncStorage.setItem(
      'attendanceStatus',
      JSON.stringify({date: today, status}),
    );

    if (type === 'checkIn') {
      setIsCheckedIn(true);
    } else if (type === 'checkOut') {
      setIsCheckedIn(false);
    }
  };

  // Pulse animation
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.4,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  // Fetch initial location
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const location = await getCurrentLocation();
        setCurrentLocation(location);
        setDistance(location.distance);
        setAccuracy(location.accuracy);
      } catch (error) {
        console.error('Initial location fetch error:', error);
      }
    };
    fetchLocation();
  }, []);

  const handleMarkAttendance = async () => {
    await markAttendance(
      currentLocation,
      setLoading,
      setLastStatus,
      setCurrentLocation,
      setDistance,
    );
  };

  // Memoized snap points
  const snapPoints = useMemo(() => ['50%'], []);

  // Worklet-friendly backdrop component
  const renderBackdrop = useCallback(
    props => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.5}
      />
    ),
    [],
  );

  return (
    <SafeAreaView style={{flex: 1, paddingTop: StatusBar.currentHeight}}>
      <View style={styles.container}>
        <MapView
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          showsUserLocation
          showsMyLocationButton={false}
          followsUserLocation
          showsCompass
          mapType="standard"
          initialRegion={{
            latitude: OFFICE_LOCATION.latitude,
            longitude: OFFICE_LOCATION.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}>
          {/* Office Marker */}
          <Marker coordinate={OFFICE_LOCATION}>
            <Animated.View
              style={[styles.officeMarker, {transform: [{scale: pulseAnim}]}]}>
              <Icon name="business" size={24} color="#fff" />
            </Animated.View>
          </Marker>

          {/* Office Radius Circle */}
          <Circle
            center={OFFICE_LOCATION}
            radius={100} // ✅ 1 meter radius would be too small visually, so using 100m here
            strokeWidth={2}
            strokeColor={`${COLORS.btnColor}20`}
            fillColor="rgba(75, 108, 183, 0.2)"
          />

          {/* Accuracy Circle */}
          {currentLocation && accuracy && (
            <Circle
              center={currentLocation}
              radius={accuracy}
              strokeWidth={1}
              strokeColor="#FF5252"
              fillColor="rgba(255, 82, 82, 0.2)"
            />
          )}
        </MapView>

        {/* Distance Indicator */}
        {distance !== null && (
          <View style={styles.distanceIndicator}>
            <Icon
              name="location-pin"
              size={20}
              color={distance <= 100 ? '#4CAF50' : '#F44336'}
            />
            <Text style={styles.distanceText}>
              {Math.round(distance)}m from office
              {distance <= 100 ? ' (In Range)' : ' (Out of Range)'}
            </Text>
          </View>
        )}

        {/* Mark Attendance Button */}
        <View style={styles.buttonWrapper}>
          <Button title="Mark Attendance" onPress={handleCheck} />
        </View>

        {/* Bottom Sheet */}
        <BottomSheet
          ref={bottomSheetRef}
          index={-1}
          snapPoints={snapPoints}
          backgroundStyle={styles.bottomSheetBackground}
          enableContentPanningGesture
          enableHandlePanningGesture
          backdropComponent={renderBackdrop}>
          <BottomSheetView style={styles.contentContainer}>
            <BottomContent
              OFFICE_LOCATION={OFFICE_LOCATION}
              accuracy={accuracy}
              currentLocation={currentLocation}
              distance={distance}
              lastStatus={lastStatus}
              sheetType={sheetType}
              isCheckedIn={isCheckedIn}
              setIsCheckedIn={setIsCheckedIn}
            />
            <SlideToCheckInOut
              type={sheetType}
              onComplete={
                sheetType === 'checkIn'
                  ? handleCheckInComplete
                  : handleCheckOutComplete
              }
              onConfirmCheck={onConfirmCheck}
            />
          </BottomSheetView>
        </BottomSheet>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
  map: {flex: 1},
  officeMarker: {
    backgroundColor: COLORS.btnColor,
    borderRadius: 50,
    padding: wp(3.5),
  },
  distanceIndicator: {
    position: 'absolute',
    top: 20,
    backgroundColor: 'white',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
    alignSelf: 'center',
  },
  buttonWrapper: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    width: wp(60),
  },
  distanceText: {
    fontSize: wp(4),
    color: '#424242',
    fontFamily: FONT.PoppinsRegular,
    marginBottom: -4,
  },
  bottomSheetBackground: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  contentContainer: {
    flex: 1,
    padding: 16,
  },
});
