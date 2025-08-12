import React, { useRef } from 'react';
import { Text, StyleSheet } from 'react-native';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { Easing } from 'react-native-reanimated';

export default function CheckInOutSheet({ children }) {
  const bottomSheetRef = useRef(null);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={['40%']}
      enableContentPanningGesture={false}
      enableHandlePanningGesture={false}
      backgroundStyle={styles.bottomSheetBackground}
      animationConfigs={{ duration: 300, easing: Easing.out(Easing.ease) }}
      backdropComponent={props => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          opacity={0.5}
        />
      )}
    >
      <BottomSheetView style={styles.sheetContent}>
        <Text style={styles.confirmMessage}>
          Are you sure you want to logout?
        </Text>
      </BottomSheetView>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomSheetBackground: {
    borderRadius: 40,
  },
  sheetContent: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 12,
    borderBottomWidth: 1,
  },
  headerTitleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  outerIconCircle: {
    width: 50,
    height: 50,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutIcon: {
    width: 24,
    height: 24,
  },
  logoutText: {
    fontSize: 20,
  },
  closeIcon: {
    tintColor: 'black',
    width: 24,
    height: 24,
  },
  closeButton: {
    borderWidth: 0,
  },
  confirmMessage: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 22,
    marginBottom: 20,
  },
  logoutButton: {
    borderRadius: 50,
  },
  cancelButton: {
    borderRadius: 50,
    marginTop: 12,
    borderWidth: 1,
  },
});
