import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Calendar } from 'react-native-calendars';
import { COLORS } from '../../../constants/colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { wp } from '../../../constants/responsiveSize';
import { FONT } from '../../../constants/font';

export default function CalendarCard() {
  const today = new Date();
  const currentMonth = today.getMonth() + 1;
  const currentYear = today.getFullYear();

  const [selectedDate, setSelectedDate] = useState(
    today.toISOString().split('T')[0],
  );
  const [month, setMonth] = useState(currentMonth);
  const [year, setYear] = useState(currentYear);

  const statusColors = {
    present: { dot: '#4CAF50', bg: '#E8F5E9', text: '#4CAF50' },
    absent: { dot: '#F44336', bg: '#FFEBEE', text: '#F44336' },
    late: { dot: '#FF9800', bg: '#FFF3E0', text: '#FF9800' },
    'half-day': { dot: '#2196F3', bg: '#E3F2FD', text: '#2196F3' },
    weekend: { dot: '#9E9E9E', bg: '#F5F5F5', text: '#9E9E9E' },
  };

  const attendanceData = {
    [`${currentYear}-${String(currentMonth).padStart(2, '0')}-01`]: {
      status: 'present',
      timeIn: '09:05 AM',
      timeOut: '06:15 PM',
    },
    [`${currentYear}-${String(currentMonth).padStart(2, '0')}-02`]: {
      status: 'late',
      timeIn: '09:45 AM',
      timeOut: '06:10 PM',
    },
    [`${currentYear}-${String(currentMonth).padStart(2, '0')}-03`]: {
      status: 'absent',
    },
    [`${currentYear}-${String(currentMonth).padStart(2, '0')}-04`]: {
      status: 'weekend',
    },
    [`${currentYear}-${String(currentMonth).padStart(2, '0')}-05`]: {
      status: 'weekend',
    },
    [`${currentYear}-${String(currentMonth).padStart(2, '0')}-06`]: {
      status: 'half-day',
      timeIn: '09:00 AM',
      timeOut: '01:30 PM',
    },
    [`${currentYear}-${String(currentMonth).padStart(2, '0')}-07`]: {
      status: 'present',
      timeIn: '08:55 AM',
      timeOut: '06:05 PM',
    },
  };

  const markedDates = {};
  Object.keys(attendanceData).forEach(date => {
    const status = attendanceData[date].status;
    const colors = statusColors[status] || {};

    markedDates[date] = {
      customStyles: {
        container: {
          backgroundColor: colors.bg,
          borderRadius: 8,
        },
        text: {
          color: colors.text,
          fontWeight: 'bold',
        },
      },
      marked: true,
      dotColor: colors.dot,
    };
  });

  if (!markedDates[selectedDate]) {
    markedDates[selectedDate] = {};
  }
  markedDates[selectedDate].customStyles = {
    container: { backgroundColor: COLORS.btnColor, borderRadius: 8 },
    text: { color: '#fff', fontWeight: 'bold' },
  };

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const goToMonth = (newMonth, newYear) => {
    const newDate = `${newYear}-${String(newMonth).padStart(2, '0')}-01`;
    setSelectedDate(newDate);
    setMonth(newMonth);
    setYear(newYear);
  };

  return (
    <View style={styles.calendarContainer}>
      <Calendar
        current={selectedDate}
        onDayPress={day => setSelectedDate(day.dateString)}
        markedDates={markedDates}
        markingType="custom"
        // hideArrows={true}
        onMonthChange={date => {
          setMonth(date.month);
          setYear(date.year);
        }}
        // renderHeader={date => {
        //   const monthNumber = date.getMonth();
        //   const yearNumber = date.getFullYear();
        //   return (
        //     <View style={styles.header}>
        //       {/* <TouchableOpacity
        //         style={styles.arrowButton}
        //         onPress={() => {
        //           const prevMonthDate = new Date(year, month - 2, 1);
        //           goToMonth(
        //             prevMonthDate.getMonth() + 1,
        //             prevMonthDate.getFullYear(),
        //           );
        //         }}
        //       >
        //         <FontAwesome name="angle-double-left" size={18} color="#111" />
        //         <Text style={styles.arrowText}>Prev</Text>
        //       </TouchableOpacity> */}

        //       <Text style={styles.headerText}>
        //         {monthNames[monthNumber]} {yearNumber}
        //       </Text>
        //       {/* <TouchableOpacity
        //         style={styles.arrowButton}
        //         onPress={() => {
        //           const nextMonthDate = new Date(year, month, 1);
        //           goToMonth(
        //             nextMonthDate.getMonth() + 1,
        //             nextMonthDate.getFullYear(),
        //           );
        //         }}
        //       >
        //         <Text style={styles.arrowText}>Next</Text>
        //         <FontAwesome name="angle-double-right" size={18} color="#111" />
        //       </TouchableOpacity> */}
        //     </View>
        //   );
        // }}
        theme={{
          backgroundColor: '#fff',
          calendarBackground: '#fff',
          textSectionTitleColor: COLORS.btnColor,
          todayTextColor: '#3F51B5',
          selectedDayBackgroundColor: COLORS.btnColor,
          selectedDayTextColor: '#fff',
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  calendarContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginHorizontal: 14,
    overflow: 'hidden',
    marginBottom: 12,
    marginTop: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 8,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  headerText: {
    fontSize: wp(4),
    fontFamily: FONT.PoppinsMedium,
    marginBottom: -4,
  },
  arrowButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  arrowText: {
    fontFamily: FONT.PoppinsMedium,
    marginBottom: -4,
  },
});
