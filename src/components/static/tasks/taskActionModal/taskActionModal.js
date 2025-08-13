import {View, Text, Modal, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function TaskActionModal({
  modalVisible,
  setModalVisible,
  selectedTask,
  handleTaskAction,
  tasks,
}) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.modalCloseButton}
            onPress={() => setModalVisible(false)}>
            <AntDesign name="close" size={24} color="#999" />
          </TouchableOpacity>

          {selectedTask && (
            <>
              <Text style={styles.modalTitle}>{selectedTask.title}</Text>
              <Text style={styles.modalDescription}>
                {selectedTask.description}
              </Text>

              <View style={styles.modalInfoRow}>
                <Feather name="user" size={18} color="#666" />
                <Text style={styles.modalInfoText}>
                  Assigned to {selectedTask.assignedTo}
                </Text>
              </View>

              <View style={styles.modalInfoRow}>
                <Feather name="calendar" size={18} color="#666" />
                <Text style={styles.modalInfoText}>
                  Due on {selectedTask.deadline}
                </Text>
              </View>

              <View style={styles.modalActions}>
                <TouchableOpacity
                  style={styles.modalActionButton}
                  onPress={() => {
                    // Implement edit functionality
                    setModalVisible(false);
                  }}>
                  <FontAwesome name="pencil" size={18} color="#2575fc" />
                  <Text style={styles.modalActionText}>Edit</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.modalActionButton}
                  onPress={() => {
                    // Find which column the task is in
                    const taskColumn = Object.keys(tasks).find(key =>
                      tasks[key].some(t => t.id === selectedTask.id),
                    );
                    if (taskColumn) {
                      handleTaskAction('move', selectedTask.id, taskColumn);
                    }
                    setModalVisible(false);
                  }}>
                  <Feather name="arrow-right" size={18} color="#4CAF50" />
                  <Text style={styles.modalActionText}>Move</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.modalActionButton}
                  onPress={() => {
                    // Find which column the task is in
                    const taskColumn = Object.keys(tasks).find(key =>
                      tasks[key].some(t => t.id === selectedTask.id),
                    );
                    if (taskColumn) {
                      handleTaskAction('delete', selectedTask.id, taskColumn);
                    }
                    setModalVisible(false);
                  }}>
                  <Feather name="trash-2" size={18} color="#F44336" />
                  <Text style={styles.modalActionText}>Delete</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.modalActionButton}
                  onPress={() => {
                    // Implement view members functionality
                    setModalVisible(false);
                  }}>
                  <Feather name="users" size={18} color="#FF9800" />
                  <Text style={styles.modalActionText}>Members</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
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
});
