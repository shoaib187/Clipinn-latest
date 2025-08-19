import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {COLORS} from '../../../../components/constants/colors';
import {FONT} from '../../../../components/constants/font';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DateFilteration from '../../../common/dateFilteration/dateFilteration';

const AttendanceDetails = () => {
  // Sample attendance data
  const allAttendanceData = [
    {
      date: '2023-06-01',
      status: 'Present',
      checkIn: '09:00',
      checkOut: '18:00',
    },
    {
      date: '2023-06-02',
      status: 'Present',
      checkIn: '09:05',
      checkOut: '17:55',
    },
    {date: '2023-06-03', status: 'Weekend', checkIn: '-', checkOut: '-'},
    {date: '2023-06-04', status: 'Weekend', checkIn: '-', checkOut: '-'},
    {
      date: '2023-06-05',
      status: 'Present',
      checkIn: '08:55',
      checkOut: '18:10',
    },
    {date: '2023-06-06', status: 'Absent', checkIn: '-', checkOut: '-'},
    {
      date: '2023-06-07',
      status: 'Present',
      checkIn: '09:10',
      checkOut: '17:50',
    },
    {
      date: '2023-05-15',
      status: 'Present',
      checkIn: '08:45',
      checkOut: '17:55',
    },
    {
      date: '2023-05-16',
      status: 'Present',
      checkIn: '09:00',
      checkOut: '18:05',
    },
    {
      date: '2023-07-10',
      status: 'Present',
      checkIn: '09:20',
      checkOut: '18:15',
    },
    {
      date: '2024-07-10',
      status: 'Present',
      checkIn: '09:20',
      checkOut: '18:15',
    },
    {date: '2024-07-12', status: 'Late', checkIn: '10:30', checkOut: '19:00'},
    {date: '2025-07-12', status: 'Late', checkIn: '10:30', checkOut: '19:00'},
    {date: '2025-07-11', status: 'Late', checkIn: '10:30', checkOut: '19:00'},
  ];
  const [filteredData, setFilteredData] = useState(allAttendanceData);
  const [filterType, setFilterType] = useState('all');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  // Available years in the data
  const availableYears = [
    ...new Set(
      allAttendanceData.map(item => parseInt(item.date.split('-')[0])),
    ),
  ].sort((a, b) => b - a);

  // Available months
  const months = [
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

  // Filter attendance based on selected filter type
  const applyFilter = () => {
    let filtered = [...allAttendanceData];

    if (filterType === 'day') {
      const dayStr = selectedDate.toISOString().split('T')[0];
      filtered = filtered.filter(item => item.date === dayStr);
    } else if (filterType === 'month') {
      filtered = filtered.filter(item => {
        const [year, month] = item.date.split('-');
        return (
          parseInt(year) === selectedYear && parseInt(month) === selectedMonth
        );
      });
    } else if (filterType === 'year') {
      filtered = filtered.filter(item => {
        const [year] = item.date.split('-');
        return parseInt(year) === selectedYear;
      });
    }

    setFilteredData(filtered);
    setShowFilterModal(false);
  };

  // Reset all filters
  const resetFilters = () => {
    setFilteredData(allAttendanceData);
    setFilterType('all');
    setShowFilterModal(false);
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.screenContainer}>
      {/* Filter Button */}
      <View style={styles.filterHeader}>
        <Text style={styles.sectionTitle}>Attendance Records</Text>
        <TouchableOpacity
          onPress={() => setShowFilterModal(true)}
          style={styles.filterBadge}>
          <MaterialIcons name="filter-list" size={20} color={COLORS.primary} />
          <Text style={styles.filterBadgeText}>
            {filterType === 'all'
              ? 'All'
              : filterType === 'day'
              ? selectedDate.toDateString()
              : filterType === 'month'
              ? `${months[selectedMonth - 1]} ${selectedYear}`
              : selectedYear}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Attendance List */}
      <View style={styles.section}>
        {filteredData.length > 0 ? (
          filteredData.map((item, index) => (
            <View key={index} style={styles.attendanceItem}>
              <Text style={styles.attendanceDate}>{item.date}</Text>
              <View style={styles.attendanceStatusContainer}>
                <Text
                  style={[
                    styles.attendanceStatus,
                    item.status === 'Present'
                      ? styles.presentStatus
                      : item.status === 'Late'
                      ? styles.lateStatus
                      : item.status === 'Weekend'
                      ? styles.weekendStatus
                      : styles.absentStatus,
                  ]}>
                  {item.status}
                </Text>
                <View style={styles.timeContainer}>
                  <Text style={styles.timeText}>In: {item.checkIn}</Text>
                  <Text style={styles.timeText}>Out: {item.checkOut}</Text>
                </View>
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.noRecordsText}>No attendance records found</Text>
        )}
      </View>

      {/* Filter Modal */}
      <Modal
        visible={showFilterModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowFilterModal(false)}>
        <View style={styles.modalContainer}>
          <DateFilteration
            filterType={filterType}
            setFilterType={setFilterType}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            selectedMonth={selectedMonth}
            setSelectedMonth={setSelectedMonth}
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
            availableYears={availableYears}
            months={months}
            applyFilter={applyFilter}
            resetFilters={resetFilters}
            showDatePicker={showDatePicker}
            setShowDatePicker={setShowDatePicker}
          />
        </View>
      </Modal>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  filterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 14,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  filterBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eee',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 35,
  },
  filterBadgeText: {
    marginLeft: 5,
    fontSize: 14,
    color: COLORS.primary,
  },
  section: {
    marginVertical: 6,
    paddingHorizontal: 14,
    paddingVertical: 20,
    backgroundColor: COLORS.whiteColor,
    borderRadius: 12,
    marginHorizontal: 14,
    marginBottom: 14,
  },
  attendanceItem: {
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  attendanceDate: {
    fontSize: 16,
    fontFamily: FONT.PoppinsMedium,
    marginBottom: 5,
  },
  attendanceStatusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  attendanceStatus: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
    fontSize: 14,
    fontFamily: FONT.PoppinsMedium,
  },
  presentStatus: {
    backgroundColor: '#e6f7ee',
    color: '#00a854',
  },
  lateStatus: {
    backgroundColor: '#fff7e6',
    color: '#fa8c16',
  },
  weekendStatus: {
    backgroundColor: '#f0f0f0',
    color: '#888',
  },
  absentStatus: {
    backgroundColor: '#fff1f0',
    color: '#f5222d',
  },
  timeContainer: {
    flexDirection: 'row',
    gap: 15,
  },
  timeText: {
    fontSize: 14,
    color: '#666',
  },
  noRecordsText: {
    textAlign: 'center',
    color: COLORS.paraColor,
    fontFamily: FONT.PoppinsRegular,
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});

export default AttendanceDetails;
