import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {wp} from '../../constants/responsiveSize';
import {FONT} from '../../constants/font';

const ColorSelector = ({selectedColor, setSelectedColor}) => {
  const colors = [
    // Bold colors
    '#5E8BFF',
    '#FF7675',
    '#6C5CE7',
    '#00B894',
    '#FD79A8',
    '#FDCB6E',
    '#55EFC4',
    '#E17055',
    '#A29BFE',
    '#0984E3',
    '#00CEC9',
    '#FAB1A0',
    '#636E72',
    '#BADC58',

    // Lighter pastel colors
    '#D6E4FF', // light blue
    '#FFD6D6', // light pink
    // '#E0BBFF', // light purple
    // '#C8F7DC', // mint
    // '#FFE3F2', // soft pink
    // '#FFF6C5', // light yellow
    // '#D4FDF0', // aqua
    // '#FFE0B5', // peach
    // '#E8EAF6', // lavender grey
    // '#E3F2FD', // very light blue
  ];

  return (
    <View style={styles.inputGroup}>
      <Text style={styles.inputLabel}>Card Color</Text>
      <View style={styles.colorContainer}>
        {colors.map(color => (
          <TouchableOpacity
            key={color}
            style={[
              styles.colorOption,
              {backgroundColor: color},
              selectedColor === color && styles.selectedColor,
            ]}
            onPress={() => setSelectedColor(color)}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputGroup: {
    marginVertical: 12,
  },
  inputLabel: {
    fontSize: wp(4),
    fontFamily: FONT.PoppinsMedium,
    color: '#555',
    marginBottom: 8,
  },
  colorContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  colorOption: {
    width: wp(8),
    height: wp(8),
    borderRadius: wp(4),
  },
  selectedColor: {
    borderWidth: 3,
    borderColor: '#eee',
  },
});

export default ColorSelector;
