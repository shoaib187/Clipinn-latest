import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Linking,
  Alert,
  StatusBar,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/MaterialIcons';
import ProfileHeader from '../../../../components/common/profileHeader/profileHeader';
import {COLORS} from '../../../../components/constants/colors';

const Support = ({navigation}) => {
  const [feedback, setFeedback] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmitFeedback = () => {
    if (!feedback.trim()) {
      Alert.alert('Error', 'Please enter your feedback');
      return;
    }
    Alert.alert('Thank You!', 'Your feedback has been submitted.');
    setFeedback('');
    setEmail('');
  };

  const openLink = url => {
    Linking.openURL(url).catch(err =>
      Alert.alert('Error', 'Failed to open link'),
    );
  };

  const faqs = [
    {
      question: 'How do I reset my password?',
      answer: 'Go to Settings > Account > Reset Password.',
    },
    {
      question: 'Why is my attendance not recorded?',
      answer:
        'Ensure you have a stable internet connection during check-in/out.',
    },
    {
      question: 'How to request leave?',
      answer: 'Navigate to the Leave tab and submit a request.',
    },
  ];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{paddingBottom: 30}}>
      <StatusBar
        backgroundColor={COLORS.black}
        barStyle="light-content"
        animated
      />
      <ProfileHeader title={'Support center'} navigation={navigation} />

      {/* Contact Options */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact Us</Text>

        <TouchableOpacity
          style={styles.contactCard}
          onPress={() => openLink('mailto:support@attendanceapp.com')}>
          <MaterialIcons name="email" size={24} color="#FF5722" />
          <Text style={styles.contactText}>
            Email: support@attendanceapp.com
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.contactCard}
          onPress={() => openLink('tel:+1234567890')}>
          <MaterialIcons name="phone" size={24} color="#4CAF50" />
          <Text style={styles.contactText}>Call: +1 (234) 567-890</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.contactCard}
          onPress={() => openLink('https://wa.me/1234567890')}>
          <FontAwesome name="whatsapp" size={24} color="#25D366" />
          <Text style={styles.contactText}>WhatsApp Chat</Text>
        </TouchableOpacity>
      </View>

      {/* FAQs */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>FAQs</Text>
        {faqs.map((item, index) => (
          <View key={index} style={styles.faqCard}>
            <Text style={styles.faqQuestion}>
              <AntDesign name="questioncircle" size={16} color="#6200EE" />{' '}
              {item.question}
            </Text>
            <Text style={styles.faqAnswer}>{item.answer}</Text>
          </View>
        ))}
      </View>

      {/* Feedback Form */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Send Feedback</Text>
        <TextInput
          style={styles.input}
          placeholder="Your email (optional)"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          style={[styles.input, {height: 100, textAlignVertical: 'top'}]}
          placeholder="Describe your issue or suggestion..."
          multiline
          value={feedback}
          onChangeText={setFeedback}
        />
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmitFeedback}>
          <Text style={styles.submitButtonText}>Submit Feedback</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 25,
    backgroundColor: '#6200EE',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  subHeader: {
    fontSize: 16,
    color: 'white',
    opacity: 0.9,
  },
  section: {
    marginHorizontal: 14,
    marginVertical: 6,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  contactText: {
    fontSize: 15,
    marginLeft: 15,
    color: '#444',
  },
  faqCard: {
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  faqAnswer: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
    marginLeft: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 15,
  },
  submitButton: {
    backgroundColor: COLORS.btnColor,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Support;
