import React, {useState, useRef} from 'react';
import {
  View,
  TouchableOpacity,
  Animated,
  StyleSheet,
  StatusBar,
  TextInput,
  Easing,
  Dimensions,
  Text,
  TouchableWithoutFeedback,
  TouchableHighlight,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import ChatItem from '../../../../components/common/chatItem/chatItem';
import {COLORS} from '../../../../components/constants/colors';
import {wp} from '../../../../components/constants/responsiveSize';
import {FONT} from '../../../../components/constants/font';
import {chats} from '../../../../utils/common/services/services';

const {height, width} = Dimensions.get('window');
const ITEM_HEIGHT = height * 0.18;

export default function ChatMainPage({navigation}) {
  const [searchText, setSearchText] = useState('');
  const [filteredChats, setFilteredChats] = useState(chats);
  const [menuVisible, setMenuVisible] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));
  const scrollY = useRef(new Animated.Value(0)).current;

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

  // animated menu

  const menuPosition = useRef(new Animated.Value(0)).current;

  const toggleMenu = () => {
    if (menuVisible) {
      Animated.timing(menuPosition, {
        toValue: 0,
        duration: 200,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start(() => setMenuVisible(false));
    } else {
      setMenuVisible(true);
      Animated.timing(menuPosition, {
        toValue: 1,
        duration: 200,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
    }
  };

  const menuOptions = [
    {
      id: 1,
      title: 'New Chat',
      icon: 'people-outline',
      action: () => {
        toggleMenu();
        navigation.navigate('NewGroup');
      },
    },
    // {
    //   id: 2,
    //   title: 'New broadcast',
    //   icon: 'megaphone-outline',
    //   action: () => {
    //     toggleMenu();
    //     navigation.navigate('NewBroadcast');
    //   },
    // },
    // {
    //   id: 3,
    //   title: 'Linked devices',
    //   icon: 'desktop-outline',
    //   action: () => {
    //     toggleMenu();
    //     navigation.navigate('LinkedDevices');
    //   },
    // },
    {
      id: 4,
      title: 'Starred messages',
      icon: 'star-outline',
      action: () => {
        toggleMenu();
        navigation.navigate('StarredMessages');
      },
    },
    {
      id: 5,
      title: 'Settings',
      icon: 'settings-outline',
      action: () => {
        toggleMenu();
        navigation.navigate('Settings');
      },
    },
  ];

  const menuTranslateY = menuPosition.interpolate({
    inputRange: [0, 1],
    outputRange: [-20, 0],
  });

  const menuOpacity = menuPosition.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={COLORS.black}
        barStyle="light-content"
        animated
      />
      <Animated.View
        style={[
          styles.headerBackground,
          // { height: headerHeight }
        ]}
      />

      {/* HEADER CONTENT */}
      <Animated.View
        style={[
          styles.header,
          // { height: headerHeight }
        ]}>
        <View style={styles.headerContent}>
          <Animated.Text style={[styles.headerTitle]}>Chats</Animated.Text>
          <TouchableOpacity onPress={toggleMenu} style={styles.menuButton}>
            <Ionicons name="ellipsis-vertical" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* menu items */}
        <Animated.View
          style={[
            styles.menuContainer,
            {
              opacity: menuOpacity,
              transform: [{translateY: menuTranslateY}],
              display: menuVisible ? 'flex' : 'none',
            },
          ]}>
          {menuOptions.map(option => (
            <TouchableOpacity
              key={option.id}
              style={styles.menuItem}
              onPress={option.action}>
              <Ionicons
                name={option.icon}
                size={20}
                color="#555"
                style={styles.menuIcon}
              />
              <Text style={styles.menuText}>{option.title}</Text>
            </TouchableOpacity>
          ))}
        </Animated.View>

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
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: false},
        )}
      />

      <TouchableOpacity
        style={styles.newChatButton}
        onPress={() => navigation.navigate('NewChat')}>
        <Ionicons name="chatbubble-ellipses" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 14,
    backgroundColor: COLORS.black,
    zIndex: 1111,
    paddingVertical: 24,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginTop: 12,
  },
  headerTitle: {
    color: 'white',
    fontSize: wp(6),
    fontFamily: FONT.PoppinsSemiBold,
    marginBottom: -6,
  },
  headerSubtitle: {
    fontSize: wp(4),
    color: '#777',
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
    // height: 70,
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

  menuButton: {
    padding: 5,
  },

  menuContainer: {
    position: 'absolute',
    top: 60,
    right: 12,
    width: width * 0.6,
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    paddingVertical: 8,
    zIndex: 11,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  menuIcon: {
    marginRight: 12,
    width: 24,
    textAlign: 'center',
  },
  menuText: {
    fontSize: 16,
    color: '#333',
  },
});
