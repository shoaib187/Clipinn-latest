import {
  View,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import SearchBar from '../../components/common/searchBar/searchBar';
import { users } from '../../utils/db';
import { COLORS } from '../../components/constants/colors';
import { FONT } from '../../components/constants/font';
import Header from '../../components/homePage/header/header';
import ChatItem from '../../components/common/chatItem/chatItem';
import GroupChats from './GroupChat/groupChat';

function Chat({ navigation }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = users.filter(user =>
    user?.name?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <>
      <SearchBar
        searchTerm={searchTerm}
        onChangeText={text => setSearchTerm(text)}
        placeholder={'Search by rep, customer tag'}
      />
      <FlatList
        data={filteredUsers}
        keyExtractor={item => item?.name}
        renderItem={({ item, index }) => {
          return (
            <ChatItem
              navigation={navigation}
              item={item}
              key={index}
              onPress={() => navigation.navigate('Messages', { item })}
            />
          );
        }}
        showsVerticalScrollIndicator={false}
      />
    </>
  );
}

export default function Chats({ navigation }) {
  const [active, setActive] = useState(0);
  const renderContent = () => {
    switch (active) {
      case 0:
        return <Chat navigation={navigation} />;
      case 1:
        return <GroupChats navigation={navigation} />;
      default:
        <GroupChats />;
    }
  };

  return (
    <View style={styles.container}>
      <Header
        title="Chat"
        titleStyle={{ color: COLORS.dark }}
        navigation={navigation}
        showLeftIcon={true}
        showPlusIcon={true}
        leftIconSrc={require('../../../assets/png/hamburger1.png')}
        onPress={() => navigation.navigate('Profile')}
        onPlusIconClick={() => navigation.navigate('CreateGroupChat')}
      />
      <View style={styles.chatWrapper}>
        <View style={styles.tabWrapper}>
          {['Chats', 'Groups'].map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setActive(index)}
              style={[
                styles.btnStyle,
                {
                  borderBottomWidth: index === active ? 2 : 0,
                  borderBottomColor:
                    index === active ? COLORS.secondaryColor : '',
                },
              ]}
            >
              <Text
                style={[
                  styles.tabButton,
                  {
                    color:
                      index === active
                        ? COLORS.secondaryColor
                        : COLORS.lightDark,
                  },
                ]}
                key={index}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ flex: 1 }}>{renderContent()}</View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chatWrapper: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 12,
  },
  tabWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1.5,
    borderBottomColor: COLORS.borderColor,
    marginBottom: 8,
  },
  btnStyle: {
    paddingVertical: 12,
    top: 1,
    width: '50%',
  },
  tabButton: {
    fontFamily: FONT.WorkSansMedium,
    textAlign: 'center',
  },
  subContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
