import React, {useState, useRef} from 'react';
import {
  View,
  TouchableOpacity,
  Animated,
  FlatList,
  StyleSheet,
  StatusBar,
  Text,
  TextInput,
  Easing,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ChatItem from '../../../../components/common/chatItem/chatItem';
import {COLORS} from '../../../../components/constants/colors';
import {wp} from '../../../../components/constants/responsiveSize';
import {FONT} from '../../../../components/constants/font';
import {chats} from '../../../../utils/common/services/services';

const {height} = Dimensions.get('window');
const ITEM_HEIGHT = height * 0.18; // slightly smaller header for balance

export default function ChatMainPage({navigation}) {
  const [searchText, setSearchText] = useState('');
  const [filteredChats, setFilteredChats] = useState(chats);
  const [menuVisible, setMenuVisible] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));
  const scrollY = useRef(new Animated.Value(0)).current;

  const toggleMenu = () => {
    if (menuVisible) {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 250,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start(() => setMenuVisible(false));
    } else {
      setMenuVisible(true);
      Animated.timing(fadeAnim, {
        toValue: 0.6,
        duration: 250,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start();
    }
  };

  const handleSearch = text => {
    setSearchText(text);

    const filtered = chats.filter(chat => {
      const name = chat.user.name.toLowerCase();
      const message = chat.lastMessage.text.toLowerCase();
      const search = text.toLowerCase();
      return name.includes(search) || message.includes(search);
    });

    setFilteredChats(filtered);
  };

  // HEADER animation interpolations
  const headerHeight = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [ITEM_HEIGHT, 70],
    extrapolate: 'clamp',
  });

  const titleScale = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: [1, 0.85],
    extrapolate: 'clamp',
  });

  const subtitleOpacity = scrollY.interpolate({
    inputRange: [0, 120],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const searchTranslateY = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: [0, -40],
    extrapolate: 'clamp',
  });

  const searchScale = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: [1, 0.9],
    extrapolate: 'clamp',
  });

  const searchOpacity = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      {/* Animated HEADER BACKGROUND */}
      <Animated.View
        style={[styles.headerBackground, {height: headerHeight}]}
      />

      {/* HEADER CONTENT */}
      <Animated.View style={[styles.header, {height: headerHeight}]}>
        <View style={styles.headerContent}>
          <Animated.Text style={[styles.headerTitle]}>Chats</Animated.Text>
          <TouchableOpacity onPress={toggleMenu}>
            <Ionicons name="ellipsis-vertical" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Subtitle */}
        <Animated.Text
          style={[styles.headerSubtitle, {opacity: subtitleOpacity}]}>
          Chat with team members
        </Animated.Text>

        {/* Search Bar */}
        <Animated.View
          style={[
            styles.searchBarContainer,
            {
              transform: [{translateY: searchTranslateY}, {scale: searchScale}],
              opacity: searchOpacity,
            },
          ]}>
          <Ionicons
            name="search"
            size={18}
            color="#aaa"
            style={{marginRight: 8}}
          />
          <TextInput
            placeholder="Search chats..."
            placeholderTextColor="#999"
            value={searchText}
            onChangeText={handleSearch}
            style={styles.searchInput}
          />
        </Animated.View>
      </Animated.View>

      {/* Chat List */}
      <Animated.FlatList
        data={filteredChats}
        renderItem={({item}) => (
          <ChatItem
            item={item}
            onPress={() => navigation.navigate('ChatInbox', {user: item.user})}
          />
        )}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingTop: ITEM_HEIGHT + 20}}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: false},
        )}
      />

      <TouchableOpacity style={styles.newChatButton}>
        <Ionicons name="chatbubble-ellipses" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: '#fff',
  },
  headerBackground: {
    position: 'absolute',
    top: StatusBar.currentHeight || 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.black,
    zIndex: -1,
  },
  header: {
    position: 'absolute',
    top: StatusBar.currentHeight,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    backgroundColor: COLORS.black,
    zIndex: 1111,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  headerTitle: {
    color: 'white',
    fontSize: wp(7),
    fontFamily: FONT.PoppinsSemiBold,
  },
  headerSubtitle: {
    fontSize: wp(4),
    color: '#ccc',
    fontFamily: FONT.PoppinsRegular,
    marginTop: 4,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginTop: 12,
    paddingHorizontal: 12,
    height: 70,
  },
  searchInput: {
    flex: 1,
    color: '#111',
    fontSize: wp(3.5),
    fontFamily: FONT.PoppinsRegular,
    marginBottom: -6,
  },
  newChatButton: {
    position: 'absolute',
    bottom: 14,
    right: 14,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.btnColor,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'black',
  },
  menu: {
    position: 'absolute',
    top: StatusBar.currentHeight + 70,
    right: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 8,
    width: 160,
    elevation: 5,
  },
  menuItem: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
});
