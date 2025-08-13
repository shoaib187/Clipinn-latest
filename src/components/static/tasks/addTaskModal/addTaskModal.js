import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React from 'react';
import {wp} from '../../../constants/responsiveSize';
import {FONT} from '../../../constants/font';
import {COLORS} from '../../../constants/colors';

export default function AddTaskModal({
  taskModalVisible,
  setTaskModalVisible,
  handleAddTask,
  tasks,
}) {
  const [newTaskTitle, setNewTaskTitle] = React.useState('');
  const [newTaskDescription, setNewTaskDescription] = React.useState('');
  const [newTaskColumn, setNewTaskColumn] = React.useState(1);
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={taskModalVisible}
      onRequestClose={() => setTaskModalVisible(false)}>
      <View style={styles.modalOverlay}>
        <View style={styles.taskModalContainer}>
          <Text style={styles.taskModalTitle}>Add New Task</Text>

          <Text style={styles.inputLabel}>Title</Text>
          <TextInput
            style={styles.input}
            placeholder="Task title"
            value={newTaskTitle}
            onChangeText={setNewTaskTitle}
          />

          <Text style={styles.inputLabel}>Description</Text>
          <TextInput
            style={[styles.input, styles.descriptionInput]}
            placeholder="Task description"
            multiline
            value={newTaskDescription}
            onChangeText={setNewTaskDescription}
          />

          <Text style={styles.inputLabel}>Status</Text>
          <View style={styles.statusSelector}>
            {Object.keys(tasks).map(column => (
              <TouchableOpacity
                key={column}
                style={[
                  styles.statusOption,
                  newTaskColumn === column && styles.selectedStatusOption,
                ]}
                onPress={() => setNewTaskColumn(column)}>
                <Text
                  style={[
                    styles.statusOptionText,
                    newTaskColumn === column && styles.selectedStatusOptionText,
                  ]}>
                  {column}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.taskModalActions}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setTaskModalVisible(false)}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
              <Text style={styles.addButtonText}>Add Task</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  taskModalContainer: {
    width: '92%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
  },
  taskModalTitle: {
    fontSize: wp(6),
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: FONT.PoppinsSemiBold,
  },
  inputLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f5f7fa',
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    fontSize: 15,
  },
  descriptionInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  statusSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statusOption: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 25,
    backgroundColor: '#f5f7fa',
  },
  selectedStatusOption: {
    backgroundColor: COLORS.btnColor,
  },
  statusOptionText: {
    fontSize: wp(3.5),
    color: '#666',
    fontFamily: FONT.PoppinsRegular,
    marginBottom: -4,
  },
  selectedStatusOptionText: {
    color: '#fff',
    fontFamily: FONT.PoppinsRegular,
    marginBottom: -4,
  },
  taskModalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#f5f7fa',
    marginRight: 10,
  },
  cancelButtonText: {
    fontSize: wp(4),
    color: '#666',
    fontWeight: FONT.PoppinsMedium,
  },
  addButton: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: COLORS.btnColor,
  },
  addButtonText: {
    fontSize: wp(4),
    color: '#fff',
    fontFamily: FONT.PoppinsMedium,
    marginBottom: -4,
  },
});
