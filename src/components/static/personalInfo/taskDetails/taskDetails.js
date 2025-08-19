import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {wp} from '../../../constants/responsiveSize';
import {FONT} from '../../../constants/font';

const TaskDetails = () => {
  const tasks = [
    {
      id: 1,
      title: 'Implement new feature',
      status: 'Completed',
      dueDate: '2023-06-10',
    },
    {
      id: 2,
      title: 'Fix critical bug',
      status: 'In Progress',
      dueDate: '2023-06-15',
    },
    {id: 3, title: 'Code review', status: 'Pending', dueDate: '2023-06-18'},
    {
      id: 4,
      title: 'Write documentation',
      status: 'Not Started',
      dueDate: '2023-06-20',
    },
  ];

  const getStatusStyle = status => {
    switch (status) {
      case 'Completed':
        return styles.completedStatus;
      case 'In Progress':
        return styles.inProgressStatus;
      case 'Pending':
        return styles.pendingStatus;
      case 'Not Started':
        return styles.notStartedStatus;
      default:
        return styles.pendingStatus;
    }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.screenContainer}>
      <Text style={styles.sectionTitle}>Current Tasks</Text>
      <View style={styles.section}>
        {tasks.map(task => (
          <View key={task.id} style={styles.taskItem}>
            <Text style={styles.taskTitle}>{task.title}</Text>
            <View style={styles.taskDetails}>
              <Text style={[styles.taskStatus, getStatusStyle(task.status)]}>
                {task.status}
              </Text>
              <Text style={styles.taskDueDate}>Due: {task.dueDate}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  section: {
    marginVertical: 6,
    paddingHorizontal: 14,
    paddingVertical: 20,
    backgroundColor: 'white',
    borderRadius: 12,
    marginHorizontal: 14,
    marginBottom: 14,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: wp(4.5),
    fontFamily: FONT.PoppinsSemiBold,
    color: '#333',
    marginLeft: 14,
    marginBottom: 8,
    marginTop: 10,
  },
  taskItem: {
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  taskTitle: {
    fontSize: 16,
    fontFamily: FONT.PoppinsMedium,
    marginBottom: 5,
  },
  taskDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskStatus: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
    fontSize: 14,
    fontFamily: FONT.PoppinsMedium,
  },
  completedStatus: {
    backgroundColor: '#e6f7ee',
    color: '#00a854',
  },
  inProgressStatus: {
    backgroundColor: '#fff7e6',
    color: '#fa8c16',
  },
  pendingStatus: {
    backgroundColor: '#f6ffed',
    color: '#52c41a',
  },
  notStartedStatus: {
    backgroundColor: '#f0f0f0',
    color: '#888',
  },
  taskDueDate: {
    fontSize: 14,
    color: '#666',
  },
});

export default TaskDetails;
