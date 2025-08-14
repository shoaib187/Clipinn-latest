import React, {useRef, useMemo, useCallback} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
} from 'react-native';
import BottomSheetModal, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import SlideToCheckInOut from '../sliderToCheckInOut/slideToCheckInOut';
import {COLORS} from '../../constants/colors';
import {wp} from '../../constants/responsiveSize';
import {FONT} from '../../constants/font';

const FloatingBottomSheet = React.forwardRef(
  (
    {sheetType, onConfirmCheck, handleCheckInComplete, handleCheckOutComplete},
    ref,
  ) => {
    const snapPoints = useMemo(() => ['30%'], []);

    const renderBackdrop = useCallback(
      props => <BottomSheetBackdrop {...props} />,
      [],
    );

    return (
      <BottomSheetModal
        ref={ref}
        index={-1} // initial closed state
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        enablePanDownToClose={true}>
        <View style={styles.bottomSheetView}>
          <TouchableOpacity style={styles.closeBtn}>
            {/* Ionicons close */}
          </TouchableOpacity>

          <Text style={styles.sheetTitle}>
            {sheetType === 'checkIn'
              ? 'Ready to Check In?'
              : 'Ready to Check Out?'}
          </Text>
          <Text style={styles.sheetSubtitle}>
            {sheetType === 'checkIn'
              ? 'You’re about to mark your attendance for today.'
              : 'You’re about to end your workday.'}
          </Text>
          <Text style={styles.sheetInfo}>
            {sheetType === 'checkIn' ? (
              <>
                Once confirmed, your work hours will start counting from{' '}
                <Text style={{color: 'red'}}>09:00 AM</Text>.
              </>
            ) : (
              <>Once confirmed, your total worked hours will be calculated.</>
            )}
          </Text>
          <View style={styles.policyBox}>
            {/* Info Icon */}
            <Text style={styles.policyText}>
              {sheetType === 'checkIn'
                ? 'Make sure you’re at the workplace location before checking in.'
                : 'Ensure all your tasks are completed before checking out.'}
            </Text>
          </View>

          <SlideToCheckInOut
            type={sheetType}
            onConfirmCheck={onConfirmCheck}
            onComplete={
              sheetType === 'checkIn'
                ? handleCheckInComplete
                : handleCheckOutComplete
            }
          />
        </View>
      </BottomSheetModal>
    );
  },
);

// Usage:

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 14,
  },
  greeting: {
    fontSize: wp(4),
    color: '#777',
  },
  name: {
    fontSize: wp(6),
    marginBottom: -4,
    fontFamily: FONT.PoppinsSemiBold,
    color: '#fff',
  },
  profileImage: {
    width: wp(12),
    height: wp(12),
    borderRadius: wp(20),
    borderWidth: 2,
    borderColor: COLORS.slateColor,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 24,
  },
  timeAlign: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 30,
    backgroundColor: '#fff',
    borderRadius: 8,
    position: 'relative',
    // marginTop: 12,
  },
  time: {
    fontFamily: FONT.PoppinsSemiBold,
    fontSize: wp(10),
    marginBottom: -10,
  },
  date: {
    fontFamily: FONT.PoppinsRegular,
    fontSize: wp(4),
    color: COLORS.paraColor,
    marginBottom: wp(14),
  },
  checkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  checkCard: {
    flex: 0.3,
    // backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  checkTime: {
    fontFamily: FONT.PoppinsMedium,
    marginVertical: 6,
  },
  checkLabel: {
    fontFamily: FONT.PoppinsRegular,
  },
  backdrop: {
    position: 'absolute',
    top: StatusBar.currentHeight || 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.black,
    // zIndex: 1,
    // justifyContent: 'center',
    paddingHorizontal: 14,
  },
  historyButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  historyButtonText: {
    fontFamily: FONT.PoppinsMedium,
    color: COLORS.btnColor,
  },
  bottomSheetView: {
    position: 'relative',
  },
  closeBtn: {
    width: wp(10),
    height: wp(10),
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: -10,
    right: -10,
    zIndex: 111,
  },

  // sheet styles
  sheetTitle: {
    fontSize: wp(5),
    marginBottom: 12,
    textAlign: 'center',
    fontFamily: FONT.PoppinsMedium,
  },
  sheetSubtitle: {
    fontSize: wp(4),
    color: COLORS.btnColor,
    textAlign: 'center',
    marginBottom: 4,
    fontFamily: FONT.PoppinsRegular,
  },
  sheetInfo: {
    fontSize: wp(4),
    color: COLORS.paraColor,
    textAlign: 'center',
    marginBottom: 14,
  },
  policyBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ecf6fc',
    padding: 8,
    borderRadius: 6,
    marginBottom: 16,
  },
  policyText: {
    flex: 1,
    fontSize: wp(3.5),
    color: '#2980b9',
    marginLeft: 6,
    fontFamily: FONT.PoppinsRegular,
    lineHeight: 18,
  },

  handle: {
    paddingTop: 10,
    paddingBottom: 5,
    alignItems: 'center',
  },
  handleIndicator: {
    width: 40,
    height: 5,
    backgroundColor: '#ccc',
    borderRadius: 3,
  },

  floatingContainer: {
    marginHorizontal: 16,
    marginBottom: 20, // Space from the bottom of the screen
    overflow: 'visible',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
  },
  bottomSheetBackground: {
    borderRadius: 16,
    backgroundColor: '#fff',
  },
  bottomSheetContent: {
    padding: 20,
    paddingBottom: 10, // Adjust if using footer
  },
  footer: {
    height: 20, // Extra bottom padding inside sheet
    backgroundColor: 'transparent',
  },
});

export {FloatingBottomSheet};
