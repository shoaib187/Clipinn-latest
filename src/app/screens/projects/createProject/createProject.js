import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Animated,
  Alert,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import CreateProjectSection from '../../../../components/common/createProject/createProjectSection';
import AddNotesSection from '../../../../components/common/addNotes/addNotesSection';
import AskQuestion from '../../../../components/common/askQuestion/askQuestion';
import Button from '../../../../components/common/button/button';
import AddColumnSection from '../../../../components/common/addColumnSection/addColumnSection';
import {COLORS} from '../../../../components/constants/colors';
import {FONT} from '../../../../components/constants/font';
import {wp} from '../../../../components/constants/responsiveSize';

export default function CreateProject({navigation}) {
  // Project Details
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [priority, setPriority] = useState('medium');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Columns
  const [columns, setColumns] = useState([
    {id: '1', name: 'To Do', position: 1},
    {id: '2', name: 'In Progress', position: 2},
    {id: '3', name: 'Done', position: 3},
  ]);

  // Notes states
  const [notes, setNotes] = useState([]);
  // Questions states
  const [questions, setQuestions] = useState([]);

  const fadeAnim = new Animated.Value(0);

  const handleSubmit = () => {
    if (!projectName.trim()) {
      Alert.alert('Error', 'Please enter a project name');
      return;
    }

    console.log({
      projectName,
      description,
      startDate,
      endDate,
      priority,
      columns,
      notes,
      questions,
    });

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      Alert.alert('Success', 'Project created successfully', [
        {text: 'OK', onPress: () => navigation.goBack()},
      ]);
    }, 1500);
  };

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAvoidingView style={styles.container}>
        <Animated.View
          style={[
            styles.header,
            // { opacity: fadeAnim }
          ]}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}>
            <Feather name="chevron-left" size={28} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Create New Project</Text>
          <View style={styles.headerRight} />
        </Animated.View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}>
          <CreateProjectSection
            projectName={projectName}
            setProjectName={setProjectName}
            description={description}
            setDescription={setDescription}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            priority={priority}
            setPriority={setPriority}
          />
          <AddColumnSection columns={columns} setColumns={setColumns} />
          <AddNotesSection notes={notes} setNotes={setNotes} />
          <AskQuestion questions={questions} setQuestions={setQuestions} />
          <Button onPress={handleSubmit} title={'Create Project'} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: COLORS.black,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: wp(5),
    color: '#fff',
    fontFamily: FONT.PoppinsMedium,
    marginBottom: -6,
  },
  headerRight: {
    width: 28,
  },
  content: {
    paddingHorizontal: 14,
    paddingVertical: 20,
  },
});
