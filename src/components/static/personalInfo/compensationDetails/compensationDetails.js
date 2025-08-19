import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; // ✅ Import added
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

const CompensationDetails = () => {
  const compensationData = {
    annualBonus: '$2,500',
    stockOptions: '500 shares',
    healthInsurance: 'Premium Plan',
    retirementPlan: '401(k) with 5% match',
    vacationDays: '20 days/year',
    sickDays: '10 days/year',
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.screenContainer}>
      <Text style={styles.sectionTitle}>Compensation Package</Text>
      <View style={styles.section}>
        <InfoField
          label="Annual Bonus"
          value={compensationData.annualBonus}
          icon="monetization-on"
        />
        <InfoField
          label="Stock Options"
          value={compensationData.stockOptions}
          icon="show-chart"
        />
        <InfoField
          label="Health Insurance"
          value={compensationData.healthInsurance}
          icon="health-and-safety"
        />
        <InfoField
          label="Retirement Plan"
          value={compensationData.retirementPlan}
          icon="account-balance"
        />
        <InfoField
          label="Vacation Days"
          value={compensationData.vacationDays}
          icon="beach-access"
        />
        <InfoField
          label="Sick Days"
          value={compensationData.sickDays}
          icon="medical-services"
        />
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
    backgroundColor: COLORS.whiteColor,
    borderRadius: 12,
    marginHorizontal: 14,
    marginBottom: 14,
    elevation: 3, // ✅ subtle shadow for Android
    shadowColor: '#000', // ✅ shadow for iOS
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: FONT.bold, // ✅ use custom font if available
    color: '#333',
    marginLeft: 14,
    marginBottom: 4,
    marginTop: 10,
  },
  infoField: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ddd',
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
    fontFamily: FONT.medium,
    color: '#444',
  },
  fieldValue: {
    fontSize: 15,
    fontFamily: FONT.regular,
    color: '#666',
  },
});

export default CompensationDetails;
