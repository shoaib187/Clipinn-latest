// ProfileMainPage.js
import React from 'react';
import {View, Text, StyleSheet, Image, StatusBar} from 'react-native';
import {wp} from '../../../../components/constants/responsiveSize';
import {COLORS} from '../../../../components/constants/colors';
import {FONT} from '../../../../components/constants/font';
import LargeButton from '../../../../components/common/largeButton/largeButton';

const ProfileMainPage = ({navigation}) => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.black} barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      {/* User Info */}
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

      {/* Menu Buttons */}
      <LargeButton
        onPress={() => navigation.navigate('PersonalInfo')}
        icon="user"
        title="Personal Info"
      />
      <LargeButton
        onPress={() => navigation.navigate('About')}
        icon="info"
        title="About Clipinn"
      />
      <LargeButton
        onPress={() => navigation.navigate('Support')}
        icon="headphones"
        title="Support"
      />
      <LargeButton
        onPress={() => navigation.navigate('PrivacyPolicy')}
        icon="shield"
        title="Privacy Policy"
      />
      <LargeButton
        icon="log-out"
        title="Logout"
        style={{marginTop: 10}}
        textIconStyle={{color: 'red'}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGrey || '#f5f5f5',
  },
  header: {
    backgroundColor: COLORS.black,
    paddingVertical: wp(3),
    paddingHorizontal: 14,
  },
  headerTitle: {
    fontFamily: FONT.PoppinsMedium,
    color: COLORS.white,
    fontSize: wp(6),
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 14,
    backgroundColor: COLORS.whiteColor,
    marginBottom: 10,
    // elevation: 2,
    // shadowColor: '#000',
    // shadowOpacity: 0.05,
    // shadowOffset: {width: 0, height: 2},
    // shadowRadius: 4,
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

export default ProfileMainPage;
