import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
  StatusBar,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import ProfileHeader from '../../../../components/common/profileHeader/profileHeader';
import {COLORS} from '../../../../components/constants/colors';

const About = ({navigation}) => {
  const openLink = url => {
    Linking.openURL(url).catch(err =>
      console.error('Failed to open URL:', err),
    );
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{paddingBottom: 30}}>
      <StatusBar
        backgroundColor={COLORS.black}
        barStyle="light-content"
        animated
      />

      {/* Header with App Logo */}
      <ProfileHeader title={'About '} navigation={navigation} />
      {/* App Description */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About This App</Text>
        <Text style={styles.sectionText}>
          The Employee Attendance App helps organizations streamline attendance
          tracking, manage shifts, and generate reports effortlessly. Designed
          for HR teams and employees.
        </Text>
      </View>

      {/* Key Features */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Key Features</Text>

        <View style={styles.featureCard}>
          <MaterialIcons name="fingerprint" size={24} color="#4CAF50" />
          <Text style={styles.featureText}>Biometric & QR Code Check-In</Text>
        </View>

        <View style={styles.featureCard}>
          <MaterialIcons name="schedule" size={24} color="#2196F3" />
          <Text style={styles.featureText}>Real-Time Shift Tracking</Text>
        </View>

        <View style={styles.featureCard}>
          <Feather name="file-text" size={24} color="#FF9800" />
          <Text style={styles.featureText}>Automated Reports</Text>
        </View>

        <View style={styles.featureCard}>
          <FontAwesome name="bell-o" size={24} color="#9C27B0" />
          <Text style={styles.featureText}>Leave Request Alerts</Text>
        </View>
      </View>

      {/* Contact Support */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Need Help?</Text>
        <TouchableOpacity
          style={styles.contactCard}
          onPress={() => openLink('mailto:support@attendanceapp.com')}>
          <MaterialIcons name="email" size={24} color="#FF5722" />
          <Text style={styles.contactText}>Email Support</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.contactCard}
          onPress={() => openLink('tel:+1234567890')}>
          <MaterialIcons name="phone" size={24} color="#4CAF50" />
          <Text style={styles.contactText}>Call Support</Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <Text style={styles.footerText}>
        © 2024 Employee Attendance App. All rights reserved.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  header: {
    alignItems: 'center',
    padding: 14,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 10,
  },

  section: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: 'white',
    // borderRadius: 12,
    // elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  sectionText: {
    fontSize: 15,
    color: '#555',
    lineHeight: 22,
  },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    padding: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  featureText: {
    fontSize: 15,
    marginLeft: 15,
    color: '#444',
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    padding: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  contactText: {
    fontSize: 15,
    marginLeft: 15,
    color: '#333',
  },
  developerCard: {
    alignItems: 'center',
    padding: 10,
  },
  companyLogo: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  companyText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  versionText: {
    fontSize: 14,
    color: '#777',
    marginTop: 5,
  },
  footerText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#888',
  },
});

export default About;
