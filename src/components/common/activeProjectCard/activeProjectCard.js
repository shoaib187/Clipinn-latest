import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function ActiveProjectCard({item, onPress}) {
  return (
    <TouchableOpacity
      style={[styles.projectCard, {borderLeftColor: item.color}]}
      activeOpacity={0.8}
      onPress={onPress}>
      <View style={styles.cardHeader}>
        <View style={[styles.categoryBadge, {backgroundColor: item.color}]}>
          <Text style={styles.categoryText}>{item.category}</Text>
        </View>
        <TouchableOpacity>
          <Feather name="more-vertical" size={20} color="#666" />
        </TouchableOpacity>
      </View>

      <Text style={styles.projectTitle}>{item.title}</Text>
      <Text style={styles.projectDesc}>{item.description}</Text>

      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <LinearGradient
            colors={[item.color, `${item.color}90`]}
            style={[styles.progressFill, {width: `${item.progress}%`}]}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
          />
        </View>
        <Text style={styles.progressText}>{item.progress}% completed</Text>
      </View>

      <View style={styles.cardFooter}>
        <View style={styles.teamContainer}>
          {item.team.slice(0, 3).map((avatar, index) => (
            <Image
              key={index}
              source={{uri: avatar}}
              style={[
                styles.teamAvatar,
                {marginLeft: index > 0 ? -10 : 0, zIndex: index},
              ]}
            />
          ))}
          {item.team.length > 3 && (
            <View
              style={[styles.teamAvatar, styles.moreCount, {marginLeft: -10}]}>
              <Text style={styles.moreCountText}>+{item.team.length - 3}</Text>
            </View>
          )}
        </View>
        <View style={styles.dueDateContainer}>
          <MaterialIcons name="access-time" size={16} color="#666" />
          <Text style={styles.dueDateText}>Due: {item.dueDate}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  projectCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    borderLeftWidth: 4,
    shadowColor: '#ddd',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 10,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  projectTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
  },
  projectDesc: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
    lineHeight: 20,
  },
  progressContainer: {
    marginBottom: 16,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#eee',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 6,
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: '#666',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  teamContainer: {
    flexDirection: 'row',
  },
  teamAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#fff',
  },
  moreCount: {
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreCountText: {
    fontSize: 10,
    color: '#666',
  },
  dueDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dueDateText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
});
