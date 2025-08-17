import React, {useState, useCallback, useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  StatusBar,
  Platform,
  SafeAreaView,
  KeyboardAvoidingView,
} from 'react-native';
import {
  GiftedChat,
  Bubble,
  Send,
  InputToolbar,
  Composer,
  Actions,
} from 'react-native-gifted-chat';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../../../components/constants/colors';

export default function ChatInbox({route, navigation}) {
  const {user} = route.params;
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const initialMessages = [
      {
        _id: 1,
        text: 'Hello there!',
        createdAt: new Date(Date.now() - 1000 * 60 * 60),
        user,
      },
      {
        _id: 2,
        text: 'Hi! How are you?',
        createdAt: new Date(Date.now() - 1000 * 60 * 30),
        user: {
          _id: 1,
          name: 'You',
          avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
        },
      },
      {
        _id: 3,
        text: "I'm doing great! Working on a new project.",
        createdAt: new Date(Date.now() - 1000 * 60 * 5),
        user,
      },
    ];
    setMessages(initialMessages.reverse());
  }, [user]);

  const onSend = useCallback((messages = []) => {
    setMessages(prev => GiftedChat.append(prev, messages));
  }, []);

  const renderBubble = props => (
    <Bubble
      {...props}
      wrapperStyle={{
        left: {backgroundColor: '#fff', marginBottom: 4},
        right: {backgroundColor: '#DCF8C6', marginBottom: 4},
      }}
      textStyle={{
        left: {color: '#000'},
        right: {color: '#000'},
      }}
      timeTextStyle={{
        left: {color: 'rgba(0,0,0,0.5)'},
        right: {color: 'rgba(0,0,0,0.5)'},
      }}
    />
  );

  const renderSend = props => (
    <Send {...props} containerStyle={styles.sendContainer}>
      <View style={styles.sendButton}>
        <Ionicons name="send" size={16} color="white" />
      </View>
    </Send>
  );

  const renderInputToolbar = props => (
    <InputToolbar
      {...props}
      containerStyle={styles.inputToolbar}
      primaryStyle={{alignItems: 'center'}}
    />
  );

  const renderComposer = props => (
    <Composer
      {...props}
      textInputStyle={styles.composer}
      placeholder="Type a message..."
    />
  );

  const renderActions = props => (
    <Actions
      {...props}
      containerStyle={styles.actionsContainer}
      icon={() => <Ionicons name="attach" size={22} color={COLORS.btnColor} />}
    />
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar
        backgroundColor={COLORS.black}
        barStyle="light-content"
        animated
      />
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Image source={{uri: user.avatar}} style={styles.headerAvatar} />
          <View style={styles.headerText}>
            <Text style={styles.headerName}>{user.name}</Text>
            <Text style={styles.headerStatus}>
              {user.isOnline ? 'online' : 'last seen recently'}
            </Text>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="search" size={20} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="ellipsis-vertical" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}>
          <GiftedChat
            messages={messages}
            onSend={msgs => onSend(msgs)}
            user={{_id: 1}}
            renderBubble={renderBubble}
            renderSend={renderSend}
            renderInputToolbar={renderInputToolbar}
            renderComposer={renderComposer}
            renderActions={renderActions}
            alwaysShowSend
            scrollToBottom
            keyboardShouldPersistTaps="handled"
            showUserAvatar={false}
            renderAvatar={() => null}
          />
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: COLORS.black,
  },
  backButton: {
    marginRight: 8,
  },
  headerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  headerText: {
    flex: 1,
  },
  headerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  headerStatus: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
  },
  headerActions: {
    flexDirection: 'row',
  },
  actionButton: {
    marginLeft: 16,
  },
  inputToolbar: {
    backgroundColor: 'white',
    borderTopWidth: 0,
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  composer: {
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    paddingHorizontal: 12,
    fontSize: 15,
    color: '#333',
    minHeight: 40,
    maxHeight: 120,
  },
  sendContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 4,
  },
  sendButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.btnColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 4,
    // backgroundColor: 'red',
    top: 2,
  },
  scrollToBottom: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
});
