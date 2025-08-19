import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
} from 'react-native';
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

const PayrollDetails = () => {
  // Sample payroll data for multiple years
  const allPayrollData = [
    {
      year: 2023,
      basicSalary: '$5,000',
      allowances: '$1,200',
      deductions: '$300',
      netSalary: '$5,900',
      bankName: 'Chase Bank',
      accountNumber: '**** **** **** 1234',
      paymentMethod: 'Direct Deposit',
      lastPaymentDate: '2023-05-30',
    },
    {
      year: 2022,
      basicSalary: '$4,800',
      allowances: '$1,100',
      deductions: '$280',
      netSalary: '$5,620',
      bankName: 'Chase Bank',
      accountNumber: '**** **** **** 1234',
      paymentMethod: 'Direct Deposit',
      lastPaymentDate: '2022-05-30',
    },
    {
      year: 2021,
      basicSalary: '$4,600',
      allowances: '$1,000',
      deductions: '$250',
      netSalary: '$5,350',
      bankName: 'Chase Bank',
      accountNumber: '**** **** **** 1234',
      paymentMethod: 'Direct Deposit',
      lastPaymentDate: '2021-05-30',
    },
    {
      year: 2020,
      basicSalary: '$4,400',
      allowances: '$900',
      deductions: '$220',
      netSalary: '$5,080',
      bankName: 'Chase Bank',
      accountNumber: '**** **** **** 1234',
      paymentMethod: 'Direct Deposit',
      lastPaymentDate: '2020-05-30',
    },
    {
      year: 2019,
      basicSalary: '$4,200',
      allowances: '$800',
      deductions: '$200',
      netSalary: '$4,800',
      bankName: 'Chase Bank',
      accountNumber: '**** **** **** 1234',
      paymentMethod: 'Direct Deposit',
      lastPaymentDate: '2019-05-30',
    },
  ];

  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [showYearFilter, setShowYearFilter] = useState(false);

  // Get the last 5 years
  const currentYear = new Date().getFullYear();
  const years = Array.from({length: 5}, (_, i) => currentYear - i);

  // Filter payroll data by selected year
  const filteredPayrollData =
    allPayrollData.find(item => item.year === selectedYear) ||
    allPayrollData[0];

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.screenContainer}>
      {/* Year Filter Header */}
      <View style={styles.filterHeader}>
        <Text style={styles.sectionTitle}>Payroll Details</Text>
        <TouchableOpacity
          style={styles.yearFilterButton}
          onPress={() => setShowYearFilter(true)}>
          <Text style={styles.yearFilterText}>{selectedYear}</Text>
          <MaterialIcons
            name="arrow-drop-down"
            size={20}
            color={COLORS.primary}
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Salary Information</Text>
      <View style={styles.section}>
        <InfoField
          label="Basic Salary"
          value={filteredPayrollData.basicSalary}
          icon="attach-money"
        />
        <InfoField
          label="Allowances"
          value={filteredPayrollData.allowances}
          icon="add-circle"
        />
        <InfoField
          label="Deductions"
          value={filteredPayrollData.deductions}
          icon="remove-circle"
        />
        <InfoField
          label="Net Salary"
          value={filteredPayrollData.netSalary}
          icon="account-balance-wallet"
        />
      </View>

      <Text style={styles.sectionTitle}>Payment Information</Text>
      <View style={styles.section}>
        <InfoField
          label="Bank Name"
          value={filteredPayrollData.bankName}
          icon="account-balance"
        />
        <InfoField
          label="Account Number"
          value={filteredPayrollData.accountNumber}
          icon="credit-card"
        />
        <InfoField
          label="Payment Method"
          value={filteredPayrollData.paymentMethod}
          icon="payment"
        />
        <InfoField
          label="Last Payment Date"
          value={filteredPayrollData.lastPaymentDate}
          icon="event"
        />
      </View>

      {/* Year Filter Modal */}
      <Modal
        visible={showYearFilter}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowYearFilter(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Year</Text>
            {years.map(year => (
              <TouchableOpacity
                key={year}
                style={[
                  styles.yearItem,
                  selectedYear === year && styles.selectedYearItem,
                ]}
                onPress={() => {
                  setSelectedYear(year);
                  setShowYearFilter(false);
                }}>
                <Text
                  style={[
                    styles.yearText,
                    selectedYear === year && styles.selectedYearText,
                  ]}>
                  {year}
                </Text>
                {selectedYear === year && (
                  <MaterialIcons
                    name="check"
                    size={20}
                    color={COLORS.primary}
                  />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  filterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 14,
    marginTop: 10,
  },
  yearFilterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  yearFilterText: {
    fontSize: 14,
    color: COLORS.primary,
    marginRight: 5,
  },
  section: {
    marginVertical: 6,
    paddingHorizontal: 14,
    paddingVertical: 20,
    backgroundColor: COLORS.whiteColor,
    borderRadius: 12,
    marginHorizontal: 14,
    marginBottom: 14,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
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
  // Modal styles
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: FONT.PoppinsSemiBold,
    color: COLORS.primary,
    marginBottom: 15,
    textAlign: 'center',
  },
  yearItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  selectedYearItem: {
    backgroundColor: '#f5f5f5',
  },
  yearText: {
    fontSize: 16,
    fontFamily: FONT.PoppinsRegular,
    color: '#333',
  },
  selectedYearText: {
    fontFamily: FONT.PoppinsSemiBold,
    color: COLORS.primary,
  },
});

export default PayrollDetails;
