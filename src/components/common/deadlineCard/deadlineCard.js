import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
import {COLORS} from '../../constants/colors';

export default function DeadlineCard() {
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

  return (
    <View style={styles.projectCard}>
      <LinearGradient
        colors={[COLORS.lightGray, COLORS.btnColor]}
        style={styles.gradient}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        {/* Title & Description */}
        <Text style={styles.projectTitle}>{projectDetails.name}</Text>
        <Text style={styles.projectDescription}>
          {projectDetails.description}
        </Text>

        {/* Progress Bar */}
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

        {/* Deadline */}
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
  );
}

const styles = StyleSheet.create({
  projectCard: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginTop: 18,
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
});
