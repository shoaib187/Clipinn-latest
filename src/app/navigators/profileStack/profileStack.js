import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {screens} from '../../../components/constants/screens';

const Stack = createNativeStackNavigator();

//  ProfileHomePage,
//   About,
//   PersonalInfo,
//   PrivacyPolicy,
//   Support,

const ProfileStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="ProfileHomePage"
      screenOptions={{headerShown: false, animation: 'ios_from_right'}}>
      <Stack.Screen
        name="ProfileHomePage"
        component={screens.ProfileHomePage}
      />
      <Stack.Screen name="About" component={screens.About} />
      <Stack.Screen name="Support" component={screens.Support} />
      <Stack.Screen name="PersonalInfo" component={screens.PersonalInfo} />
      <Stack.Screen name="PrivacyPolicy" component={screens.PrivacyPolicy} />
    </Stack.Navigator>
  );
};

export {ProfileStack};
