import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {wp} from '../../constants/responsiveSize';
import {FONT} from '../../constants/font';
import {COLORS} from '../../constants/colors';

const AssigneeSelector = ({
  selectedEmployee,
  setSelectedEmployee,
  showEmployeeList,
  setShowEmployeeList,
}) => {
  const employees = [
    {id: '1', name: 'John Doe', role: 'Designer'},
    {id: '2', name: 'Sarah Smith', role: 'Developer'},
    {id: '3', name: 'Mike Johnson', role: 'QA Engineer'},
    {id: '4', name: 'Emma Wilson', role: 'Product Manager'},
  ];

  return (
    <View style={styles.inputGroup}>
      <Text style={styles.inputLabel}>Assign To</Text>
      <TouchableOpacity
        style={styles.assigneeButton}
        onPress={() => setShowEmployeeList(!showEmployeeList)}>
        <Text style={styles.assigneeText}>
          {selectedEmployee ? selectedEmployee.name : 'Select employee'}
        </Text>
        <Ionicons
          name={showEmployeeList ? 'chevron-up' : 'chevron-down'}
          size={18}
          color="#666"
        />
      </TouchableOpacity>

      {showEmployeeList && (
        <View style={styles.employeeList}>
          {employees.map(employee => (
            <TouchableOpacity
              key={employee.id}
              style={styles.employeeItem}
              onPress={() => {
                setSelectedEmployee(employee);
                setShowEmployeeList(false);
              }}>
              <View style={styles.employeeAvatar}>
                <Text style={styles.avatarText}>{employee.name.charAt(0)}</Text>
              </View>
              <View style={styles.employeeInfo}>
                <Text style={styles.employeeName}>{employee.name}</Text>
                <Text style={styles.employeeRole}>{employee.role}</Text>
              </View>
              {selectedEmployee?.id === employee.id && (
                <Ionicons name="checkmark" size={18} color="#5E8BFF" />
              )}
            </TouchableOpacity>
          ))}
        </View>
      )}
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
  assigneeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 12,
    padding: 15,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
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
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: '#eee',
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
    width: wp(10),
    height: wp(10),
    borderRadius: 30,
    backgroundColor: COLORS.btnColor,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#fff',
    fontFamily: FONT.PoppinsSemiBold,
    fontSize: wp(4),
    marginBottom: -4,
  },
  employeeInfo: {
    flex: 1,
    marginTop: 4,
  },
  employeeName: {
    fontSize: wp(4),
    fontFamily: FONT.PoppinsMedium,
    color: '#333',
    marginBottom: -4,
  },
  employeeRole: {
    fontSize: wp(3.5),
    fontFamily: FONT.PoppinsRegular,
    color: '#777',
  },
});

export default AssigneeSelector;
