import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {wp} from '../../constants/responsiveSize';
import {FONT} from '../../constants/font';
import {COLORS} from '../../constants/colors';

const LabelSelector = ({selectedLabel, setSelectedLabel}) => {
  const labels = ['Design', 'Development', 'Research', 'Bug', 'Feature'];

  return (
    <View style={styles.inputGroup}>
      <Text style={styles.inputLabel}>Label</Text>
      <View style={styles.optionContainer}>
        {labels.map(label => (
          <TouchableOpacity
            key={label}
            style={[
              styles.optionButton,
              selectedLabel === label && {backgroundColor: COLORS.btnColor},
            ]}
            onPress={() => setSelectedLabel(label)}>
            <Text
              style={[
                styles.optionText,
                selectedLabel === label && {color: '#fff'},
              ]}>
              {label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputGroup: {
    marginVertical: 12,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    paddingBottom: 12,
  },
  inputLabel: {
    fontSize: wp(4),
    fontFamily: FONT.PoppinsMedium,
    color: '#555',
    marginBottom: 8,
  },
  optionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  optionButton: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  optionText: {
    fontSize: wp(3.8),
    fontFamily: FONT.PoppinsRegular,
    color: '#555',
    marginBottom: -3,
  },
});

export default LabelSelector;
