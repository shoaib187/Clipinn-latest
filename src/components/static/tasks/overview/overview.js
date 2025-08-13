import {
  View,
  Text,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import {COLORS} from '../../../constants/colors';
import {wp} from '../../../constants/responsiveSize';
import {FONT} from '../../../constants/font';

export default function Overview({
  projectDetails,
  timeRemaining,
  teamMembers,
  recentTasks,
}) {
  return (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <View style={styles.projectCard}>
        <LinearGradient
          colors={[`${COLORS.lightGray}`, COLORS.btnColor]}
          style={styles.gradient}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}>
          <Text style={styles.projectTitle}>{projectDetails.name}</Text>
          <Text style={styles.projectDescription}>
            {projectDetails.description}
          </Text>

          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  {width: `${projectDetails.progress}%`},
                ]}
              />
            </View>
            <Text style={styles.progressText}>
              {projectDetails.progress}% Complete
            </Text>
          </View>

          <View style={styles.deadlineContainer}>
            <Feather name="calendar" size={18} color="#fff" />
            <Text style={styles.deadlineText}>
              Deadline: {projectDetails.deadline}
            </Text>
            <View
              style={[
                styles.timeRemainingBadge,
                timeRemaining.overdue && styles.overdueBadge,
              ]}>
              <Text style={styles.timeRemainingText}>
                {timeRemaining.overdue
                  ? `${Math.abs(timeRemaining.days)} days overdue`
                  : timeRemaining.weeks > 0
                  ? `${timeRemaining.weeks} weeks remaining`
                  : `${timeRemaining.days} days remaining`}
              </Text>
            </View>
          </View>
        </LinearGradient>
      </View>

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
                <Feather name="message-square" size={16} color="#2575fc" />
              </TouchableOpacity>
            </View>
          )}
        />
      </View>

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
                      uri: 'https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D',
                    }}
                    style={{
                      width: 16,
                      height: 16,
                      borderRadius: 40,
                      marginRight: 6,
                      borderWidth: 1.4,
                      borderColor: '#ddd',
                    }}
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
  tabContent: {
    flex: 1,
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
    marginTop: 34,
    marginHorizontal: 14,
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
    color: '#2575fc',
    fontFamily: FONT.PoppinsMedium,
  },
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
  recentTaskContent: {
    flex: 1,
  },
  recentTaskTitle: {
    fontSize: wp(4),
    color: '#333',
    fontFamily: FONT.PoppinsMedium,
    marginBottom: -3,
  },
  recentTaskMeta: {
    flexDirection: 'row',
  },
  recentTaskStatus: {
    fontSize: wp(3.5),
    fontFamily: FONT.PoppinsRegular,
    color: '#666',
    marginRight: 15,
  },
  recentTaskAssignee: {
    color: '#666',
    fontSize: wp(3.3),
    fontFamily: FONT.PoppinsRegular,
  },
  contentContainerStyle: {
    paddingHorizontal: 14,
  },
});
