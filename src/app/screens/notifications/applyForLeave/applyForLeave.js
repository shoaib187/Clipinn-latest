import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Animated,
  Platform,
  TextInput,
  Dimensions,
  SafeAreaView,
  StatusBar,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from '@react-native-community/datetimepicker';
import ProfileHeader from '../../../../components/common/profileHeader/profileHeader';
import {COLORS} from '../../../../components/constants/colors';
import {wp} from '../../../../components/constants/responsiveSize';
import DescriptionField from '../../../../components/common/descriptionField/descriptionField';

const ApplyForLeave = ({navigation}) => {
  const [leaveType, setLeaveType] = useState('vacation');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [reason, setReason] = useState('');

  const leaveTypes = [
    {id: 'vacation', label: 'Vacation', icon: 'beach'},
    {id: 'sick', label: 'Sick Leave', icon: 'hospital-box'},
    {id: 'personal', label: 'Personal', icon: 'account-heart-outline'},
    {id: 'bereavement', label: 'Bereavement', icon: 'flower'},
    {id: 'other', label: 'Other', icon: 'dots-horizontal'},
  ];

  const handleSubmit = () => {
    console.log({
      leaveType,
      startDate,
      endDate,
      reason,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ProfileHeader
        onPress={() => navigation.goBack()}
        title={'Apply for Leave'}
      />
      <StatusBar
        backgroundColor={COLORS.black}
        barStyle="light-content"
        animated
      />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        <Animated.View style={[styles.content]}>
          {/* Header with decorative element */}

          {/* Leave Type Selection */}
          <View style={[styles.section, styles.sectionElevated]}>
            <View style={styles.sectionHeader}>
              <Icon
                name="format-list-checks"
                size={20}
                color={COLORS.btnColor}
              />
              <Text style={styles.sectionTitle}>Leave Type</Text>
            </View>
            <View style={styles.leaveTypeContainer}>
              {leaveTypes.map(type => (
                <TouchableOpacity
                  key={type.id}
                  style={[
                    styles.leaveTypeButton,
                    leaveType === type.id && styles.leaveTypeButtonActive,
                  ]}
                  onPress={() => setLeaveType(type.id)}
                  activeOpacity={0.7}>
                  <Icon
                    name={type.icon}
                    size={24}
                    color={leaveType === type.id ? '#fff' : COLORS.btnColor}
                  />
                  <Text
                    style={[
                      styles.leaveTypeText,
                      leaveType === type.id && styles.leaveTypeTextActive,
                    ]}>
                    {type.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Date Selection */}
          <View style={[styles.section, styles.sectionElevated]}>
            <View style={styles.sectionHeader}>
              <Icon name="calendar-range" size={20} color={COLORS.btnColor} />
              <Text style={styles.sectionTitle}>Dates</Text>
            </View>
            <View style={styles.dateContainer}>
              <TouchableOpacity
                style={styles.dateInput}
                onPress={() => setShowStartDatePicker(true)}>
                <FontAwesome name="calendar" size={18} color="#4a6da7" />
                <Text style={styles.dateText}>
                  {startDate.toLocaleDateString()}
                </Text>
                <Icon name="chevron-down" size={20} color="#4a6da7" />
              </TouchableOpacity>

              {/* <View style={styles.dateSeparator}>
                <View style={styles.dateSeparatorLine} />
                <Text style={styles.dateTo}>to</Text>
                <View style={styles.dateSeparatorLine} />
              </View> */}

              <TouchableOpacity
                style={styles.dateInput}
                onPress={() => setShowEndDatePicker(true)}>
                <FontAwesome name="calendar" size={18} color="#4a6da7" />
                <Text style={styles.dateText}>
                  {endDate.toLocaleDateString()}
                </Text>
                <Icon name="chevron-down" size={20} color="#4a6da7" />
              </TouchableOpacity>
            </View>

            {showStartDatePicker && (
              <DateTimePicker
                value={startDate}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={(event, selectedDate) => {
                  setShowStartDatePicker(false);
                  if (selectedDate) {
                    setStartDate(selectedDate);
                  }
                }}
              />
            )}

            {showEndDatePicker && (
              <DateTimePicker
                value={endDate}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={(event, selectedDate) => {
                  setShowEndDatePicker(false);
                  if (selectedDate) {
                    setEndDate(selectedDate);
                  }
                }}
              />
            )}
          </View>

          {/* Reason Input */}
          <View style={[styles.section, styles.sectionElevated]}>
            <View style={styles.sectionHeader}>
              <Icon name="text-box" size={20} color={COLORS.btnColor} />
              <Text style={styles.sectionTitle}>Reason</Text>
            </View>
            <DescriptionField reason={reason} setReason={setReason} />
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmit}
            activeOpacity={0.8}>
            <View style={styles.submitButtonGradient}>
              <Text style={styles.submitButtonText}>Submit Application</Text>
              <Icon
                name="send-check"
                size={20}
                color="#fff"
                style={styles.submitIcon}
              />
            </View>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',
  },
  scrollContainer: {
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  content: {
    flex: 1,
  },
  section: {
    marginBottom: 14,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: wp(4.3),
    fontWeight: '600',
    color: COLORS.btnColor,
    marginLeft: 10,
  },
  leaveTypeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  leaveTypeButton: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
    // marginBottom: 8,
    borderWidth: 1.5,
    backgroundColor: '#f8fafc',
    borderColor: '#e6f0ff',
    gap: 8,
  },
  leaveTypeButtonActive: {
    backgroundColor: COLORS.btnColor,
  },
  leaveTypeText: {
    fontSize: 14,
    // color: COLORS.paraColor,
    fontWeight: '500',
    textAlign: 'center',
  },
  leaveTypeTextActive: {
    color: '#fff',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 4,
  },
  dateInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1.5,
    backgroundColor: '#f8fafc',
    borderColor: '#e6f0ff',
    flex: 1,
    marginHorizontal: 5,
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  dateText: {
    marginLeft: 10,
    marginRight: 15,
    color: '#2c3e50',
    fontSize: wp(3.4),
    flex: 1,
  },
  dateSeparator: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
  },
  dateSeparatorLine: {
    height: 1,
    width: '100%',
    backgroundColor: '#e0e6ed',
    marginVertical: 5,
  },
  dateTo: {
    color: '#90a4ae',
    fontWeight: '600',
    fontSize: 12,
  },

  submitButton: {
    marginTop: 20,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: COLORS.btnColor,
  },
  submitButtonGradient: {
    padding: 18,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  submitIcon: {
    marginLeft: 10,
  },
});

export default ApplyForLeave;
