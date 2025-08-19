import {View, Text, TextInput, StyleSheet} from 'react-native';
import React from 'react';

export default function DescriptionField({reason, setReason}) {
  return (
    <View style={styles.reasonInputContainer}>
      <TextInput
        style={styles.reasonInput}
        multiline
        numberOfLines={4}
        placeholder="Briefly explain the reason for your leave..."
        placeholderTextColor="#90a4ae"
        value={reason}
        onChangeText={setReason}
      />
      <View style={styles.charCount}>
        <Text style={styles.charCountText}>{reason.length}/200</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  reasonInputContainer: {
    borderWidth: 1.5,
    borderColor: '#e6f0ff',
    borderRadius: 12,
    backgroundColor: '#f8fafc',
    position: 'relative',
  },
  reasonInput: {
    padding: 15,
    height: 120,
    textAlignVertical: 'top',
    color: '#2c3e50',
    fontSize: 14,
  },
  charCount: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'rgba(255,255,255,0.8)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  charCountText: {
    fontSize: 12,
    color: '#90a4ae',
  },
});
