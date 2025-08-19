import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {COLORS} from '../../constants/colors';

export default function AskQuestion({questions, setQuestions}) {
  // const [questions, setQuestions] = useState([]);
  const [questionText, setQuestionText] = useState('');

  const handleAddQuestion = () => {
    if (!questionText.trim()) {
      Alert.alert('Error', 'Please enter a question');
      return;
    }

    setQuestions(prev => [
      ...prev,
      {id: Date.now().toString(), text: questionText},
    ]);
    setQuestionText('');
  };

  const handleDeleteQuestion = id => {
    setQuestions(prev => prev.filter(q => q.id !== id));
  };

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Questions</Text>
      </View>

      <View style={styles.addQuestionContainer}>
        <TextInput
          style={[styles.input, styles.questionInput]}
          placeholder="Add a question..."
          placeholderTextColor="#A0AEC0"
          value={questionText}
          onChangeText={setQuestionText}
        />
        <TouchableOpacity
          style={styles.addQuestionButton}
          onPress={handleAddQuestion}>
          <Feather name="plus" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {questions.length > 0 && (
        <View style={styles.questionsList}>
          {questions.map(question => (
            <View key={question.id} style={styles.questionItem}>
              <Text style={styles.questionText}>{question.text}</Text>
              <TouchableOpacity
                style={styles.questionDeleteButton}
                onPress={() => handleDeleteQuestion(question.id)}>
                <Feather name="trash-2" size={16} color="#F56565" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 3,
    // elevation: 1,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 12,
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
  input: {
    flex: 1,
    fontSize: 15,
    color: '#2D3748',
    paddingRight: 25,
  },
  addQuestionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
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
  addQuestionButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: COLORS.btnColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionsList: {
    borderTopWidth: 1,
    borderTopColor: '#EDF2F7',
  },
  questionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EDF2F7',
  },
  questionText: {
    flex: 1,
    fontSize: 14,
    color: '#2D3748',
  },
  questionDeleteButton: {
    padding: 8,
  },
});
