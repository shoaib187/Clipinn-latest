import React from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import {COLORS} from '../../../constants/colors';
import {wp} from '../../../constants/responsiveSize';
import {FONT} from '../../../constants/font';
import DeadlineCard from '../../../common/deadlineCard/deadlineCard';

export default function Overview() {
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

  return (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      {/* Project Card */}
      <DeadlineCard />

      {/* Team Members */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Team Members</Text>
        <FlatList
          horizontal
          data={teamMembers}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.contentContainerStyle}
          renderItem={({item}) => (
            <View style={styles.memberCard}>
              <Image source={{uri: item.avatar}} style={styles.memberAvatar} />
              <Text numberOfLines={1} style={styles.memberName}>
                {item.name}
              </Text>
              <Text numberOfLines={1} style={styles.memberRole}>
                {item.role}
              </Text>
              <TouchableOpacity style={styles.messageButton}>
                <Feather
                  name="message-square"
                  size={16}
                  color={COLORS.btnColor}
                />
              </TouchableOpacity>
            </View>
          )}
        />
      </View>

      {/* Recent Tasks */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, {marginLeft: 0}]}>
            Recent Tasks
          </Text>
          <TouchableOpacity>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>

        {recentTasks.map(task => (
          <View key={task.id} style={styles.recentTaskCard}>
            <View style={styles.taskStatusIndicator} />
            <View style={styles.recentTaskContent}>
              <Text style={styles.recentTaskTitle}>{task.title}</Text>
              <View style={styles.recentTaskMeta}>
                <Text style={styles.recentTaskStatus}>{task.status}</Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image
                    source={{
                      uri: 'https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?w=400&auto=format&fit=crop&q=60',
                    }}
                    style={styles.taskAvatar}
                  />
                  <Text style={styles.recentTaskAssignee}>
                    · Assigned to {task.assignedTo}
                  </Text>
                </View>
              </View>
            </View>
            <TouchableOpacity style={styles.recentTaskAction}>
              <Entypo name="chevron-right" size={20} color="#999" />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  tabContent: {flex: 1},

  // Section headers
  section: {marginBottom: 25},
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
    paddingHorizontal: 14,
  },
  sectionTitle: {
    fontSize: wp(5),
    fontFamily: FONT.PoppinsMedium,
    marginLeft: 14,
  },
  viewAllText: {
    fontSize: wp(3.5),
    color: COLORS.btnColor,
    fontFamily: FONT.PoppinsMedium,
  },

  // Team members
  memberCard: {
    width: wp(33),
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 14,
    marginRight: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#f3f3f3',
  },
  memberAvatar: {width: 60, height: 60, borderRadius: 30, marginBottom: 10},
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

  // Recent tasks
  recentTaskCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 14,
  },
  taskStatusIndicator: {
    width: 4,
    height: 40,
    backgroundColor: `${COLORS.btnColor}70`,
    borderRadius: 20,
    marginRight: 12,
  },
  recentTaskContent: {flex: 1},
  recentTaskTitle: {
    fontSize: wp(4),
    color: '#333',
    fontFamily: FONT.PoppinsMedium,
    marginBottom: -3,
  },
  recentTaskMeta: {flexDirection: 'row'},
  recentTaskStatus: {
    fontSize: wp(3.5),
    fontFamily: FONT.PoppinsRegular,
    color: '#666',
    marginRight: 15,
  },
  taskAvatar: {
    width: 16,
    height: 16,
    borderRadius: 40,
    marginRight: 6,
    borderWidth: 1.4,
    borderColor: '#ddd',
  },
  recentTaskAssignee: {
    color: '#666',
    fontSize: wp(3.3),
    fontFamily: FONT.PoppinsRegular,
  },

  contentContainerStyle: {paddingHorizontal: 14},
});
