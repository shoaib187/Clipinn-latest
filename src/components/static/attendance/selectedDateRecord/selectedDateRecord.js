import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { wp } from '../../../constants/responsiveSize';
import { FONT } from '../../../constants/font';

export default function SelectedDateRecord({ selectedDate, attendanceData }) {
  return (
    <View style={styles.dailyAttendance}>
      <Text style={styles.sectionTitle}>
        {new Date(selectedDate).toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </Text>

      {attendanceData[selectedDate] ? (
        <View style={styles.dailyStats}>
          <View style={styles.statusBadge}>
            <Text
              style={[
                styles.statusText,
                {
                  color:
                    attendanceData[selectedDate].status === 'present'
                      ? '#4CAF50'
                      : attendanceData[selectedDate].status === 'absent'
                      ? '#F44336'
                      : attendanceData[selectedDate].status === 'late'
                      ? '#FF9800'
                      : attendanceData[selectedDate].status === 'half-day'
                      ? '#2196F3'
                      : '#9E9E9E',
                },
              ]}
            >
              {attendanceData[selectedDate].status.toUpperCase()}
            </Text>
          </View>

          {attendanceData[selectedDate].timeIn && (
            <View style={styles.timeRow}>
              <Icon name="login" size={18} color="#757575" />
              <Text style={styles.timeLabel}>Time In:</Text>
              <Text style={styles.timeValue}>
                {attendanceData[selectedDate].timeIn}
              </Text>
            </View>
          )}

          {attendanceData[selectedDate].timeOut && (
            <View style={styles.timeRow}>
              <Icon name="logout" size={18} color="#757575" />
              <Text style={styles.timeLabel}>Time Out:</Text>
              <Text style={styles.timeValue}>
                {attendanceData[selectedDate].timeOut}
              </Text>
            </View>
          )}

          <View style={styles.summaryRow}>
            <Text style={styles.summaryText}>
              {attendanceData[selectedDate].status === 'present'
                ? '9 hours 10 minutes worked'
                : attendanceData[selectedDate].status === 'late'
                ? '8 hours 15 minutes worked'
                : attendanceData[selectedDate].status === 'half-day'
                ? '4 hours 30 minutes worked'
                : attendanceData[selectedDate].status === 'absent'
                ? 'Leave applied'
                : 'Weekend'}
            </Text>
          </View>
        </View>
      ) : (
        <Text style={styles.noDataText}>
          No attendance record for this date
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  dailyAttendance: {
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingVertical: 12,
  },
  sectionTitle: {
    fontSize: wp(4.5),
    fontFamily: FONT.PoppinsSemiBold,
    marginVertical: 8,
  },
  dailyStats: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 14,
    borderWidth: 1,
    borderColor: '#eee',
  },
  statusBadge: {
    alignSelf: 'flex-start',
    marginBottom: 15,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    backgroundColor: '#f5f5f5',
  },
  statusText: {
    fontSize: wp(3.5),
    fontFamily: FONT.PoppinsMedium,
    textTransform: 'capitalize',
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  timeLabel: {
    marginLeft: 10,
    marginRight: 15,
    color: '#757575',
    width: 70,
  },
  timeValue: {
    fontWeight: '500',
    color: '#212121',
  },
  summaryRow: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  summaryText: {
    color: '#757575',
    fontStyle: 'italic',
  },
  noDataText: {
    color: '#9E9E9E',
    textAlign: 'center',
    padding: 20,
  },
  monthlyAttendance: {
    flex: 1,
    paddingHorizontal: 15,
  },
  attendanceList: {
    paddingBottom: 20,
  },

  // check in out
  checkInCard: {
    marginHorizontal: 15,
    marginTop: 10,
    marginBottom: 20,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
  },
  gradientCard: {
    padding: 20,
  },
  checkInTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  checkInBut: {
    backgroundColor: 'white',
    borderRadius: 25,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 15,
  },
  checkInButtonText: {
    color: '#3F51B5',
    fontWeight: 'bold',
    fontSize: 16,
  },

  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  locationText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
    marginLeft: 5,
  },
});
