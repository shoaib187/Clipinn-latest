import React from 'react';
import {
  ScrollView,
  Text,
  StyleSheet,
  View,
  Linking,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ProfileHeader from '../../../../components/common/profileHeader/profileHeader';
import {COLORS} from '../../../../components/constants/colors';

const PrivacyPolicy = ({navigation}) => {
  const openEmail = () => {
    Linking.openURL('mailto:privacy@yourapp.com');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={COLORS.black}
        barStyle="light-content"
        animated
      />
      <ProfileHeader
        title={'Privacy policy'}
        onPress={() => navigation.goBack()}
      />
      <ScrollView contentContainerStyle={{paddingHorizontal: 14}}>
        <Text style={styles.header}>Privacy Policy</Text>
        <Text style={styles.lastUpdated}>Last updated: June 15, 2024</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. Information We Collect</Text>
          <Text style={styles.sectionText}>
            Our app collects the following information to provide attendance
            tracking services:
          </Text>
          <Text style={styles.bulletPoint}>
            • Employee identification details
          </Text>
          <Text style={styles.bulletPoint}>
            • Attendance records (check-in/check-out times)
          </Text>
          <Text style={styles.bulletPoint}>
            • Device information for security purposes
          </Text>
          <Text style={styles.bulletPoint}>
            • Location data (if location-based attendance is enabled)
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            2. How We Use Your Information
          </Text>
          <Text style={styles.sectionText}>
            The information we collect is used for:
          </Text>
          <Text style={styles.bulletPoint}>
            • Accurate attendance tracking and reporting
          </Text>
          <Text style={styles.bulletPoint}>
            • Payroll processing and workforce management
          </Text>
          <Text style={styles.bulletPoint}>
            • Improving app functionality and user experience
          </Text>
          <Text style={styles.bulletPoint}>
            • Complying with legal obligations
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>3. Data Security</Text>
          <Text style={styles.sectionText}>
            We implement industry-standard security measures including:
          </Text>
          <Text style={styles.bulletPoint}>
            • End-to-end encryption for data transmission
          </Text>
          <Text style={styles.bulletPoint}>
            • Secure server storage with access controls
          </Text>
          <Text style={styles.bulletPoint}>• Regular security audits</Text>
          <Text style={styles.bulletPoint}>
            • Two-factor authentication options
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>4. Third-Party Services</Text>
          <Text style={styles.sectionText}>
            We may use third-party services that have their own privacy
            policies:
          </Text>
          <Text style={styles.bulletPoint}>• Cloud storage providers</Text>
          <Text style={styles.bulletPoint}>
            • Analytics services (anonymous usage data only)
          </Text>
          <Text style={styles.bulletPoint}>
            • Payment processors (if applicable)
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>5. Your Rights</Text>
          <Text style={styles.sectionText}>You have the right to:</Text>
          <Text style={styles.bulletPoint}>• Access your personal data</Text>
          <Text style={styles.bulletPoint}>
            • Request correction of inaccurate data
          </Text>
          <Text style={styles.bulletPoint}>
            • Request deletion of your data (where applicable)
          </Text>
          <Text style={styles.bulletPoint}>
            • Opt-out of non-essential data collection
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>6. Changes to This Policy</Text>
          <Text style={styles.sectionText}>
            We may update this policy periodically. Significant changes will be
            notified through the app or via email.
          </Text>
        </View>

        <View style={styles.contactSection}>
          <Text style={styles.contactTitle}>Contact Us</Text>
          <Text style={styles.contactText}>
            For privacy-related inquiries or requests:
          </Text>
          <TouchableOpacity style={styles.contactButton} onPress={openEmail}>
            <MaterialIcons name="email" size={20} color="#FFFFFF" />
            <Text style={styles.contactButtonText}>Email Privacy Officer</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.footer}>
          By using this app, you acknowledge that you have read and understood
          this Privacy Policy.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 5,
  },
  lastUpdated: {
    fontSize: 14,
    color: '#7F8C8D',
    marginBottom: 25,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 10,
  },
  sectionText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#34495E',
    marginBottom: 10,
  },
  bulletPoint: {
    fontSize: 15,
    lineHeight: 22,
    color: '#34495E',
    marginLeft: 15,
    marginBottom: 5,
  },
  contactSection: {
    backgroundColor: '#E8F4F8',
    padding: 20,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 20,
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 10,
  },
  contactText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#34495E',
    marginBottom: 15,
  },
  contactButton: {
    backgroundColor: '#3498DB',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
  },
  contactButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 10,
  },
  footer: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#7F8C8D',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default PrivacyPolicy;
