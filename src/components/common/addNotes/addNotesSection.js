import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  Modal,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {wp} from '../../constants/responsiveSize';
import {COLORS} from '../../constants/colors';
import NotesCard from '../notesCard/notesCard';

export default function AddNotesSection({notes, setNotes}) {
  // Notes
  // const [notes, setNotes] = useState([]);
  const [noteModalVisible, setNoteModalVisible] = useState(false);
  const [noteContent, setNoteContent] = useState('');
  const [notePriority, setNotePriority] = useState('medium');
  const [noteStatus, setNoteStatus] = useState('pending');
  const [noteReminder, setNoteReminder] = useState('none');
  const [noteCategory, setNoteCategory] = useState('general');

  const categories = [
    {id: 'general', name: 'General', icon: 'inbox', color: '#4A90E2'},
    {id: 'development', name: 'Development', icon: 'code', color: '#50C9BA'},
    {id: 'research', name: 'Research', icon: 'search', color: '#F5A623'},
  ];

  const statusOptions = [
    {id: 'pending', name: 'Pending', icon: 'clock', color: '#F56565'},
    {
      id: 'in-progress',
      name: 'In Progress',
      icon: 'refresh-cw',
      color: '#4A90E2',
    },
    {
      id: 'completed',
      name: 'Completed',
      icon: 'check-circle',
      color: '#48BB78',
    },
  ];

  const reminderOptions = [
    {id: 'none', name: 'None', icon: 'bell-off'},
    {id: 'daily', name: 'Daily', icon: 'sun'},
    {id: 'weekly', name: 'Weekly', icon: 'calendar'},
    {id: 'monthly', name: 'Monthly', icon: 'moon'},
  ];

  const handleAddNote = () => {
    if (!noteContent.trim()) {
      Alert.alert('Error', 'Please enter note content');
      return;
    }
    const newNote = {
      id: Date.now().toString(),
      content: noteContent,
      priority: notePriority,
      status: noteStatus,
      reminder: noteReminder,
      category: noteCategory,
      createdAt: new Date(),
    };
    setNotes([...notes, newNote]);
    setNoteContent('');
    setNoteModalVisible(false);
  };

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Notes</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setNoteModalVisible(true)}>
          <Text style={styles.addButtonText}>Add Note</Text>
        </TouchableOpacity>
      </View>

      {notes.length === 0 ? (
        <View style={styles.emptyState}>
          <Feather name="file-text" size={40} color="#E2E8F0" />
          <Text style={styles.emptyStateText}>No notes added yet</Text>
        </View>
      ) : (
        notes.map(note => (
          <NotesCard categories={categories} note={note} />
          // <View key={note.id} style={styles.noteCard}>
          //   <Text style={styles.noteContent}>{note.content}</Text>
          //   <View style={styles.noteMeta}>
          //     <View
          //       style={[
          //         styles.noteBadge,
          //         {
          //           backgroundColor: `${
          //             categories.find(c => c.id === note.category)?.color
          //           }20`,
          //         },
          //       ]}>
          //       <Text
          //         style={[
          //           styles.noteBadgeText,
          //           {
          //             color: categories.find(c => c.id === note.category)
          //               ?.color,
          //           },
          //         ]}>
          //         {categories.find(c => c.id === note.category)?.name}
          //       </Text>
          //     </View>
          //     <Text style={styles.noteDate}>
          //       {note.createdAt.toLocaleDateString()}
          //     </Text>
          //   </View>
          // </View>
        ))
      )}

      {/* Add Note Modal */}
      <Modal
        animationType="fade"
        transparent
        visible={noteModalVisible}
        onRequestClose={() => setNoteModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add New Note</Text>
              <TouchableOpacity onPress={() => setNoteModalVisible(false)}>
                <Feather name="x" size={24} color="#A0AEC0" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalContent}>
              {/* Content Input */}
              <View style={styles.formGroup}>
                <Text style={styles.label}>Content</Text>
                <View style={[styles.inputContainer, {height: 120}]}>
                  <TextInput
                    style={[
                      styles.input,
                      {height: 110, textAlignVertical: 'top'},
                    ]}
                    placeholder="Enter note content..."
                    placeholderTextColor="#A0AEC0"
                    multiline
                    value={noteContent}
                    onChangeText={setNoteContent}
                  />
                </View>
              </View>

              {/* Priority */}
              <View style={styles.formGroup}>
                <Text style={styles.label}>Priority</Text>
                <View style={styles.priorityContainer}>
                  {['high', 'medium', 'low'].map(level => (
                    <TouchableOpacity
                      key={level}
                      style={[
                        styles.modalPriorityButton,
                        notePriority === level &&
                          styles[`${level}PriorityActive`],
                      ]}
                      onPress={() => setNotePriority(level)}>
                      <MaterialIcons
                        name={
                          level === 'high'
                            ? 'keyboard-arrow-up'
                            : level === 'low'
                            ? 'keyboard-arrow-down'
                            : 'remove'
                        }
                        size={20}
                        color={notePriority === level ? '#fff' : '#A0AEC0'}
                      />
                      <Text
                        style={[
                          styles.priorityText,
                          notePriority === level && styles.priorityTextActive,
                        ]}>
                        {level.charAt(0).toUpperCase() + level.slice(1)}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Status */}
              <View style={styles.formGroup}>
                <Text style={styles.label}>Status</Text>
                <View style={styles.statusContainer}>
                  {statusOptions.map(status => (
                    <TouchableOpacity
                      key={status.id}
                      style={[
                        styles.statusButton,
                        noteStatus === status.id && {
                          backgroundColor: `${status.color}20`,
                          borderColor: status.color,
                        },
                      ]}
                      onPress={() => setNoteStatus(status.id)}>
                      <Feather
                        name={status.icon}
                        size={16}
                        color={
                          noteStatus === status.id ? status.color : '#A0AEC0'
                        }
                      />
                      <Text
                        style={[
                          styles.statusText,
                          noteStatus === status.id && {color: status.color},
                        ]}>
                        {status.name}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Reminder */}
              <View style={styles.formGroup}>
                <Text style={styles.label}>Reminder</Text>
                <View style={styles.reminderContainer}>
                  {reminderOptions.map(reminder => (
                    <TouchableOpacity
                      key={reminder.id}
                      style={[
                        styles.reminderButton,
                        noteReminder === reminder.id &&
                          styles.reminderButtonActive,
                      ]}
                      onPress={() => setNoteReminder(reminder.id)}>
                      <Feather
                        name={reminder.icon}
                        size={16}
                        color={
                          noteReminder === reminder.id ? '#4A90E2' : '#A0AEC0'
                        }
                      />
                      <Text
                        style={[
                          styles.reminderText,
                          noteReminder === reminder.id && {color: '#4A90E2'},
                        ]}>
                        {reminder.name}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Category */}
              <View style={styles.formGroup}>
                <Text style={styles.label}>Category</Text>
                <View style={styles.categoryContainer}>
                  {categories.map(cat => (
                    <TouchableOpacity
                      key={cat.id}
                      style={[
                        styles.categoryButton,
                        noteCategory === cat.id && {
                          backgroundColor: `${cat.color}20`,
                          borderColor: cat.color,
                        },
                      ]}
                      onPress={() => setNoteCategory(cat.id)}>
                      <View
                        style={[
                          styles.categoryIconContainer,
                          {backgroundColor: cat.color},
                        ]}>
                        <Feather name={cat.icon} size={16} color="#fff" />
                      </View>
                      <Text
                        style={[
                          styles.categoryText,
                          noteCategory === cat.id && {color: cat.color},
                        ]}>
                        {cat.name}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </ScrollView>

            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={styles.modalCancelButton}
                onPress={() => setNoteModalVisible(false)}>
                <Text style={styles.modalCancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalAddButton}
                onPress={handleAddNote}>
                <Text style={styles.modalAddButtonText}>Add Note</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  addButton: {
    backgroundColor: '#EBF8FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  addButtonText: {
    color: '#4A90E2',
    fontSize: 14,
    fontWeight: '500',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  emptyStateText: {
    fontSize: 14,
    color: '#A0AEC0',
    marginTop: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 14,
    borderRadius: 12,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#EDF2F7',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D3748',
  },
  modalContent: {
    paddingHorizontal: 14,
    paddingTop: 15,
  },
  formGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#718096',
    marginBottom: 8,
  },
  inputContainer: {
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    paddingHorizontal: 8,
    // paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    fontSize: wp(3.7),
    color: '#2D3748',
  },
  priorityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalPriorityButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#F8FAFC',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  priorityText: {
    fontSize: 14,
    color: '#718096',
    marginLeft: 5,
    fontWeight: '500',
  },
  priorityTextActive: {
    color: '#fff',
  },
  highPriorityActive: {
    backgroundColor: '#F56565',
    borderColor: '#F56565',
  },
  mediumPriorityActive: {
    backgroundColor: '#4A90E2',
    borderColor: '#4A90E2',
  },
  lowPriorityActive: {
    backgroundColor: '#48BB78',
    borderColor: '#48BB78',
  },
  statusContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    // justifyContent: 'space-between',
  },
  statusButton: {
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#F8FAFC',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  statusText: {
    fontSize: 14,
    color: '#718096',
    marginLeft: 5,
    fontWeight: '500',
  },
  reminderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  reminderButton: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#F8FAFC',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  reminderButtonActive: {
    backgroundColor: '#EBF8FF',
    borderColor: '#4A90E2',
  },
  reminderText: {
    fontSize: 14,
    color: '#718096',
    marginLeft: 5,
    fontWeight: '500',
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  categoryButton: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 8,
  },
  categoryIconContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  categoryText: {
    fontSize: 14,
    color: '#718096',
    fontWeight: '500',
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#EDF2F7',
  },
  modalCancelButton: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#F8FAFC',
    marginRight: 10,
  },
  modalCancelButtonText: {
    fontSize: 16,
    color: '#718096',
    fontWeight: '500',
  },
  modalAddButton: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: COLORS.btnColor,
  },
  modalAddButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
  },
});
