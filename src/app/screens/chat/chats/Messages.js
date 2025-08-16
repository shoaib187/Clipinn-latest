import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Alert,
  TouchableOpacity,
} from 'react-native';
import React, { useState, useRef } from 'react';
import IconButton from '../../components/common/button/iconButton';
import { COLORS } from '../../components/constants/colors';
import { FONT } from '../../components/constants/font';
import Header from '../../components/homePage/header/header';
import Video from 'react-native-video';
import FromMe from '../../components/chats/fromMe/fromMe';
import FromSender from '../../components/chats/fromSender/fromSender';
import MessageInput from '../../components/common/messageInput/messageInput';
import {
  playRecording,
  recordVoice,
  stopRecording,
} from '../../utils/voiceRecording';
import VoiceRecording from '../../components/common/chatVoiceRecording/chatVoiceRecording';
import MediaViewer from '../../components/common/fullScreenView/fullScreenView';

export default function Messages({ route, navigation }) {
  const { item } = route?.params;
  const [message, setMessage] = useState('');
  const [media, setMedia] = useState([]);
  const flatListRef = useRef();

  // for voice recording
  const [recordedPath, setRecordedPath] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [recordTime, setRecordTime] = useState('00:00');
  const [isRecording, setIsRecording] = useState(false);
  const [isVoiceFlow, setIsVoiceFlow] = useState(false);

  const [fullMedia, setFullMedia] = useState(null);
  const [isMediaViewerVisible, setIsMediaViewerVisible] = useState(false);

  const openMediaViewer = media => {
    setFullMedia(media);
    setIsMediaViewerVisible(true);
  };

  const closeMediaViewer = () => {
    setIsMediaViewerVisible(false);
    setFullMedia(null);
  };

  const [messages, setMessages] = useState([
    {
      sender: 'UserA',
      text: 'Hey! I just finished building the authentication flow with JWT tokens 🔐',
      fromMe: true,
      time: '10:15 AM',
    },
    {
      sender: 'UserB',
      text: 'Nice! Are you storing the refresh tokens securely?',
      fromMe: false,
      time: '10:16 AM',
    },
    {
      sender: 'UserA',
      text: 'Yep, stored them in HttpOnly cookies to prevent XSS.',
      fromMe: true,
      time: '10:17 AM',
    },
    {
      sender: 'UserB',
      text: 'Smart move! How’s the front-end integration going?',
      fromMe: false,
      time: '10:18 AM',
    },
    {
      sender: 'UserB',
      text: 'BTW, I pushed the new UI for the dashboard. Check it out!',
      fromMe: false,
      time: '10:19 AM',
    },
    {
      sender: 'UserA',
      text: 'Just saw it—really clean work! Loved the responsive layout 👍',
      fromMe: true,
      time: '10:20 AM',
    },
    {
      sender: 'UserB',
      text: 'Thanks! Thinking of adding dark mode next. What do you think?',
      fromMe: false,
      time: '10:21 AM',
    },
    {
      sender: 'UserA',
      text: 'Absolutely! Let’s use Context API to manage the theme state 🌙',
      fromMe: true,
      time: '10:22 AM',
    },
    {
      sender: 'UserB',
      text: 'Perfect. Also, I refactored some of the Redux logic. Much cleaner now.',
      fromMe: false,
      time: '10:23 AM',
    },
    {
      sender: 'UserA',
      text: 'Awesome! This project is shaping up really well 🚀',
      fromMe: true,
      time: '10:24 AM',
    },
    {
      sender: 'UserB',
      text: 'Yeah! Let’s aim to have the MVP ready by the end of the week.',
      fromMe: false,
      time: '10:25 AM',
    },
  ]);

  const sendMessage = () => {
    if (!message.trim() && media.length === 0) return;
    const time = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

    const newMessage = {
      sender: 'Me',
      text: message.trim(),
      fromMe: true,
      time,
      media:
        media.length > 0
          ? media.map(m => ({
              path: m.path,
              type: m.mime.includes('video') ? 'video' : 'image',
            }))
          : undefined,
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage('');
    setMedia([]);
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const renderItem = ({ item }) => {
    return (
      <View style={{ width: '100%', paddingHorizontal: 12 }}>
        {item.fromMe ? (
          <FromMe
            item={item}
            isPlaying={isPlaying}
            handleTogglePlay={handlePlay}
            onMediaPress={openMediaViewer}
            setIsPlaying={setIsPlaying}
          />
        ) : (
          <FromSender item={item} />
        )}
      </View>
    );
  };

  const handleSendVoice = () => {
    if (!recordedPath) return;

    const time = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

    const newVoiceMessage = {
      sender: 'Me',
      text: '',
      fromMe: true,
      time,
      media: [
        {
          path: recordedPath,
          type: 'audio',
        },
      ],
    };

    setMessages(prev => [...prev, newVoiceMessage]);
    setRecordedPath('');
    setIsVoiceFlow(false);
    setIsRecording(false);
    // duration: parseInt(recordTime.split(':')[0]) * 60 +
    //   parseInt(recordTime.split(':')[1])
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const handleStartRecording = async () => {
    try {
      setIsVoiceFlow(true);
      setIsPlaying(false);
      setRecordedPath('');
      const uri = await recordVoice(setRecordTime);
      if (uri) {
        setIsRecording(true);
      }
    } catch (err) {
      console.error('🎙️ Error while starting recording:', err);
    }
  };
  const handleStopRecording = async () => {
    try {
      const path = await stopRecording();
      if (path) {
        setRecordedPath(path);
      }
      setIsRecording(false);
    } catch (err) {
      console.error('🛑 Error while stopping recording:', err);
    }
  };

  const handlePlay = async () => {
    if (isRecording) {
      console.warn('🚫 Cannot play while recording.');
      return;
    }

    try {
      await playRecording();
      setIsPlaying(true);
    } catch (err) {
      console.error('🔊 Error playing recording:', err);
    }
  };

  const renderPreviewItem = ({ item, index }) => (
    <View style={{ marginRight: 8, position: 'relative' }}>
      {item.mime.includes('video') ? (
        <Video
          source={{ uri: item.path }}
          style={styles.previewVideo}
          resizeMode="cover"
          controls
        />
      ) : (
        <Image source={{ uri: item.path }} style={styles.previewImage} />
      )}
      <TouchableOpacity
        onPress={() => removeMedia(index)}
        style={styles.removeButton}
      >
        <Image
          source={require('../../../assets/png/cross.png')}
          style={styles.closeIcon}
        />
      </TouchableOpacity>
    </View>
  );

  const removeMedia = index => {
    setMedia(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <View style={styles.container}>
      <Header
        showBackArrow={true}
        title={'Chat'}
        titleStyle={{ color: COLORS.dark }}
        navigation={navigation}
        // showPlusIcon={true}
        showRightIcon={true}
      />
      <View style={styles.innerWrapper}>
        {/* Header */}
        <View style={styles.topHeader}>
          <View style={styles.header}>
            <View style={styles.imageWrapper}>
              <Image source={{ uri: item?.image }} style={styles.userImage} />
              <View style={styles.onlineDot} />
            </View>
            <View style={styles.user}>
              <Text style={styles.headerTitle}>{item?.name || 'Shabiii'}</Text>
              <Text style={styles.online}>Online</Text>
            </View>
          </View>

          <View style={styles.rightIcons}>
            <IconButton
              onPress={() => Alert.alert('Ellipsis vertical clicked!')}
              style={{ borderWidth: 0 }}
              icon={require('../../../assets/png/phone.png')}
            />
            <IconButton
              onPress={() => Alert.alert('Ellipsis vertical clicked!')}
              style={{ borderWidth: 0 }}
              icon={require('../../../assets/png/ellipsis.png')}
            />
          </View>
        </View>
      </View>
      {/* Messages */}
      <View style={{ flex: 1 }}>
        {messages ? (
          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={(_, index) => index.toString()}
            renderItem={renderItem}
            initialNumToRender={10}
            maxToRenderPerBatch={5}
            windowSize={10}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.messages}
          />
        ) : (
          <View style={styles.noMessageWrapper}>
            <Image
              source={require('../../../assets/png/chatbubble.png')}
              style={{ tintColor: COLORS.dark, opacity: 0.2 }}
            />
            <Text style={styles.noMessageText}>Start Chat</Text>
          </View>
        )}
        {/* Preview figma main nai hai */}
        <View style={{ backgroundColor: COLORS.primaryColor }}>
          {media.length > 0 && (
            <FlatList
              horizontal
              data={media}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={styles.previewFlatlist}
              renderItem={renderPreviewItem}
            />
          )}
        </View>
        {isVoiceFlow ? (
          <VoiceRecording
            onStop={handleStopRecording}
            recordedPath={recordedPath}
            onPlay={handlePlay}
            isPlaying={isPlaying}
            onSend={handleSendVoice}
            isRecording={isRecording}
            recordTime={recordTime}
            setIsPlaying={setIsPlaying}
            setRecordedPath={setRecordedPath}
            setIsRecording={setIsRecording}
            setIsVoiceFlow={setIsVoiceFlow}
          />
        ) : (
          <MessageInput
            message={message}
            setMessage={setMessage}
            media={media}
            setMedia={setMedia}
            onSendMessage={sendMessage}
            onLongPress={handleStartRecording}
          />
        )}

        {/* Media View */}
        <MediaViewer
          visible={isMediaViewerVisible}
          media={fullMedia}
          onClose={closeMediaViewer}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerWrapper: {
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
  },
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderColor,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  imageWrapper: {
    position: 'relative',
    width: 40,
    height: 40,
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 25,
  },
  onlineDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    backgroundColor: 'green',
    borderRadius: 6,
    borderWidth: 2,
    borderColor: 'white',
  },
  user: {
    marginLeft: 8,
  },
  headerTitle: {
    fontSize: 16,
    fontFamily: FONT.WorkSansSemiBold,
    color: COLORS.dark,
  },
  online: {
    fontSize: 10,
    fontFamily: FONT.WorkSansRegular,
    color: COLORS.dark,
  },
  messages: {
    padding: 4,
    gap: 12,
    backgroundColor: '#fff',
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    height: 44,
    width: 90,
    justifyContent: 'space-between',
  },
  sendButton: {
    width: 28,
    height: 28,
    backgroundColor: COLORS.secondaryColor,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  previewVideo: {
    width: 60,
    height: 60,
    borderRadius: 8,
    overflow: 'hidden',
  },
  previewFlatlist: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  previewImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  removeButton: {
    position: 'absolute',
    top: 2,
    right: 2,
  },
  closeIcon: {
    width: 16,
    height: 16,
  },
  noMessageText: {
    fontFamily: FONT.WorkSansMedium,
    fontSize: 20,
    opacity: 0.4,
  },
  noMessageWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
});
