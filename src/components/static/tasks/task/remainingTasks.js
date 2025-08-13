import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Animated,
  Dimensions,
  StyleSheet,
} from 'react-native';
import React from 'react';

import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

const {width} = Dimensions.get('window');

export default function RemainingTasks({
  tasks,
  setNewTaskColumn,
  setTaskModalVisible,
  setSelectedTask,
  setModalVisible,
}) {
  return (
    <View style={styles.tasksTab}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {Object.keys(tasks).map(column => (
          <View key={column} style={styles.column}>
            <View style={styles.columnHeader}>
              <Text style={styles.columnTitle}>{column}</Text>
              <Text style={styles.columnCount}>
                {tasks[column].length} tasks
              </Text>
              <TouchableOpacity
                style={styles.addTaskButton}
                onPress={() => {
                  setNewTaskColumn(column);
                  setTaskModalVisible(true);
                }}>
                <AntDesign name="plus" size={16} color="#2575fc" />
              </TouchableOpacity>
            </View>

            <FlatList
              data={tasks[column]}
              keyExtractor={item => item.id}
              renderItem={({item}) => (
                <Animated.View style={styles.taskCard}>
                  <View style={styles.taskCardHeader}>
                    <Text style={styles.taskTitle}>{item.title}</Text>
                    <TouchableOpacity
                      onPress={() => {
                        setSelectedTask(item);
                        setModalVisible(true);
                      }}>
                      <Feather name="more-vertical" size={18} color="#999" />
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.taskDescription}>{item.description}</Text>
                  <View style={styles.taskFooter}>
                    <View style={styles.assigneeBadge}>
                      <Text style={styles.assigneeText}>{item.assignedTo}</Text>
                    </View>
                    <Text style={styles.taskDeadline}>{item.deadline}</Text>
                  </View>
                </Animated.View>
              )}
              ListEmptyComponent={
                <View style={styles.emptyColumn}>
                  <MaterialIcons name="assignment" size={40} color="#e0e0e0" />
                  <Text style={styles.emptyColumnText}>No tasks here</Text>
                </View>
              }
            />
          </View>
        ))}
      </ScrollView>
    </View>
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
  tabContent: {
    flex: 1,
    padding: 15,
  },
  tasksTab: {
    flex: 1,
    paddingVertical: 15,
  },
  projectCard: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  gradient: {
    padding: 20,
  },
  projectTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  projectDescription: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 20,
  },
  progressContainer: {
    marginBottom: 20,
  },
  progressBar: {
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 5,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    color: '#fff',
    textAlign: 'right',
  },
  deadlineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deadlineText: {
    fontSize: 14,
    color: '#fff',
    marginLeft: 8,
    marginRight: 12,
  },
  timeRemainingBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  overdueBadge: {
    backgroundColor: 'rgba(255,99,71,0.7)',
  },
  timeRemainingText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '500',
  },
  section: {
    marginBottom: 25,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  viewAllText: {
    fontSize: 14,
    color: '#2575fc',
  },
  memberCard: {
    width: 140,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginRight: 15,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  memberAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 10,
  },
  memberName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 3,
    textAlign: 'center',
  },
  memberRole: {
    fontSize: 12,
    color: '#666',
    marginBottom: 10,
    textAlign: 'center',
  },
  messageButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(37, 117, 252, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  recentTaskCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  taskStatusIndicator: {
    width: 4,
    height: 40,
    backgroundColor: '#2575fc',
    borderRadius: 2,
    marginRight: 12,
  },
  recentTaskContent: {
    flex: 1,
  },
  recentTaskTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  recentTaskMeta: {
    flexDirection: 'row',
  },
  recentTaskStatus: {
    fontSize: 12,
    color: '#666',
    marginRight: 15,
  },
  recentTaskAssignee: {
    fontSize: 12,
    color: '#666',
  },
  recentTaskAction: {
    padding: 5,
  },
  column: {
    width: width * 0.85,
    backgroundColor: '#f5f7fa',
    borderRadius: 12,
    marginHorizontal: 10,
    padding: 15,
  },
  columnHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  columnTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 10,
  },
  columnCount: {
    fontSize: 14,
    color: '#666',
    marginRight: 'auto',
  },
  addTaskButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(37, 117, 252, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  taskCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  taskCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  taskTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  taskDescription: {
    fontSize: 13,
    color: '#666',
    marginBottom: 12,
  },
  taskFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  assigneeBadge: {
    backgroundColor: 'rgba(37, 117, 252, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  assigneeText: {
    fontSize: 12,
    color: '#2575fc',
    fontWeight: '500',
  },
  taskDeadline: {
    fontSize: 12,
    color: '#666',
  },
  emptyColumn: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  emptyColumnText: {
    fontSize: 14,
    color: '#999',
    marginTop: 10,
  },
  notesPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  notesPlaceholderText: {
    fontSize: 16,
    color: '#999',
    marginTop: 15,
    marginBottom: 25,
  },
  addNoteButton: {
    backgroundColor: '#2575fc',
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 25,
  },
  addNoteButtonText: {
    color: '#fff',
    fontWeight: '600',
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
