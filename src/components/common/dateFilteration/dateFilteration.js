import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import {COLORS} from '../../constants/colors';

const DateFilteration = ({
  filterType,
  setFilterType,
  selectedDate,
  setSelectedDate,
  selectedMonth,
  setSelectedMonth,
  selectedYear,
  setSelectedYear,
  availableYears,
  months,
  applyFilter,
  resetFilters,
  showDatePicker,
  setShowDatePicker,
}) => {
  // Handle date change from date picker
  const handleDateChange = (event, date) => {
    setShowDatePicker(false);
    if (date) {
      setSelectedDate(date);
    }
  };

  return (
    <View style={styles.modalContent}>
      <Text style={styles.modalTitle}>Filter Attendance</Text>

      {/* Filter Type Selection */}
      <View style={styles.filterOption}>
        <Text style={styles.filterLabel}>Filter By:</Text>
        <View style={styles.filterButtons}>
          <TouchableOpacity
            style={[
              styles.filterButton,
              filterType === 'all' && styles.activeFilter,
            ]}
            onPress={() => setFilterType('all')}>
            <Text
              style={[
                styles.filterButtonText,
                filterType === 'all' && styles.activeFilterText,
              ]}>
              All
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterButton,
              filterType === 'day' && styles.activeFilter,
            ]}
            onPress={() => setFilterType('day')}>
            <Text
              style={[
                styles.filterButtonText,
                filterType === 'day' && styles.activeFilterText,
              ]}>
              Day
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterButton,
              filterType === 'month' && styles.activeFilter,
            ]}
            onPress={() => setFilterType('month')}>
            <Text
              style={[
                styles.filterButtonText,
                filterType === 'month' && styles.activeFilterText,
              ]}>
              Month
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterButton,
              filterType === 'year' && styles.activeFilter,
            ]}
            onPress={() => setFilterType('year')}>
            <Text
              style={[
                styles.filterButtonText,
                filterType === 'year' && styles.activeFilterText,
              ]}>
              Year
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Date Picker for Day filter */}
      {filterType === 'day' && (
        <View style={styles.filterOption}>
          <Text style={styles.filterLabel}>Select Date:</Text>
          <TouchableOpacity
            style={styles.dateInput}
            onPress={() => setShowDatePicker(true)}>
            <Text>{selectedDate.toDateString()}</Text>
            <MaterialIcons
              name="calendar-today"
              size={20}
              color={COLORS.primary}
            />
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={selectedDate}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}
        </View>
      )}

      {/* Month and Year Selection for Month filter */}
      {filterType === 'month' && (
        <>
          <View style={styles.filterOption}>
            <Text style={styles.filterLabel}>Select Year:</Text>
            <View style={styles.yearList}>
              {availableYears?.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.yearButton,
                    selectedYear === item && styles.activeYearButton,
                  ]}
                  onPress={() => setSelectedYear(item)}>
                  <Text
                    style={[
                      styles.yearButtonText,
                      selectedYear === item && styles.activeYearButtonText,
                    ]}>
                    {item}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <View style={styles.filterOption}>
            <Text style={styles.filterLabel}>Select Month:</Text>
            <View style={styles.monthGrid}>
              {months.map((month, index) => (
                <TouchableOpacity
                  key={month}
                  style={[
                    styles.monthButton,
                    selectedMonth === index + 1 && styles.activeMonthButton,
                  ]}
                  onPress={() => setSelectedMonth(index + 1)}>
                  <Text
                    style={[
                      styles.monthButtonText,
                      selectedMonth === index + 1 &&
                        styles.activeMonthButtonText,
                    ]}>
                    {month.substring(0, 3)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </>
      )}

      {/* Year Selection for Year filter */}
      {filterType === 'year' && (
        <View style={styles.filterOption}>
          <Text style={styles.filterLabel}>Select Year:</Text>
          <View style={styles.yearList}>
            {availableYears?.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.yearButton,
                  selectedYear === item && styles.activeYearButton,
                ]}
                onPress={() => setSelectedYear(item)}>
                <Text
                  style={[
                    styles.yearButtonText,
                    selectedYear === item && styles.activeYearButtonText,
                  ]}>
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {/* Action Buttons */}
      <View style={styles.modalButtons}>
        <TouchableOpacity
          style={[styles.actionButton, styles.resetButton]}
          onPress={resetFilters}>
          <Text style={styles.resetButtonText}>Reset</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.applyButton]}
          onPress={applyFilter}>
          <Text style={styles.applyButtonText}>Apply</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: COLORS.primary,
  },
  filterOption: {
    marginBottom: 15,
  },
  filterLabel: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  filterButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  filterButton: {
    flex: 1,
    marginHorizontal: 4,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  activeFilter: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  filterButtonText: {
    color: '#666',
  },
  activeFilterText: {
    color: '#111',
  },
  dateInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },
  yearList: {
    gap: 12,
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 'auto',
  },
  yearButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  activeYearButton: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  yearButtonText: {
    color: '#666',
  },
  activeYearButtonText: {
    color: '#111',
  },
  monthGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  monthButton: {
    width: '23%',
    marginBottom: 10,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  activeMonthButton: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  monthButtonText: {
    color: '#666',
  },
  activeMonthButtonText: {
    color: '#111',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  resetButton: {
    backgroundColor: '#f0f0f0',
    marginRight: 10,
  },
  resetButtonText: {
    color: '#666',
  },
  applyButton: {
    backgroundColor: COLORS.btnColor,
  },
  applyButtonText: {
    color: '#fff',
  },
});

export default DateFilteration;
