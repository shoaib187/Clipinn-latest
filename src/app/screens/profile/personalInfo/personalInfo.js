import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ProfileHeader from '../../../../components/common/profileHeader/profileHeader';
import {COLORS} from '../../../../components/constants/colors';
import {wp} from '../../../../components/constants/responsiveSize';
import {FONT} from '../../../../components/constants/font';

const PersonalInfo = () => {
  // Sample employee data (would normally come from API/state)
  const employee = {
    // Personal Details
    name: 'John Doe',
    email: 'john.doe@company.com',
    phone: '+1 (555) 123-4567',
    nationality: 'United States',

    // Job Details
    jobTitle: 'Software Developer',
    department: 'Engineering',
    employeeType: 'Full-time',
    accessRole: 'Developer',
    joiningDate: '2023-05-15',

    // Payment Details
    bankName: 'Chase Bank',
    accountHolder: 'John Doe',
    paymentMethod: 'Direct Deposit',
    currency: 'USD',

    // Address
    primaryAddress: '123 Tech Street',
    city: 'San Francisco',
    state: 'California',
    street: 'Tech Street',

    photo:
      'https://images.unsplash.com/photo-1621272036047-bb0f76bbc1ad?w=400&auto=format&fit=crop&q=60',
    status: 'Active',
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        animated
        backgroundColor={COLORS.black}
        barStyle="light-content"
      />
      {/* Profile Header */}
      <ProfileHeader title={'Personal information'} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}>
        <View style={styles.profileCard}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1621272036047-bb0f76bbc1ad?w=400&auto=format&fit=crop&q=60',
            }}
            style={styles.avatar}
          />
          <View>
            <Text style={styles.name}>Muhammad Shoaib</Text>
            <Text style={styles.email}>shoaibriaze@gmail.com</Text>
          </View>
        </View>

        {/* Personal Details Section */}
        <Text style={styles.sectionTitle}>Personal Details</Text>
        <View style={styles.section}>
          <InfoField label="Full Name" value={employee.name} icon="person" />
          <InfoField label="Email" value={employee.email} icon="email" />
          <InfoField label="Phone" value={employee.phone} icon="phone" />
          <InfoField
            label="Nationality"
            value={employee.nationality}
            icon="flag"
          />
        </View>

        {/* Job Details Section */}
        <Text style={styles.sectionTitle}>Job Details</Text>
        <View style={styles.section}>
          <InfoField label="Job Title" value={employee.jobTitle} icon="work" />
          <InfoField
            label="Department"
            value={employee.department}
            icon="business"
          />
          <InfoField
            label="Employee Type"
            value={employee.employeeType}
            icon="assignment-ind"
          />
          <InfoField
            label="Access Role"
            value={employee.accessRole}
            icon="security"
          />
          <InfoField
            label="Joining Date"
            value={employee.joiningDate}
            icon="event"
          />
        </View>

        {/* Payment Details Section */}
        <Text style={styles.sectionTitle}>Payment Details</Text>
        <View style={styles.section}>
          <InfoField
            label="Bank Name"
            value={employee.bankName}
            icon="account-balance"
          />
          <InfoField
            label="Account Holder"
            value={employee.accountHolder}
            icon="account-circle"
          />
          <InfoField
            label="Payment Method"
            value={employee.paymentMethod}
            icon="payment"
          />
          <InfoField
            label="Currency"
            value={employee.currency}
            icon="attach-money"
          />
        </View>

        {/* Address Section */}
        <Text style={styles.sectionTitle}>Address</Text>
        <View style={styles.section}>
          <InfoField
            label="Primary Address"
            value={employee.primaryAddress}
            icon="home"
          />
          <InfoField label="City" value={employee.city} icon="location-city" />
          <InfoField label="State" value={employee.state} icon="map" />
          <InfoField label="Street" value={employee.street} icon="streetview" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// Reusable component for info fields
const InfoField = ({label, value, icon}) => (
  <View style={styles.infoField}>
    <View style={styles.fieldLabelContainer}>
      {icon && (
        <MaterialIcons
          name={icon}
          size={20}
          color="#757575"
          style={styles.fieldIcon}
        />
      )}
      <Text style={styles.fieldLabel}>{label}</Text>
    </View>
    <Text style={styles.fieldValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  contentContainer: {
    paddingBottom: 10,
  },
  profileHeader: {
    alignItems: 'center',
    padding: 25,
    backgroundColor: '#6200EE',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  employeeName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  employeePosition: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 10,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 15,
  },
  statusIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  employeeStatus: {
    fontSize: 14,
    color: 'white',
  },
  section: {
    marginVertical: 6,
    paddingHorizontal: 14,
    paddingVertical: 20,
    backgroundColor: 'white',
    borderRadius: 12,
    marginHorizontal: 14,
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 14,
    marginBottom: 4,
  },
  infoField: {
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  fieldLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  fieldIcon: {
    marginRight: 8,
  },
  fieldLabel: {
    fontSize: 16,
    color: '#212121',
  },
  fieldValue: {
    fontSize: 14,
    color: '#757575',
    paddingLeft: 28,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 14,
    backgroundColor: COLORS.whiteColor,
    marginBottom: 10,
    // elevation: 2,
    // shadowColor: '#000',
    // shadowOpacity: 0.05,
    // shadowOffset: {width: 0, height: 2},
    // shadowRadius: 4,
  },
  avatar: {
    width: wp(20),
    height: wp(20),
    borderRadius: 100,
  },
  name: {
    fontSize: wp(5),
    fontFamily: FONT.PoppinsMedium,
    marginBottom: -4,
  },
  email: {
    fontFamily: FONT.PoppinsRegular,
    color: COLORS.paraColor,
  },
});

export default PersonalInfo;
