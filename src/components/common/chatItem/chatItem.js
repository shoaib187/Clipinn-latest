import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {formatTime} from '../../../utils/common/services/services';
import {COLORS} from '../../constants/colors';
import {wp} from '../../constants/responsiveSize';
import {FONT} from '../../constants/font';

export default function ChatItem({item, onPress}) {
  return (
    <TouchableOpacity style={styles.chatItem} onPress={onPress}>
      <View style={styles.avatarContainer}>
        <Image source={{uri: item.user.avatar}} style={styles.avatar} />

        {item.isOnline && !item.isGroup && <View style={styles.onlineBadge} />}

        {item.isGroup && (
          <View style={styles.groupIconContainer}>
            <Ionicons name="people" size={12} color="white" />
          </View>
        )}
      </View>

      <View style={styles.chatContent}>
        <View style={styles.chatHeader}>
          <Text
            style={[
              styles.chatName,
              item.isGroup && styles.groupName, // 👥 different style for groups
            ]}
            numberOfLines={1}>
            {item.user.name}
          </Text>
          <Text style={styles.chatTime}>
            {formatTime(item.lastMessage.createdAt)}
          </Text>
        </View>

        <View style={styles.chatFooter}>
          <View style={styles.messagePreview}>
            {item.isGroup && (
              <Text style={styles.senderName} numberOfLines={1}>
                {item.lastMessage.text.split(':')[0]}:
              </Text>
            )}
            <Text
              style={[
                styles.lastMessage,
                item.unreadCount > 0 && styles.unreadMessage,
              ]}
              numberOfLines={1}>
              {item.isGroup
                ? item.lastMessage.text.split(':').slice(1).join(':')
                : item.lastMessage.text}
            </Text>
          </View>

          {item.unreadCount > 0 ? (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadCount}>{item.unreadCount}</Text>
            </View>
          ) : (
            <Ionicons name="checkmark-done" size={18} color="#999" />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  onlineBadge: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: 'white',
  },
  chatContent: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  chatName: {
    fontSize: wp(4.2),
    color: COLORS.btnColor,
    maxWidth: '70%',
    fontFamily: FONT.PoppinsMedium,
    marginBottom: -6,
  },
  chatTime: {
    fontSize: wp(3.5),
    color: '#999',
  },
  chatFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  messagePreview: {
    flexDirection: 'row',
    flex: 1,
    marginRight: 8,
  },
  senderName: {
    fontSize: wp(3.6),
    color: COLORS.btnColor,
    fontFamily: FONT.PoppinsMedium,
    marginRight: 4,
    marginTop: -1,
  },
  lastMessage: {
    fontSize: wp(3.6),
    fontFamily: FONT.PoppinsRegular,
    color: '#777',
    flex: 1,
    marginBottom: -4,
  },
  unreadMessage: {
    color: '#333',
    fontWeight: '500',
  },
  unreadBadge: {
    backgroundColor: '#25D366',
    borderRadius: 12,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unreadCount: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  groupIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 20,
    height: 20,
    borderRadius: 20,
    backgroundColor: '#25D366',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  groupName: {
    fontFamily: FONT.PoppinsMedium,
  },
});
