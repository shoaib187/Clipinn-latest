import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Modal,
} from 'react-native';
import React, { useRef, useState } from 'react';
import IconButton from '../../../components/common/button/iconButton';
import { FONT } from '../../../components/constants/font';
import { COLORS } from '../../../components/constants/colors';
import Header from '../../../components/homePage/header/header';
import MessageInput from '../../../components/common/messageInput/messageInput';
import FromMe from '../../../components/chats/fromMe/fromMe';
import FromSender from '../../../components/chats/fromSender/fromSender';
import {
  playRecording,
  recordVoice,
  stopRecording,
} from '../../../utils/voiceRecording';
import VoiceRecording from '../../../components/common/chatVoiceRecording/chatVoiceRecording';
import MediaViewer from '../../../components/common/fullScreenView/fullScreenView';
import Video from 'react-native-video';
const OPTIONS = [
  { id: 'exist', label: 'Exit Group' },
  { id: 'delete', label: 'Delete Group' },
  { id: 'mute', label: 'Mute Group' },
  { id: 'copy', label: 'Copy Link' },
];
export default function GroupChatInbox({ route, navigation }) {
  // const { group } = route.params;
  const flatListRef = useRef();
  const [dialogVisible, setDialogVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [message, setMessage] = useState('');
  const [media, setMedia] = useState([]);
  const [messages, setMessages] = useState([]);
  // for voice recording
  const [recordedPath, setRecordedPath] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [recordTime, setRecordTime] = useState('00:00');
  const [isRecording, setIsRecording] = useState(false);
  const [isVoiceFlow, setIsVoiceFlow] = useState(false);

  // for viwving media
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
      isPlaying(false);
      setRecordTime('00:00');
      await playRecording();
      setIsPlaying(true);
    } catch (err) {
      console.error('🔊 Error playing recording:', err);
    }
  };

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

  const group = {
    name: 'Shoaib',
    description: 'Not yet',
    image: require('../../../../assets/jpg/img1.png'),
    members: [1, 2, 3, 4],
  };

  const handleSelect = optionId => {
    setSelectedOption(optionId);
    setDialogVisible(false);
  };

  const removeMedia = index => {
    setMedia(prev => prev.filter((_, i) => i !== index));
  };

  const renderPreviewItem = ({ item, index }) => (
    <View
      style={{
        marginRight: 8,
        position: 'relative',
      }}
    >
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
          source={require('../../../../assets/png/cross.png')}
          style={styles.closeIcon}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header showBackArrow={true} title={'Chats'} navigation={navigation} />
      <View style={styles.innerWrapper}>
        <View style={styles.header}>
          <View style={styles.groupInfo}>
            <Image source={group?.image} style={styles.groupImage} />
            <View>
              <Text style={styles.groupName}>{group?.name}</Text>
              <Text style={styles.participants}>Participants</Text>
            </View>
          </View>
          <View style={styles.headerIcons}>
            <IconButton
              style={{ borderWidth: 0 }}
              icon={require('../../../../assets/png/phone.png')}
            />
            <IconButton
              onPress={() => setDialogVisible(true)}
              style={{ borderWidth: 0 }}
              icon={require('../../../../assets/png/ellipsis.png')}
            />
          </View>
        </View>
        {messages?.length === 0 ? (
          <View style={styles.infoSection}>
            <Image source={group?.image} style={styles.creatorImage} />
            <Text style={styles.createdText}>You Created the Group</Text>
            <Text style={styles.membersText}>
              {group?.members?.length} Members
            </Text>

            <TouchableOpacity
              style={styles.addMembersBtn}
              activeOpacity={0.7}
              onPress={() => navigation.navigate('AddMember')}
            >
              <Text style={styles.addMembersText}>Add Members</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            ref={flatListRef}
            showsVerticalScrollIndicator={false}
            data={messages}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={{ paddingHorizontal: 12 }}>
                {item.sender === 'Me' ? (
                  <FromMe
                    item={item}
                    isPlaying={isPlaying}
                    handleTogglePlay={handlePlay}
                    setIsPlaying={setIsPlaying}
                    onMediaPress={openMediaViewer}
                  />
                ) : (
                  <FromSender item={item} />
                )}
              </View>
            )}
            contentContainerStyle={{ paddingVertical: 12, gap: 12 }}
          />
        )}

        {/* massage input  */}
      </View>
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

      <MediaViewer
        visible={isMediaViewerVisible}
        media={fullMedia}
        onClose={closeMediaViewer}
      />

      {/* action modal  */}
      <Modal
        visible={dialogVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setDialogVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setDialogVisible(false)}
        >
          <View style={styles.modalContent}>
            <FlatList
              data={OPTIONS}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.option,
                    {
                      backgroundColor:
                        selectedOption === item.id
                          ? COLORS.primaryColor
                          : 'transparent',
                    },
                  ]}
                  onPress={() => handleSelect(item.id)}
                >
                  <Text style={styles.optionText}>{item.label}</Text>
                  {selectedOption === item.id && (
                    <Image
                      source={require('../../../../assets/png/check.png')}
                      style={styles.checkIcon}
                    />
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerWrapper: {
    flex: 1,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    padding: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  back: {
    fontSize: 18,
    paddingRight: 10,
  },
  groupInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  groupImage: {
    width: 40,
    height: 40,
    borderRadius: 25,
    marginRight: 8,
  },
  groupName: {
    fontSize: 16,
    fontFamily: FONT.WorkSansSemiBold,
    color: COLORS.dark,
  },
  participants: {
    fontSize: 12,
    color: COLORS.gray,
    fontFamily: FONT.WorkSansRegular,
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 8,
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  infoSection: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    marginHorizontal: 14,
    marginTop: 20,
  },
  creatorImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 8,
  },
  createdText: {
    fontSize: 14,
    fontFamily: FONT.WorkSansSemiBold,
    color: COLORS.dark,
  },
  membersText: {
    fontSize: 14,
    color: COLORS.gray,
    marginVertical: 6,
    fontFamily: FONT.WorkSansRegular,
  },
  addMembersBtn: {
    backgroundColor: '#D1D5DB',
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 8,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addMembersText: {
    fontSize: 14,
    color: COLORS.dark,
    fontFamily: FONT.WorkSansRegular,
  },
  chatInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#eee',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    fontSize: 14,
    paddingVertical: 6,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: '#00000055',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    paddingVertical: 12,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginHorizontal: 12,
    borderRadius: 12,
  },
  optionText: {
    fontSize: 16,
    fontFamily: FONT.WorkSansRegular,
    color: COLORS.black,
  },
  checkIcon: {
    width: 20,
    height: 20,
    tintColor: COLORS.secondaryColor,
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
});
