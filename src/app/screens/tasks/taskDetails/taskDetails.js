import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Animated,
} from 'react-native';

import Overview from '../../../../components/static/tasks/overview/overview';
import RemainingTasks from '../../../../components/static/tasks/task/remainingTasks';
import Notes from '../../../../components/static/tasks/notes/notes';
import TaskActionModal from '../../../../components/static/tasks/taskActionModal/taskActionModal';
import AddTaskModal from '../../../../components/static/tasks/addTaskModal/addTaskModal';
import {COLORS} from '../../../../components/constants/colors';
import {wp} from '../../../../components/constants/responsiveSize';
import IconButton from '../../../../components/common/button/iconButton';
import BackButton from '../../../../components/common/button/backButton';
import {FONT} from '../../../../components/constants/font';

const {height} = Dimensions.get('window');
const ITEM_HEIGHT = height * 0.2;

export default function TaskDetails({navigation}) {
  const scrollY = useRef(new Animated.Value(0)).current;
  const [activeTab, setActiveTab] = useState('Overview');
  const [modalVisible, setModalVisible] = useState(false);
  const [taskModalVisible, setTaskModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [newTaskColumn, setNewTaskColumn] = useState('To Do');
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');

  const [finalHeight, setFinalHeight] = useState(null);
  // Animate from 60 → 0 height on scroll
  const animatedHeight = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [ITEM_HEIGHT, finalHeight],
    extrapolate: 'clamp',
  });

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

  const teamMembers = [
    {
      id: '1',
      name: 'John Doe',
      role: 'UI/UX Designer',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
    {
      id: '2',
      name: 'Sarah Smith',
      role: 'Product Manager',
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    },
    {
      id: '3',
      name: 'Mike Johnson',
      role: 'Backend Developer',
      avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    },
    {
      id: '4',
      name: 'Emma Wilson',
      role: 'Frontend Developer',
      avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    },
  ];

  const recentTasks = [
    {
      id: '1',
      title: 'API Integration',
      status: 'In Progress',
      assignedTo: 'Mike',
    },
    {id: '2', title: 'User Research', status: 'To Do', assignedTo: 'Sarah'},
    {id: '3', title: 'Project Setup', status: 'Done', assignedTo: 'Emma'},
  ];

  const projectDetails = {
    name: 'E-commerce Mobile App',
    description: 'Development of a new mobile shopping experience',
    deadline: '2023-07-30',
    progress: 45,
  };

  const calculateTimeRemaining = deadline => {
    const today = new Date();
    const dueDate = new Date(deadline);
    const diffTime = dueDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const diffWeeks = Math.floor(diffDays / 7);

    return {
      days: diffDays,
      weeks: diffWeeks,
      overdue: diffDays < 0,
    };
  };

  const timeRemaining = calculateTimeRemaining(projectDetails.deadline);

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
      // Find the task
      const taskToMove = tasks[column].find(task => task.id === taskId);
      if (!taskToMove) return;

      // Determine next column
      let newColumn;
      if (column === 'To Do') newColumn = 'In Progress';
      else if (column === 'In Progress') newColumn = 'Done';
      else return;

      // Remove from current column and add to new column
      setTasks(prev => ({
        ...prev,
        [column]: prev[column].filter(task => task.id !== taskId),
        [newColumn]: [...prev[newColumn], taskToMove],
      }));
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Overview':
        return (
          <Overview
            projectDetails={projectDetails}
            recentTasks={recentTasks}
            teamMembers={teamMembers}
            timeRemaining={timeRemaining}
          />
        );

      case 'Tasks':
        return (
          <RemainingTasks
            setModalVisible={setModalVisible}
            setNewTaskColumn={setNewTaskColumn}
            setSelectedTask={setSelectedTask}
            setTaskModalVisible={setTaskModalVisible}
            tasks={tasks}
          />
        );

      case 'Notes':
        return <Notes />;

      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={{flex: 1, paddingTop: StatusBar.currentHeight}}>
      <Animated.View
        style={[styles.header, {position: 'absolute', height: animatedHeight}]}
      />
      <BackButton
        iconColor={'#fff'}
        navigation={navigation}
        style={{position: 'absolute', top: StatusBar.currentHeight}}
      />
      <View style={{paddingHorizontal: 14, paddingVertical: 24, top: 24}}>
        <Text
          numberOfLines={1}
          style={{
            color: '#fff',
            fontSize: wp(7),
            fontFamily: FONT.PoppinsSemiBold,
            marginBottom: -4,
          }}>
          E-Commerce Mobile App
        </Text>
        <Text
          numberOfLines={1}
          style={{
            color: '#fff',
            fontSize: wp(4),
            fontFamily: FONT.PoppinsRegular,
            marginBottom: -6,
          }}>
          E-Commerce Mobile App
        </Text>
      </View>
      <View style={styles.container}>
        <View style={styles.tabBar}>
          {['Overview', 'Tasks', 'Notes'].map(tab => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.tabButton,
                activeTab === tab && styles.activeTabButton,
              ]}
              onPress={() => setActiveTab(tab)}>
              <Text
                style={[
                  styles.tabButtonText,
                  activeTab === tab && styles.activeTabButtonText,
                ]}>
                {tab}
              </Text>
              {activeTab === tab && <View style={styles.tabIndicator} />}
            </TouchableOpacity>
          ))}
        </View>

        {renderTabContent()}
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
          newTaskColumn={newTaskColumn}
          setNewTaskColumn={setNewTaskColumn}
          handleAddTask={handleAddTask}
          tasks={tasks}
        />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
  },
  header: {
    position: 'absolute',
    top: StatusBar.currentHeight || 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.black,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginHorizontal: 14,
    borderRadius: 8,
    overflow: 'hidden',
    top: ITEM_HEIGHT - ITEM_HEIGHT + 20,
    zIndex: 1111,
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
    color: COLORS.btnColor,
    fontWeight: '600',
  },
  tabIndicator: {
    position: 'absolute',
    bottom: 0,
    height: 3,
    width: '40%',
    backgroundColor: COLORS.btnColor,
    borderRadius: 3,
  },
});
