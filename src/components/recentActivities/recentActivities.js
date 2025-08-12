import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { FONT } from '../constants/font';
import { wp } from '../constants/responsiveSize';

export default function RecentActivities({ recentActivities, navigation }) {
  return (
    <View style={styles.activitiesContainer}>
      <Text style={styles.sectionTitle}>Recent Activities</Text>
      <View style={styles.activitiesCard}>
        {recentActivities.map(activity => (
          <TouchableOpacity key={activity.id} style={styles.activityItem}>
            <View
              style={[
                styles.activityIcon,
                { backgroundColor: `${activity.color}20` },
              ]}
            >
              <FontAwesome
                name={activity.icon}
                size={18}
                color={activity.color}
              />
            </View>
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>{activity.title}</Text>
              <Text style={styles.activityDescription}>
                {activity.description}
              </Text>
            </View>
            <Text style={styles.activityTime}>{activity.time}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          style={styles.viewAllButton}
          onPress={() => navigation.navigate('Activities')}
        >
          <Text style={styles.viewAllText}>View All Activities</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // Recent Activities
  // activitiesContainer: {
  //   paddingHorizontal: 20,
  // },
  activitiesCard: {
    backgroundColor: 'white',
    borderRadius: 12,
  },
  sectionTitle: {
    fontFamily: FONT.PoppinsSemiBold,
    fontSize: wp(4.5),
  },
  activityItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    color: '#212121',
  },
  activityDescription: {
    color: '#757575',
    fontSize: 12,
  },
  activityTime: {
    color: '#9E9E9E',
    fontSize: 10,
  },
  viewAllButton: {
    padding: 15,
    alignItems: 'center',
  },
  viewAllText: {
    color: '#3F51B5',
    fontWeight: '500',
  },
});
