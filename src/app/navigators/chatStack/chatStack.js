import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {screens} from '../../../components/constants/screens';

const Stack = createNativeStackNavigator();

const ChatStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="ChatHomePage"
      screenOptions={{headerShown: false, animation: 'ios_from_right'}}>
      <Stack.Screen name="ChatHomePage" component={screens.ChatHomePage} />
      <Stack.Screen name="ChatInbox" component={screens.ChatInbox} />
    </Stack.Navigator>
  );
};

export {ChatStack};
