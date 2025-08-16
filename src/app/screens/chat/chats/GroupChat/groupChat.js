import { useState } from 'react';
import { users } from '../../../utils/db';
import SearchBar from '../../../components/common/searchBar/searchBar';
import { FlatList } from 'react-native';
import ChatItem from '../../../components/common/chatItem/chatItem';

export default function GroupChats({ navigation }) {
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
        searchTerm={searchTerm}
        onChangeText={text => setSearchTerm(text)}
        renderItem={({ item, index }) => {
          return <ChatItem navigation={navigation} item={item} key={index} />;
        }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      />
    </>
  );
}
