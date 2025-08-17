import React, {useState} from 'react';
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import {wp} from '../../../constants/responsiveSize';
import {FONT} from '../../../constants/font';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import PrioritySelector from '../../../common/prioritySelector/prioritySelector';
import ColorSelector from '../../../common/colorSelector/colorSelector';
import AssigneeSelector from '../../../common/assigneeSelector/assigneeSelector';
import LabelSelector from '../../../common/labelSelector/labelSelector';
import Button from '../../../common/button/button';

// ---------- Sub-components ----------
const ModalHeader = ({setTaskModalVisible}) => (
  <View style={styles.modalHeader}>
    <Text style={styles.modalTitle}>Create New Task</Text>
    <TouchableOpacity onPress={() => setTaskModalVisible(false)}>
      <Ionicons name="close" size={24} color="#666" />
    </TouchableOpacity>
  </View>
);

const DatePicker = ({date, setDate, showDatePicker, setShowDatePicker}) => {
  const onChangeDate = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) setDate(selectedDate);
  };

  return (
    <View style={styles.inputGroup}>
      <Text style={styles.inputLabel}>Due Date</Text>
      <TouchableOpacity
        style={styles.datePickerButton}
        onPress={() => setShowDatePicker(true)}>
        <Ionicons name="calendar" size={20} color="#666" />
        <Text style={styles.dateText}>{date.toISOString().split('T')[0]}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onChangeDate}
        />
      )}
    </View>
  );
};

const ModalFooter = ({setTaskModalVisible, handleSubmit}) => (
  <View style={styles.modalFooter}>
    <Button
      title={'Cancel'}
      style={styles.cancelButton}
      textStyle={{color: '#111'}}
      onPress={() => setTaskModalVisible(false)}
    />
    <Button
      title={'Create Task'}
      style={styles.submitButton}
      onPress={handleSubmit}
    />
  </View>
);

// ---------- Main Component ----------
export default function AddTaskModal({
  taskModalVisible,
  setTaskModalVisible,
  newTaskTitle,
  setNewTaskTitle,
  newTaskDescription,
  setNewTaskDescription,
  handleAddTask,
}) {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState('Medium');
  const [selectedLabel, setSelectedLabel] = useState('Development');
  const [selectedColor, setSelectedColor] = useState('#5E8BFF');
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showEmployeeList, setShowEmployeeList] = useState(false);

  const handleSubmit = () => {
    if (!newTaskTitle.trim()) {
      Alert.alert('Validation Error', 'Task title cannot be empty.');
      return;
    }

    const newTask = {
      id: Date.now().toString(),
      title: newTaskTitle.trim(),
      description: newTaskDescription.trim(),
      dueDate: date.toISOString().split('T')[0],
      priority: selectedPriority,
      label: selectedLabel,
      color: selectedColor,
      assignedTo: selectedEmployee
        ? {id: selectedEmployee.id, name: selectedEmployee.name}
        : null,
    };
    console.log('new task', newTask);

    handleAddTask(newTask);
    resetForm();
  };

  const resetForm = () => {
    setNewTaskTitle('');
    setNewTaskDescription('');
    setDate(new Date());
    setSelectedPriority('Medium');
    setSelectedLabel('Development');
    setSelectedColor('#5E8BFF');
    setSelectedEmployee(null);
    setTaskModalVisible(false);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={taskModalVisible}
      onRequestClose={() => setTaskModalVisible(false)}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <ModalHeader setTaskModalVisible={setTaskModalVisible} />
          <ScrollView contentContainerStyle={styles.scrollContent}>
            {/* Title */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Task Title</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter task title"
                placeholderTextColor="#999"
                value={newTaskTitle}
                onChangeText={setNewTaskTitle}
              />
            </View>

            {/* Description */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Description</Text>
              <TextInput
                style={[styles.input, styles.descriptionInput]}
                placeholder="Enter task description"
                placeholderTextColor="#999"
                multiline
                value={newTaskDescription}
                onChangeText={setNewTaskDescription}
              />
            </View>

            {/* Date Picker */}
            <DatePicker
              date={date}
              setDate={setDate}
              showDatePicker={showDatePicker}
              setShowDatePicker={setShowDatePicker}
            />

            {/* Selectors */}
            <PrioritySelector
              selectedPriority={selectedPriority}
              setSelectedPriority={setSelectedPriority}
            />

            <LabelSelector
              selectedLabel={selectedLabel}
              setSelectedLabel={setSelectedLabel}
            />

            <ColorSelector
              selectedColor={selectedColor}
              setSelectedColor={setSelectedColor}
            />

            <AssigneeSelector
              selectedEmployee={selectedEmployee}
              setSelectedEmployee={setSelectedEmployee}
              showEmployeeList={showEmployeeList}
              setShowEmployeeList={setShowEmployeeList}
            />
          </ScrollView>

          <ModalFooter
            setTaskModalVisible={setTaskModalVisible}
            handleSubmit={handleSubmit}
          />
        </View>
      </View>
    </Modal>
  );
}

// ---------- Styles ----------
const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingHorizontal: 14,
    maxHeight: '100%',
  },
  scrollContent: {
    paddingBottom: 12,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  modalTitle: {
    fontSize: wp(5),
    fontFamily: FONT.PoppinsSemiBold,
    color: '#333',
  },
  inputGroup: {
    marginBottom: 12,
  },
  inputLabel: {
    fontSize: wp(4),
    fontFamily: FONT.PoppinsMedium,
    color: '#555',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    fontSize: wp(4),
    color: '#333',
    height: 45,
    paddingHorizontal: 12,
  },
  descriptionInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  datePickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    padding: 15,
  },
  dateText: {
    marginLeft: 10,
    fontSize: wp(4),
    fontFamily: FONT.PoppinsRegular,
    color: '#333',
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  cancelButton: {
    flex: 1,
    padding: 15,
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: '#f8f9fa',
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#eee',
  },
  submitButton: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
});
