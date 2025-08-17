import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Animated,
} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';

import Overview from '../../../../components/static/tasks/overview/overview';
import RemainingTasks from '../../../../components/static/tasks/task/remainingTasks';
import Notes from '../../../../components/static/tasks/notes/notes';
import {COLORS} from '../../../../components/constants/colors';
import {wp} from '../../../../components/constants/responsiveSize';
import BackButton from '../../../../components/common/button/backButton';
import {FONT} from '../../../../components/constants/font';

const {height} = Dimensions.get('window');
const ITEM_HEIGHT = height * 0.2;

export default function ProjectDetails({navigation}) {
  const scrollY = useRef(new Animated.Value(0)).current;

  const layout = Dimensions.get('window');
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'overview', title: 'Overview'},
    {key: 'task', title: 'Task'},
    {key: 'notes', title: 'Notes'},
  ]);

  const renderScene = SceneMap({
    overview: Overview,
    task: RemainingTasks,
    notes: Notes,
  });

  const [finalHeight, setFinalHeight] = useState(null);
  const animatedHeight = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [ITEM_HEIGHT, finalHeight],
    extrapolate: 'clamp',
  });

  return (
    <SafeAreaView style={{flex: 1}}>
      <Animated.View
        style={[styles.header, {position: 'absolute', height: animatedHeight}]}
      />
      <BackButton
        iconColor={'#fff'}
        navigation={navigation}
        style={{position: 'absolute'}}
      />
      <View style={styles.info}>
        <Text numberOfLines={1} style={styles.title}>
          E-Commerce Mobile App
        </Text>
        <Text numberOfLines={1} style={styles.description}>
          E-Commerce Mobile App
        </Text>
      </View>
      <View style={styles.container}>
        <TabView
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{width: layout.width}}
          renderTabBar={props => (
            <TabBar
              {...props}
              indicatorStyle={{backgroundColor: COLORS.btnColor, height: 3}}
              style={styles.tabStlye}
              activeColor={COLORS.btnColor}
              labelStyle={{color: 'red', fontFamily: FONT.PoppinsMedium}}
              inactiveColor="#666"
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
  },
  header: {
    position: 'absolute',
    left: 0,
    right: 0,
    backgroundColor: COLORS.black,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginHorizontal: 14,
    borderRadius: 8,
    overflow: 'hidden',
    zIndex: 1111,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 15,
    position: 'relative',
  },
  activeTabButton: {
    backgroundColor: '#f8f9fa',
  },
  tabButtonText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  activeTabButtonText: {
    color: COLORS.btnColor,
    fontWeight: '600',
  },
  tabIndicator: {
    position: 'absolute',
    bottom: 0,
    height: 3,
    width: '100%',
    backgroundColor: COLORS.btnColor,
    borderRadius: 3,
  },
  tabStlye: {
    backgroundColor: '#fff',
    marginHorizontal: 14,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    elevation: 0,
  },
  title: {
    color: '#fff',
    fontSize: wp(7),
    fontFamily: FONT.PoppinsSemiBold,
    marginBottom: -4,
  },
  description: {
    color: '#fff',
    fontSize: wp(4),
    fontFamily: FONT.PoppinsRegular,
    marginBottom: -6,
  },
  info: {paddingHorizontal: 14, paddingVertical: 24, marginTop: 18},
});
