import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React from 'react';

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
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  notificationButton: {
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#F44336',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 15,
    position: 'relative',
  },
  activeTabButton: {
    backgroundColor: '#f8f9fa',
  },
  tabButtonText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  activeTabButtonText: {
    color: '#2575fc',
    fontWeight: '600',
  },
  tabIndicator: {
    position: 'absolute',
    bottom: 0,
    height: 3,
    width: '40%',
    backgroundColor: '#2575fc',
    borderRadius: 3,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
  },
  modalCloseButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    zIndex: 1,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  modalInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  modalInfoText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  modalActionButton: {
    alignItems: 'center',
  },
  modalActionText: {
    fontSize: 12,
    marginTop: 5,
  },
  taskModalContainer: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
  },
  taskModalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
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
    borderRadius: 15,
    backgroundColor: '#f5f7fa',
  },
  selectedStatusOption: {
    backgroundColor: '#2575fc',
  },
  statusOptionText: {
    fontSize: 13,
    color: '#666',
    fontWeight: '500',
  },
  selectedStatusOptionText: {
    color: '#fff',
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
    fontSize: 15,
    color: '#666',
    fontWeight: '500',
  },
  addButton: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#2575fc',
  },
  addButtonText: {
    fontSize: 15,
    color: '#fff',
    fontWeight: '500',
  },
});
