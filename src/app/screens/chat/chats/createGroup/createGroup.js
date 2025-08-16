import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import { user } from '../../../utils/db';
import Header from '../../../components/homePage/header/header';
import { COLORS } from '../../../components/constants/colors';
import ChatItem from '../../../components/common/chatItem/chatItem';
import SearchBar from '../../../components/common/searchBar/searchBar';
import { FONT } from '../../../components/constants/font';
import TextButton from '../../../components/common/button/textButton';

export default function CreateGroupChat({ navigation }) {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const filteredUsers = user.filter(person =>
    person?.name?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const toggleSelectUser = person => {
    const alreadySelected = selectedUsers.find(u => u.id === person.id);
    if (alreadySelected) {
      setSelectedUsers(prev => prev.filter(u => u.id !== person.id));
    } else {
      setSelectedUsers(prev => [...prev, person]);
    }
  };

  const removeSelectedUser = userId => {
    setSelectedUsers(prev => prev.filter(u => u.id !== userId));
  };

  const renderSelectedUser = ({ item }) => (
    <View style={styles.selectedUserView}>
      <View style={styles.selectedUser}>
        <Image source={{ uri: item.image }} style={styles.avatarSmall} />
        <TouchableOpacity
          style={styles.removeIcon}
          onPress={() => removeSelectedUser(item.id)}
        >
          <Image
            source={require('../../../../assets/png/cross.png')}
            style={styles.checkIcon}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.selectedUserName}>{item?.name}</Text>
    </View>
  );

  const renderUserItem = ({ item }) => {
    const isSelected = selectedUsers.some(u => u.id === item.id);

    return (
      // <TouchableOpacity
      //   onPress={() => toggleSelectUser(item)}
      //   style={styles.userRow}
      // >
      //   <Image source={{ uri: item.image }} style={styles.avatar} />
      //   <Text style={styles.name}>{item.name}</Text>
      //   {isSelected && <Text style={styles.selectedMark}>✓</Text>}
      // </TouchableOpacity>

      <ChatItem
        onPress={() => toggleSelectUser(item)}
        navigation={navigation}
        item={item}
        isSelected={isSelected}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Header
        title={'New Group'}
        showBackArrow={true}
        titleStyle={{ color: COLORS.dark }}
        navigation={navigation}
      />
      <View>
        {/* Selected users like Story View */}
        {selectedUsers.length > 0 ? (
          <>
            <Text style={styles.selecteText}>
              {selectedUsers && selectedUsers.length} out of {user?.length}
            </Text>
            <FlatList
              data={selectedUsers}
              horizontal
              keyExtractor={item => item.id}
              renderItem={renderSelectedUser}
              contentContainerStyle={styles.selectedList}
            />
          </>
        ) : (
          <Text style={{ fontFamily: FONT.WorkSansMedium }}>Add Members</Text>
        )}
        <SearchBar
          searchTerm={searchTerm}
          onChangeText={text => setSearchTerm(text)}
          placeholder={'Search '}
        />
        <FlatList
          data={filteredUsers}
          keyExtractor={item => item?.name}
          renderItem={renderUserItem}
          showsVerticalScrollIndicator={false}
        />
      </View>
      {selectedUsers?.length > 1 && (
        <View style={styles.bottomButton}>
          <TextButton
            title={'Create Group'}
            onPress={() => navigation.navigate('GroupName', { selectedUsers })}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  selectedList: {
    paddingVertical: 10,
  },
  selectedUser: {
    alignItems: 'center',
    position: 'relative',
  },
  avatarSmall: {
    width: 56,
    height: 56,
    borderRadius: 50,
  },
  removeIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  removeText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  name: {
    fontSize: 16,
    flex: 1,
  },
  selectedMark: {
    fontSize: 18,
    color: '#5cb85c',
    fontWeight: 'bold',
  },
  checkIcon: {
    width: 20,
    height: 20,
    position: 'absolute',
    bottom: 0,
    right: -4,
  },
  selectedUserView: {
    alignItems: 'center',
    marginRight: 16,
  },
  selectedUserName: {
    fontFamily: FONT.WorkSansMedium,
    opacity: 0.7,
    marginTop: 4,
  },
  selecteText: {
    fontFamily: FONT.WorkSansMedium,
  },
  bottomButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});
