import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import ProfileHeader from '../../../../components/common/profileHeader/profileHeader';
import {COLORS} from '../../../../components/constants/colors';
import {wp} from '../../../../components/constants/responsiveSize';
import {FONT} from '../../../../components/constants/font';

import PersonalDetails from '../../../../components/static/personalInfo/personalDetails/personalDetails';
import AttendanceDetails from '../../../../components/static/personalInfo/attendanceDetails/attendanceDetails';
import PayrollDetails from '../../../../components/static/personalInfo/payrollDetails/payrollDetails';
import CompensationDetails from '../../../../components/static/personalInfo/compensationDetails/compensationDetails';
import TaskDetails from '../../../../components/static/personalInfo/taskDetails/taskDetails';

const PersonalInfo = ({navigation}) => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'personal', title: 'Personal'},
    {key: 'attendance', title: 'Attendance'},
    {key: 'payroll', title: 'Payroll'},
    {key: 'compensation', title: 'Benefits'},
    {key: 'tasks', title: 'Tasks'},
  ]);

  const renderScene = SceneMap({
    personal: PersonalDetails,
    attendance: AttendanceDetails,
    payroll: PayrollDetails,
    compensation: CompensationDetails,
    tasks: TaskDetails,
  });

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={styles.tabIndicator}
      style={styles.tabBar}
      activeColor={COLORS.btnColor}
      inactiveColor={COLORS.paraColor}
      scrollEnabled={true}
      tabStyle={styles.tabStyle}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        animated
        backgroundColor={COLORS.black}
        barStyle="light-content"
      />
      <ProfileHeader navigation={navigation} title={'Employee Details'} />
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
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: wp(100)}}
        renderTabBar={renderTabBar}
        style={styles.tabView}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  tabView: {
    flex: 1,
  },
  tabBar: {
    backgroundColor: COLORS.whiteColor,
    elevation: 0,
    shadowOpacity: 0,
  },
  tabIndicator: {
    backgroundColor: COLORS.btnColor,
    height: 3,
  },
  tabLabel: {
    fontFamily: FONT.PoppinsMedium,
    fontSize: wp(3.5),
    textTransform: 'capitalize',
  },
  tabStyle: {
    width: 'auto',
    paddingHorizontal: 10,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 14,
    backgroundColor: COLORS.whiteColor,
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
