import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { FONT } from '../constants/font';
import { wp } from '../constants/responsiveSize';

export default function QuickActions({ quickActions, navigation }) {
  return (
    <View style={styles.quickActionsContainer}>
      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <View style={styles.quickActionsGrid}>
        {quickActions.map(action => (
          <TouchableOpacity
            key={action.id}
            onPress={() => navigation.navigate(action.id)}
            style={[styles.quickActionCard, { backgroundColor: `#f9f9f9` }]}
          >
            <View
              style={[
                styles.quickActionIcon,
                { backgroundColor: `${action.color}20` },
              ]}
            >
              <Icon name={action.icon} size={20} color={action.color} />
            </View>
            <Text style={styles.quickActionText}>{action.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // Quick Actions
  // quickActionsContainer: {
  //   paddingHorizontal: 20,
  // },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionCard: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#f3f3f3',
    paddingVertical: 8,
  },
  quickActionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  quickActionText: {
    color: '#212121',
    fontWeight: '500',
  },
  sectionTitle: {
    fontFamily: FONT.PoppinsSemiBold,
    fontSize: wp(4.5),
    marginBottom: 6,
  },
});
