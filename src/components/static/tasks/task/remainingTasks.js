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

import {wp} from '../../../constants/responsiveSize';
import {FONT} from '../../../constants/font';

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
                <AntDesign
                  name="plus"
                  size={16}
                  color="#2575fc"
                  // color="#fff"
                />
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
  tasksTab: {
    flex: 1,
    paddingVertical: 14,
    marginTop: 14,
  },
  column: {
    width: width * 0.85,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 6,
    padding: 14,
    borderWidth: 1,
    borderColor: '#e0e0e0',
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
    // backgroundColor: COLORS.btnColor,
    backgroundColor: 'rgba(37, 117, 252, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  taskCard: {
    backgroundColor: '#f6f6f6',
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
    fontSize: wp(4),
    color: '#333',
    fontFamily: FONT.PoppinsMedium,
    marginBottom: -6,
  },
  taskDescription: {
    fontSize: wp(3.5),
    color: '#666',
    marginBottom: 12,
    fontFamily: FONT.PoppinsRegular,
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
    fontSize: wp(3.5),
    color: '#2575fc',
    fontFamily: FONT.PoppinsRegular,
    marginBottom: -4,
  },
  taskDeadline: {
    fontSize: wp(3),
    color: '#666',
    fontFamily: FONT.PoppinsRegular,
    marginBottom: -4,
  },
  emptyColumn: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  emptyColumnText: {
    fontSize: wp(4),
    color: '#999',
    marginTop: 10,
    fontFamily: FONT.PoppinsMedium,
  },
});
