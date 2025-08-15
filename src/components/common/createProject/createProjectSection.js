import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
} from 'react-native';

import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import DateTimePicker from '@react-native-community/datetimepicker';
import {formatDate} from '../../../utils/common/services/services';
import {wp} from '../../constants/responsiveSize';

export default function CreateProjectSection({
  projectName,
  setProjectName,
  description,
  setDescription,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  priority,
  setPriority,
}) {
  // const [projectName, setProjectName] = useState('');
  // const [description, setDescription] = useState('');
  // const [startDate, setStartDate] = useState(new Date());
  // const [endDate, setEndDate] = useState(new Date());
  // const [priority, setPriority] = useState('medium');
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Project Details</Text>
      {/* Project Name */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Project Name</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter project name"
            placeholderTextColor="#A0AEC0"
            value={projectName}
            onChangeText={setProjectName}
            autoFocus
          />
          <Feather
            name="edit-2"
            size={18}
            color="#A0AEC0"
            style={styles.inputIcon}
          />
        </View>
      </View>

      {/* Description */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Description</Text>
        <View style={[styles.inputContainer, {height: 100}]}>
          <TextInput
            style={[styles.input, {height: 90, textAlignVertical: 'top'}]}
            placeholder="Describe your project..."
            placeholderTextColor="#A0AEC0"
            multiline
            value={description}
            onChangeText={setDescription}
          />
          <Feather
            name="align-left"
            size={18}
            color="#A0AEC0"
            style={[styles.inputIcon, {top: 15}]}
          />
        </View>
      </View>

      {/* Dates */}
      <View style={styles.datesContainer}>
        {/* Start Date */}
        <View style={[styles.formGroup, {flex: 1, marginRight: 10}]}>
          <Text style={styles.label}>Start Date</Text>
          <TouchableOpacity
            style={styles.datePickerContainer}
            onPress={() => setShowStartDatePicker(true)}>
            <View style={styles.dateContent}>
              <Feather name="calendar" size={20} color="#4A90E2" />
              <Text style={styles.dateText}>{formatDate(startDate)}</Text>
            </View>
          </TouchableOpacity>
          {showStartDatePicker && (
            <DateTimePicker
              value={startDate}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setShowStartDatePicker(Platform.OS === 'ios');
                setStartDate(selectedDate || startDate);
              }}
            />
          )}
        </View>

        {/* End Date */}
        <View style={[styles.formGroup, {flex: 1}]}>
          <Text style={styles.label}>End Date</Text>
          <TouchableOpacity
            style={styles.datePickerContainer}
            onPress={() => setShowEndDatePicker(true)}>
            <View style={styles.dateContent}>
              <Feather name="calendar" size={20} color="#4A90E2" />
              <Text style={styles.dateText}>{formatDate(endDate)}</Text>
            </View>
          </TouchableOpacity>
          {showEndDatePicker && (
            <DateTimePicker
              value={endDate}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setShowEndDatePicker(Platform.OS === 'ios');
                setEndDate(selectedDate || endDate);
              }}
              minimumDate={startDate}
            />
          )}
        </View>
      </View>

      {/* Priority */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Priority</Text>
        <View style={styles.priorityContainer}>
          {['high', 'medium', 'low'].map(level => (
            <TouchableOpacity
              key={level}
              style={[
                styles.priorityButton,
                priority === level && styles[`${level}PriorityActive`],
              ]}
              onPress={() => setPriority(level)}>
              <MaterialIcons
                name={
                  level === 'high'
                    ? 'keyboard-arrow-up'
                    : level === 'low'
                    ? 'keyboard-arrow-down'
                    : 'remove'
                }
                size={20}
                color={priority === level ? '#fff' : '#A0AEC0'}
              />
              <Text
                style={[
                  styles.priorityText,
                  priority === level && styles.priorityTextActive,
                ]}>
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 3,
    // elevation: 1,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3748',
  },
  formGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#718096',
    marginBottom: 8,
  },
  inputContainer: {
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 45,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    fontSize: wp(3.7),
    color: '#2D3748',
    paddingRight: 12,
  },
  inputIcon: {
    position: 'absolute',
    right: 12,
  },
  datesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  datePickerContainer: {
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  dateContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 15,
    color: '#2D3748',
    marginLeft: 10,
  },
  priorityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  priorityButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#F8FAFC',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  priorityText: {
    fontSize: 14,
    color: '#718096',
    marginLeft: 5,
    fontWeight: '500',
  },
  priorityTextActive: {
    color: '#fff',
  },
  highPriorityActive: {
    backgroundColor: '#F56565',
    borderColor: '#F56565',
  },
  mediumPriorityActive: {
    backgroundColor: '#4A90E2',
    borderColor: '#4A90E2',
  },
  lowPriorityActive: {
    backgroundColor: '#48BB78',
    borderColor: '#48BB78',
  },
});
