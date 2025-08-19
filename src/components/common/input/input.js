import {TextInput, StyleSheet} from 'react-native';
import React from 'react';

export default function Input({placeholder, onChangeText, value}) {
  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor="#A0AEC0"
      style={[styles.input, styles.questionInput]}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    flex: 1,
    fontSize: 15,
    color: '#2D3748',
    paddingRight: 25,
  },

  questionInput: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginRight: 10,
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
});
