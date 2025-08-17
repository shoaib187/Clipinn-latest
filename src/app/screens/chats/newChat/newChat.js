import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Animated,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {chats, users} from '../../../../utils/common/services/services';
import ChatItem from '../../../../components/common/chatItem/chatItem';
import {COLORS} from '../../../../components/constants/colors';
import {wp} from '../../../../components/constants/responsiveSize';
import {FONT} from '../../../../components/constants/font';
import UserChatView from '../../../../components/common/userChatView/userChatView';

export default function NewChat({navigation}) {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={[
          styles.header,
          // { opacity: fadeAnim }
        ]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Feather name="chevron-left" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Start chat</Text>
        <View style={styles.headerRight} />
      </View>
      <FlatList
        data={chats}
        renderItem={({item}) => (
          <UserChatView
            item={item}
            onPress={() => navigation.navigate('ChatInbox', {user: item.user})}
          />
        )}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        // contentContainerStyle={{paddingTop: ITEM_HEIGHT + 20}}
        // onScroll={Animated.event(
        //   [{nativeEvent: {contentOffset: {y: scrollY}}}],
        //   {useNativeDriver: false},
        // )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: COLORS.black,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: wp(5),
    color: '#fff',
    fontFamily: FONT.PoppinsMedium,
    marginBottom: -6,
  },
  headerRight: {
    width: 28,
  },
});
