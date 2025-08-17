import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {wp} from '../../constants/responsiveSize';
import {FONT} from '../../constants/font';

const PrioritySelector = ({selectedPriority, setSelectedPriority}) => {
  const priorities = ['High', 'Medium', 'Low'];
  const getPriorityColor = priority => {
    switch (priority) {
      case 'High':
        return '#FF7675';
      case 'Medium':
        return '#FDCB6E';
      case 'Low':
        return '#00B894';
      default:
        return '#5E8BFF';
    }
  };

  return (
    <View style={styles.inputGroup}>
      <Text style={styles.inputLabel}>Priority</Text>
      <View style={styles.optionContainer}>
        {priorities.map(priority => (
          <TouchableOpacity
            key={priority}
            style={[
              styles.optionButton,
              selectedPriority === priority && {
                backgroundColor: getPriorityColor(priority),
              },
            ]}
            onPress={() => setSelectedPriority(priority)}>
            <Text
              style={[
                styles.optionText,
                selectedPriority === priority && {color: '#fff'},
              ]}>
              {priority}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingHorizontal: 14,
    maxHeight: '100%',
  },
  scrollContent: {
    // paddingBottom: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  modalTitle: {
    fontSize: wp(5),
    fontFamily: FONT.PoppinsSemiBold,
    color: '#333',
  },
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
  input: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    fontSize: wp(4),
    // fontFamily: FONT.PoppinsRegular,
    color: '#333',
    height: 45,
    paddingHorizontal: 12,
  },
  descriptionInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  datePickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 15,
  },
  dateText: {
    marginLeft: 10,
    fontSize: wp(4),
    fontFamily: FONT.PoppinsRegular,
    color: '#333',
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
  colorContainer: {
    flexDirection: 'row',
    gap: 15,
  },
  colorOption: {
    width: wp(8),
    height: wp(8),
    borderRadius: 20,
  },
  selectedColor: {
    borderWidth: 3,
    borderColor: '#ddd',
  },
  assigneeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 15,
  },
  assigneeText: {
    fontSize: wp(4),
    fontFamily: FONT.PoppinsRegular,
    color: '#333',
  },
  employeeList: {
    marginTop: 10,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  employeeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  employeeAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#5E8BFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#fff',
    fontFamily: FONT.PoppinsSemiBold,
    fontSize: wp(4),
  },
  employeeInfo: {
    flex: 1,
  },
  employeeName: {
    fontSize: wp(4),
    fontFamily: FONT.PoppinsMedium,
    color: '#333',
  },
  employeeRole: {
    fontSize: wp(3.5),
    fontFamily: FONT.PoppinsRegular,
    color: '#777',
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  cancelButton: {
    flex: 1,
    padding: 15,
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: '#f8f9fa',
    marginRight: 10,
  },
  cancelButtonText: {
    fontSize: wp(4),
    fontFamily: FONT.PoppinsMedium,
    color: '#666',
  },
  submitButton: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  gradientButton: {
    padding: 15,
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: wp(4),
    fontFamily: FONT.PoppinsMedium,
    color: '#fff',
  },
});

export default PrioritySelector;
