import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';

import LinearGradient from 'react-native-linear-gradient';
import {Image, StyleSheet, View} from 'react-native';
import ChatHomePage from '../../screens/chats/chatHomePage/chatHomePage';
import {COLORS} from '../../../components/constants/colors';
import {wp} from '../../../components/constants/responsiveSize';
import {FONT} from '../../../components/constants/font';
import Home from '../../screens/home/homeMainPage/home';
import FacialRecognition from '../../screens/facialRecognition/facialRecognition';
import {AttendanceStack} from '../attendanceStack/attendanceStack';
import {TaskStack} from '../projectStack/projectStack';

const IconImage = ({icon}) => (
  <Image source={icon} style={styles.icon} resizeMode="cover" />
);

const Tab = createBottomTabNavigator();

// screens where tab bar should be hidden
const hiddenRoutes = [
  'FacialRecognition',
  'MarkWithQrCode',
  'MarkByLocation',
  'CreateProject',
];

const TabNavigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({route}) => {
          // check if the current screen is a nested one
          const routeName = getFocusedRouteNameFromRoute(route) ?? route.name;
          const isHidden = hiddenRoutes.includes(routeName);

          return {
            headerShown: false,
            tabBarStyle: [
              {
                backgroundColor: '#fff',
                height: 65,
                elevation: 0,
                paddingTop: 10,
              },
              isHidden && {display: 'none'},
            ],
            tabBarLabelStyle: {
              color: COLORS.btnColor,
              fontFamily: FONT.PoppinsMedium,
              marginTop: 2,
            },
            // eslint-disable-next-line react/no-unstable-nested-components
            tabBarIcon: ({focused}) => {
              let iconName;
              switch (route.name) {
                case 'Home':
                  iconName = focused
                    ? require('../../../../assets/png/tabIcons/home-active.png')
                    : require('../../../../assets/png/tabIcons/home-inactive.png');
                  break;
                case 'Attendance':
                  iconName = focused
                    ? require('../../../../assets/png/tabIcons/calendar-active.png')
                    : require('../../../../assets/png/tabIcons/calendar-inactive.png');
                  break;
                case 'FacialRecognition':
                  iconName = require('../../../../assets/png/tabIcons/scan.png');
                  break;
                case 'Projects':
                  iconName = focused
                    ? require('../../../../assets/png/tabIcons/task-active.png')
                    : require('../../../../assets/png/tabIcons/task-inactive.png');
                  break;
                case 'Chats':
                  iconName = focused
                    ? require('../../../../assets/png/tabIcons/chat-active.png')
                    : require('../../../../assets/png/tabIcons/chat-inactive.png');
                  break;
                default:
                  iconName = 'ellipse';
              }
              return (
                <>
                  <LinearGradient
                    colors={
                      focused
                        ? [COLORS.bgColor, 'transparent']
                        : ['transparent', 'transparent']
                    }
                    style={styles.iconWrapper}
                  />
                  {focused && <View style={styles.activeBar} />}
                  <IconImage icon={iconName} />
                </>
              );
            },
          };
        }}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Attendance" component={AttendanceStack} />
        <Tab.Screen name="FacialRecognition" component={FacialRecognition} />
        <Tab.Screen name="Projects" component={TaskStack} />
        <Tab.Screen name="Chats" component={ChatHomePage} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export {TabNavigation};

const styles = StyleSheet.create({
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    width: 30,
    height: 55,
    overflow: 'hidden',
    position: 'absolute',
  },
  icon: {
    width: wp(7),
    height: wp(7),
    resizeMode: 'contain',
  },
  activeBar: {
    position: 'absolute',
    top: '-50%',
    width: '70%',
    height: 4,
    backgroundColor: COLORS.btnColor,
    borderRadius: 40,
  },
});
