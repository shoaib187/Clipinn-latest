import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {COLORS} from '../../../../components/constants/colors';
import {FONT} from '../../../../components/constants/font';
import {wp} from '../../../../components/constants/responsiveSize';

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

const PersonalDetails = () => {
  const employee = {
    name: 'John Doe',
    email: 'john.doe@company.com',
    phone: '+1 (555) 123-4567',
    nationality: 'United States',
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.screenContainer}>
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

      <Text style={styles.sectionTitle}>Job Details</Text>
      <View style={styles.section}>
        <InfoField label="Job Title" value="Software Developer" icon="work" />
        <InfoField label="Department" value="Engineering" icon="business" />
        <InfoField
          label="Employee Type"
          value="Full-time"
          icon="assignment-ind"
        />
        <InfoField label="Access Role" value="Developer" icon="security" />
        <InfoField label="Joining Date" value="2023-05-15" icon="event" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  section: {
    marginVertical: 6,
    paddingHorizontal: 14,
    paddingVertical: 20,
    backgroundColor: 'white',
    borderRadius: 12,
    marginHorizontal: 14,
    marginBottom: 14,
    // elevation: 2,
    // shadowColor: '#000',
    // shadowOpacity: 0.05,
    // shadowOffset: {width: 0, height: 2},
    // shadowRadius: 4,
    borderWidth: 1.4,
    borderColor: '#eee',
  },
  sectionTitle: {
    fontSize: wp(4.5),
    fontFamily: FONT.PoppinsSemiBold,
    color: '#333',
    marginLeft: 14,
    marginBottom: 8,
    marginTop: 10,
  },
  infoField: {
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderBottomColor: '#eee',
    paddingBottom: 10,
  },
  fieldLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fieldIcon: {
    marginRight: 8,
  },
  fieldLabel: {
    fontSize: 15,
    fontFamily: FONT.PoppinsMedium,
    color: '#212121',
  },
  fieldValue: {
    fontSize: 14,
    fontFamily: FONT.PoppinsRegular,
    color: '#757575',
  },
});

export default PersonalDetails;
