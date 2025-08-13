import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {screens} from '../../../components/constants/screens';

const Stack = createNativeStackNavigator();

const AttendanceStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="AttendanceHomePage"
      screenOptions={{headerShown: false, animation: 'ios_from_right'}}>
      <Stack.Screen
        name="AttendanceHomePage"
        component={screens.AttendanceHomePage}
      />
      <Stack.Screen
        name="AttendanceHistory"
        component={screens.AttendanceHistory}
      />
      <Stack.Screen
        name="MarkWithQrCode"
        component={screens.MarkWithQrCode}
        options={{animation: 'fade_from_bottom'}}
      />
      <Stack.Screen
        name="MarkByLocation"
        component={screens.MarkByLocation}
        options={{animation: 'fade_from_bottom'}}
      />
    </Stack.Navigator>
  );
};

export {AttendanceStack};
