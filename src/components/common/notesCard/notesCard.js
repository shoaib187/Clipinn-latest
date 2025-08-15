import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

export default function NotesCard({note, categories}) {
  return (
    <View key={note.id} style={styles.noteCard}>
      <Text style={styles.noteContent}>{note.content}</Text>
      <View style={styles.noteMeta}>
        <View
          style={[
            styles.noteBadge,
            {
              backgroundColor: `${
                categories.find(c => c.id === note.category)?.color
              }20`,
            },
          ]}>
          <Text
            style={[
              styles.noteBadgeText,
              {
                color: categories.find(c => c.id === note.category)?.color,
              },
            ]}>
            {categories.find(c => c.id === note.category)?.name}
          </Text>
        </View>
        <Text style={styles.noteDate}>
          {note.createdAt.toLocaleDateString()}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  noteCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  noteContent: {
    fontSize: 14,
    color: '#2D3748',
    marginBottom: 10,
  },
  noteMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  noteBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  noteBadgeText: {
    fontSize: 12,
    fontWeight: '500',
  },
  noteDate: {
    fontSize: 12,
    color: '#A0AEC0',
  },
});
