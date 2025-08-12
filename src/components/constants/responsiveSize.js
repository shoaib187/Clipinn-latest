import { widthPercentageToDP as wpPerc } from 'react-native-responsive-screen';

export const wp = val => {
  return wpPerc(`${val}%`);
};
