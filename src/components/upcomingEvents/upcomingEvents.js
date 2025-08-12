import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { FONT } from '../constants/font';
import { wp } from '../constants/responsiveSize';
import { COLORS } from '../constants/colors';

export default function UpcomingEvents() {
  return (
    <View style={styles.eventsContainer}>
      <Text style={styles.sectionTitle}>Upcoming Events</Text>
      <View style={styles.eventCard}>
        <View style={styles.eventDate}>
          <Text style={styles.eventDay}>15</Text>
          <Text style={styles.eventMonth}>JUL</Text>
        </View>
        <View style={styles.eventContent}>
          <Text style={styles.eventTitle}>Quarterly Review Meeting</Text>
          <Text style={styles.eventLocation}>10:00 AM - Conference Room</Text>
        </View>
        <Icon
          name="chevron-right"
          size={26}
          color="#9E9E9E"
          style={{ position: 'absolute', right: 0 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // Upcoming Events
  eventsContainer: {
    // paddingHorizontal: 20,
    marginTop: 20,
  },
  eventCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  eventDate: {
    backgroundColor: COLORS.btnColor,
    width: 50,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  eventDay: {
    color: 'white',
    fontFamily: FONT.PoppinsSemiBold,
    marginBottom: -8,
    fontSize: wp(5),
  },
  eventMonth: {
    color: 'white',
    fontSize: wp(3),
    marginBottom: 4,
  },
  eventTitle: {
    color: '#212121',
    fontFamily: FONT.PoppinsMedium,
    marginBottom: -2,
  },
  eventLocation: {
    color: '#757575',
    fontSize: wp(3.5),
    fontFamily: FONT.PoppinsRegular,
  },
  sectionTitle: {
    fontFamily: FONT.PoppinsSemiBold,
    fontSize: wp(4.5),
  },
});
