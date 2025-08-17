import * as React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';

const OverviewRoute = () => (
  <View style={[styles.scene, {backgroundColor: '#f5f5f5'}]}>
    <Text style={styles.text}>📊 Overview Content</Text>
  </View>
);

const TaskRoute = () => (
  <View style={[styles.scene, {backgroundColor: '#e8f5e9'}]}>
    <Text style={styles.text}>✅ Task Content</Text>
  </View>
);

const QuestionRoute = () => (
  <View style={[styles.scene, {backgroundColor: '#e3f2fd'}]}>
    <Text style={styles.text}>❓ Question Content</Text>
  </View>
);

export default function MyTabs() {
  const layout = Dimensions.get('window');

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'overview', title: 'Overview'},
    {key: 'task', title: 'Task'},
    {key: 'question', title: 'Question'},
  ]);

  const renderScene = SceneMap({
    overview: OverviewRoute,
    task: TaskRoute,
    question: QuestionRoute,
  });

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{width: layout.width}}
      renderTabBar={props => (
        <TabBar
          {...props}
          indicatorStyle={{backgroundColor: '#007AFF', height: 3}}
          style={{backgroundColor: '#fff'}}
          labelStyle={{color: '#000', fontWeight: '600'}}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {fontSize: 20, fontWeight: 'bold'},
});
