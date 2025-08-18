import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TextInput,
  FlatList,
  Animated,
  Easing,
  Dimensions,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS} from '../../../constants/colors';
import {wp} from '../../../constants/responsiveSize';

const {width} = Dimensions.get('window');

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');
  const [activeColor, setActiveColor] = useState('#5E8BFF');
  const fadeAnim = useState(new Animated.Value(0))[0];

  const colors = ['#5E8BFF', '#FF7675', '#6C5CE7', '#00B894', '#FD79A8'];

  const handleAddNote = () => {
    if (newNoteTitle.trim() === '' && newNoteContent.trim() === '') return;

    const newNote = {
      id: Date.now().toString(),
      title: newNoteTitle.trim() || 'Untitled',
      content: newNoteContent.trim(),
      date: new Date().toLocaleDateString(),
      color: activeColor,
    };

    setNotes(prev => [newNote, ...prev]);
    setNewNoteTitle('');
    setNewNoteContent('');
    closeModal();
  };

  const openModal = () => {
    setModalVisible(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start(() => setModalVisible(false));
  };

  const renderNote = ({item}) => (
    <LinearGradient
      colors={[item.color, `${item.color}`]}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={styles.noteCard}>
      <Text style={styles.noteTitle}>{item.title}</Text>
      {item.content ? (
        <Text style={styles.noteContent}>{item.content}</Text>
      ) : null}
      <View style={styles.noteFooter}>
        <Text style={styles.noteDate}>{item.date}</Text>
        <TouchableOpacity>
          <Ionicons
            name="ellipsis-horizontal"
            size={18}
            color="rgba(255,255,255,0.7)"
          />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );

  return (
    <LinearGradient colors={['#f8f9fa', '#eef2f5']} style={styles.container}>
      {notes.length === 0 ? (
        <ScrollView contentContainerStyle={styles.notesPlaceholder}>
          <Animated.View
            style={{
              transform: [
                {
                  scale: fadeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 1.1],
                  }),
                },
              ],
            }}>
            <MaterialIcons name="note-add" size={80} color="#d1d8e0" />
          </Animated.View>
          <Text style={styles.notesPlaceholderText}>
            Your notes will appear here
          </Text>
          <TouchableOpacity style={styles.addNoteButton} onPress={openModal}>
            <View style={styles.gradientButton}>
              <Text style={styles.addNoteButtonText}>Create First Note</Text>
              <MaterialIcons name="add" size={20} color="#fff" />
            </View>
          </TouchableOpacity>
        </ScrollView>
      ) : (
        <FlatList
          data={notes}
          keyExtractor={item => item.id}
          renderItem={renderNote}
          contentContainerStyle={{padding: 15}}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* Floating Add Button */}
      {notes.length > 0 && (
        <TouchableOpacity onPress={openModal} style={styles.fab}>
          <MaterialIcons name="add" size={28} color="#fff" />
        </TouchableOpacity>
      )}

      {/* Add Note Modal */}
      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent
        onRequestClose={closeModal}>
        <Animated.View style={[styles.modalOverlay, {opacity: fadeAnim}]}>
          <TouchableOpacity
            style={styles.modalBackdrop}
            activeOpacity={1}
            onPress={closeModal}
          />
          <Animated.View
            style={[
              styles.modalContainer,
              {
                transform: [
                  {
                    translateY: fadeAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [50, 0],
                    }),
                  },
                ],
              },
            ]}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>New Note</Text>
              <TouchableOpacity onPress={closeModal}>
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>

            <TextInput
              style={styles.input}
              placeholder="Title"
              placeholderTextColor="#999"
              value={newNoteTitle}
              onChangeText={setNewNoteTitle}
            />
            <TextInput
              style={[styles.input, styles.descriptionInput]}
              placeholder="Start writing..."
              placeholderTextColor="#999"
              value={newNoteContent}
              onChangeText={setNewNoteContent}
              multiline
            />

            <View style={styles.colorPicker}>
              {colors.map(color => (
                <TouchableOpacity
                  key={color}
                  style={[
                    styles.colorOption,
                    {backgroundColor: color},
                    activeColor === color && styles.activeColor,
                  ]}
                  onPress={() => setActiveColor(color)}
                />
              ))}
            </View>

            <TouchableOpacity style={styles.addButton} onPress={handleAddNote}>
              <LinearGradient
                colors={['#5E8BFF', '#3B6AFF']}
                style={styles.gradientButton}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}>
                <Text style={styles.addButtonText}>Save Note</Text>
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>
      </Modal>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  notesPlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  notesPlaceholderText: {
    fontSize: 18,
    color: '#a4b0be',
    marginTop: 20,
    marginBottom: 30,
    fontFamily: 'sans-serif-medium',
  },
  addNoteButton: {
    borderRadius: 25,
    overflow: 'hidden',
  },
  gradientButton: {
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.btnColor,
  },
  addNoteButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
    marginRight: 8,
  },

  noteCard: {
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.1,
    shadowRadius: 10,
    // elevation: 5,
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 8,
  },
  noteContent: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 15,
    lineHeight: 20,
  },
  noteFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  noteDate: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
  },

  fab: {
    position: 'absolute',
    bottom: 14,
    right: 14,
    borderRadius: 28,
    shadowColor: '#5E8BFF',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
    backgroundColor: COLORS.btnColor,
    width: wp(12),
    height: wp(12),
    alignItems: 'center',
    justifyContent: 'center',
  },
  // fabGradient: {
  //   width: 56,
  //   height: 56,
  //   borderRadius: 28,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },

  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBackdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    width: width - 40,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    backgroundColor: '#f5f7fa',
    borderRadius: 12,
    padding: 16,
    marginBottom: 15,
    fontSize: 16,
    color: '#333',
  },
  descriptionInput: {
    height: 120,
    textAlignVertical: 'top',
  },
  colorPicker: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  colorOption: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  activeColor: {
    borderWidth: 3,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  addButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
    paddingVertical: 14,
  },
});
