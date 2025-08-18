import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {screens} from '../../../components/constants/screens';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomePage"
      screenOptions={{headerShown: false, animation: 'ios_from_right'}}>
      <Stack.Screen name="HomePage" component={screens.HomePage} />
      <Stack.Screen name="Notifications" component={screens.Notifications} />
      <Stack.Screen name="ApplyForLeave" component={screens.ApplyForLeave} />
    </Stack.Navigator>
  );
};

export {HomeStack};
