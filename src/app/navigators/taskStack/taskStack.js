import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {screens} from '../../../components/constants/screens';

const Stack = createNativeStackNavigator();

const TaskStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="TaskHomePage"
      screenOptions={{headerShown: false, animation: 'ios_from_right'}}>
      <Stack.Screen name="TaskHomePage" component={screens.TaskHomePage} />
      <Stack.Screen name="TaskDetails" component={screens.TaskDetails} />
    </Stack.Navigator>
  );
};

export {TaskStack};
