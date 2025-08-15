import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {screens} from '../../../components/constants/screens';

const Stack = createNativeStackNavigator();

const TaskStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="ProjectHomePage"
      screenOptions={{headerShown: false, animation: 'ios_from_right'}}>
      <Stack.Screen
        name="ProjectHomePage"
        component={screens.ProjectHomePage}
      />
      <Stack.Screen name="ProjectDetails" component={screens.ProjectDetails} />
      <Stack.Screen
        name="CreateProject"
        component={screens.CreateProject}
        options={{animation: 'fade_from_bottom'}}
      />
    </Stack.Navigator>
  );
};

export {TaskStack};
