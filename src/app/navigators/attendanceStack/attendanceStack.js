import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { screens } from '../../../components/constants/screens';

const Stack = createNativeStackNavigator();

const AttendanceStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="AttendanceHomePage"
      screenOptions={{ headerShown: false, animation: 'ios_from_right' }}
    >
      <Stack.Screen
        name="AttendanceHomePage"
        component={screens.AttendanceHomePage}
      />
      <Stack.Screen
        name="AttendanceHistory"
        component={screens.AttendanceHistory}
      />
    </Stack.Navigator>
  );
};

export { AttendanceStack };
