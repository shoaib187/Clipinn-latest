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
import React, {useState} from 'react';

import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {wp} from '../../../constants/responsiveSize';
import {FONT} from '../../../constants/font';
import TaskActionModal from '../taskActionModal/taskActionModal';
import AddTaskModal from '../addTaskModal/addTaskModal';

const {width} = Dimensions.get('window');

export default function RemainingTasks() {
  const [modalVisible, setModalVisible] = useState(false);
  const [taskModalVisible, setTaskModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [newTaskColumn, setNewTaskColumn] = useState('To Do');
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');

  const [tasks, setTasks] = useState({
    'To Do': [
      {
        id: '1',
        title: 'Design Homepage',
        description: 'Create wireframes and mockups',
        assignedTo: 'John',
        deadline: '2023-06-15',
      },
      {
        id: '2',
        title: 'User Research',
        description: 'Conduct interviews with 5 users',
        assignedTo: 'Sarah',
        deadline: '2023-06-20',
      },
    ],
    'In Progress': [
      {
        id: '3',
        title: 'API Integration',
        description: 'Connect frontend to backend services',
        assignedTo: 'Mike',
        deadline: '2023-06-18',
      },
    ],
    Done: [
      {
        id: '4',
        title: 'Project Setup',
        description: 'Initialize repository and CI/CD',
        assignedTo: 'Emma',
        deadline: '2023-06-10',
      },
    ],
  });

  const handleAddTask = () => {
    if (newTaskTitle.trim() === '') return;

    const newTask = {
      id: Date.now().toString(),
      title: newTaskTitle,
      description: newTaskDescription,
      assignedTo: 'Unassigned',
      deadline: '2023-06-30',
    };

    setTasks(prev => ({
      ...prev,
      [newTaskColumn]: [...prev[newTaskColumn], newTask],
    }));

    setNewTaskTitle('');
    setNewTaskDescription('');
    setTaskModalVisible(false);
  };

  const handleTaskAction = (action, taskId, column) => {
    if (action === 'delete') {
      setTasks(prev => ({
        ...prev,
        [column]: prev[column].filter(task => task.id !== taskId),
      }));
    } else if (action === 'move') {
      const taskToMove = tasks[column].find(task => task.id === taskId);
      if (!taskToMove) return;

      let newColumn;
      if (column === 'To Do') newColumn = 'In Progress';
      else if (column === 'In Progress') newColumn = 'Done';
      else return;

      setTasks(prev => ({
        ...prev,
        [column]: prev[column].filter(task => task.id !== taskId),
        [newColumn]: [...prev[newColumn], taskToMove],
      }));
    }
  };

  return (
    <View style={styles.tasksTab}>
      <ScrollView
        horizontal
        contentContainerStyle={{paddingLeft: 14}}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}>
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

      {/* Task Action Modal */}
      <TaskActionModal
        tasks={tasks}
        modalVisible={modalVisible}
        selectedTask={selectedTask}
        setModalVisible={setModalVisible}
        handleTaskAction={handleTaskAction}
      />

      {/* Add Task Modal */}
      <AddTaskModal
        taskModalVisible={taskModalVisible}
        setTaskModalVisible={setTaskModalVisible}
        newTaskTitle={newTaskTitle}
        setNewTaskTitle={setNewTaskTitle}
        newTaskDescription={newTaskDescription}
        setNewTaskDescription={setNewTaskDescription}
        handleAddTask={handleAddTask}
        tasks={tasks}
      />
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
    width: width * 0.75,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginRight: 12,
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
  },
  taskDeadline: {
    fontSize: wp(3),
    color: '#666',
    fontFamily: FONT.PoppinsRegular,
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
