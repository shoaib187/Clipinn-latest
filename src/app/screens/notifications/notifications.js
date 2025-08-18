import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {COLORS} from '../../../components/constants/colors';

export default function Notifications({navigation}) {
  const [refreshing, setRefreshing] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'task_moved',
      title: 'Task moved',
      content: 'Your task "Design dashboard" was moved to "In Progress"',
      time: '2 mins ago',
      read: false,
      icon: 'swap-horiz',
      iconColor: '#4CAF50',
    },
    {
      id: 2,
      type: 'new_task',
      title: 'New task',
      content: 'New task "Fix login page" assigned to you',
      time: '15 mins ago',
      read: false,
      icon: 'add-task',
      iconColor: '#2196F3',
    },
    {
      id: 3,
      type: 'login',
      title: 'Login successful',
      content: 'You logged in from a new device',
      time: '1 hour ago',
      read: true,
      icon: 'verified-user',
      iconColor: '#FF9800',
    },
    {
      id: 4,
      type: 'reminder',
      title: 'Reminder',
      content: 'Daily standup meeting in 15 minutes',
      time: '3 hours ago',
      read: true,
      icon: 'notifications',
      iconColor: '#9C27B0',
    },
    {
      id: 5,
      type: 'completed',
      title: 'Task completed',
      content: 'Task "Update documentation" was marked as done',
      time: '1 day ago',
      read: true,
      icon: 'check-circle',
      iconColor: '#607D8B',
    },
  ]);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      // Add a new notification
      setNotifications([
        {
          id: Math.random(),
          type: 'system',
          title: 'System update',
          content: 'New features available in version 2.3',
          time: 'just now',
          read: false,
          icon: 'system-update',
          iconColor: '#795548',
        },
        ...notifications,
      ]);
    }, 1500);
  };

  const markAsRead = id => {
    setNotifications(
      notifications.map(notification =>
        notification.id === id ? {...notification, read: true} : notification,
      ),
    );
  };

  const getNotificationIcon = type => {
    switch (type) {
      case 'task_moved':
        return 'swap-horiz';
      case 'new_task':
        return 'add-task';
      case 'login':
        return 'verified-user';
      case 'reminder':
        return 'notifications';
      case 'completed':
        return 'check-circle';
      default:
        return 'info';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Notifications</Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.headerAction}>Mark all as read</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {notifications.map(notification => (
          <TouchableOpacity
            key={notification.id}
            style={[
              styles.notificationItem,
              !notification.read && styles.unreadNotification,
            ]}
            onPress={() => markAsRead(notification.id)}>
            <View
              style={[
                styles.iconContainer,
                {backgroundColor: `${notification.iconColor}20`},
              ]}>
              <Icon
                name={notification.icon}
                size={24}
                color={notification.iconColor}
              />
            </View>
            <View style={styles.content}>
              <Text style={styles.notificationTitle}>{notification.title}</Text>
              <Text style={styles.notificationText}>
                {notification.content}
              </Text>
              <Text style={styles.notificationTime}>{notification.time}</Text>
            </View>
            {!notification.read && <View style={styles.unreadBadge} />}
          </TouchableOpacity>
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
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
    backgroundColor: COLORS.black,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerAction: {
    fontSize: 14,
    color: '#0d6efd',
  },
  notificationItem: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
    alignItems: 'flex-start',
  },
  unreadNotification: {
    backgroundColor: '#f8f9fe',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  content: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 4,
  },
  notificationText: {
    fontSize: 14,
    color: '#495057',
    marginBottom: 4,
  },
  notificationTime: {
    fontSize: 12,
    color: '#6c757d',
  },
  unreadBadge: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.btnColor,
    marginLeft: 8,
    marginTop: 8,
  },
});
