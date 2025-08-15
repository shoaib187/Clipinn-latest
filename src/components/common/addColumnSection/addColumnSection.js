import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
  TextInput,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

export default function AddColumnSection({columns, setColumns}) {
  const [newColumnName, setNewColumnName] = useState('');
  const handleAddColumn = () => {
    if (!newColumnName.trim()) {
      Alert.alert('Error', 'Please enter a column name');
      return;
    }

    const newColumn = {
      id: Date.now().toString(),
      name: newColumnName,
      position: columns.length + 1,
    };

    setColumns([...columns, newColumn]);
    setNewColumnName('');
  };

  const handleDeleteColumn = id => {
    setColumns(columns.filter(col => col.id !== id));
  };

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Columns</Text>
      </View>

      {columns.map(column => (
        <View key={column.id} style={styles.columnItem}>
          <View style={styles.columnInfo}>
            <Text style={styles.columnName}>{column.name}</Text>
            <Text style={styles.columnPosition}>
              Position: {column.position}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.columnDeleteButton}
            onPress={() => handleDeleteColumn(column.id)}>
            <Feather name="trash-2" size={18} color="#F56565" />
          </TouchableOpacity>
        </View>
      ))}

      <View style={styles.addColumnContainer}>
        <TextInput
          style={[styles.input, styles.columnInput]}
          placeholder="New column name"
          placeholderTextColor="#A0AEC0"
          value={newColumnName}
          onChangeText={setNewColumnName}
        />
        <TouchableOpacity
          style={styles.addColumnButton}
          onPress={handleAddColumn}>
          <Feather name="plus" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 3,
    // elevation: 1,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3748',
  },
  columnItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EDF2F7',
  },
  columnInfo: {
    flex: 1,
  },
  columnName: {
    fontSize: 15,
    fontWeight: '500',
    color: '#2D3748',
    marginBottom: 3,
  },
  columnPosition: {
    fontSize: 12,
    color: '#A0AEC0',
  },
  columnDeleteButton: {
    padding: 8,
  },
  addColumnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#2D3748',
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
  },
  columnInput: {
    marginRight: 10,
  },
  addColumnButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#4A90E2',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
