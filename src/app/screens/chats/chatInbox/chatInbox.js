import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  Platform,
  SafeAreaView,
  KeyboardAvoidingView,
} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';

import {COLORS} from '../../../../components/constants/colors';
import {imagePicker} from '../../../../utils/common/services/services';
import ChatInput from '../../../../components/common/chatInput/chatInput';
import ChatHeader from '../../../../components/common/chatHeader/chatHeader';
import ChatBubble from '../../../../components/common/chatBubble/chatBubble';
import MediaPreview from '../../../../components/common/mediaPreview/mediaPreview';

const ChatInbox = ({route, navigation}) => {
  const {user} = route.params;
  const [messages, setMessages] = useState([]);
  const [selectedMedia, setSelectedMedia] = useState([]);
  const [text, setText] = useState('');

  const mediaPicker = async () => {
    const results = await imagePicker();
    if (results && results.length > 0) {
      setSelectedMedia(prev => [...prev, ...results]);
    }
  };

  const removeMedia = uri => {
    setSelectedMedia(prev => prev.filter(item => item.uri !== uri));
  };

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

  const onSend = useCallback(
    (messages = []) => {
      console.log('onSend triggered'); // Add this line
      console.log('Selected media:', selectedMedia); // Check media state
      console.log('Text content:', text); // Check text state

      if (selectedMedia.length > 0) {
        const newMessage = {
          _id: Math.round(Math.random() * 1000000),
          createdAt: new Date(),
          user: {_id: 1},
          text: text.trim(),
          images: selectedMedia.map(media => media.uri),
          image: selectedMedia[0].uri,
        };
        console.log('New message with media:', newMessage); // Detailed log

        setMessages(prev => {
          const updated = GiftedChat.append(prev, [newMessage]);
          console.log('Updated messages:', updated); // Log the updated state
          return updated;
        });
        setSelectedMedia([]);
        setText('');
      } else if (messages.length > 0 && messages[0].text) {
        console.log('New text message:', messages[0]); // Log text message
        setMessages(prev => {
          const updated = GiftedChat.append(prev, messages);
          console.log('Updated messages:', updated);
          return updated;
        });
        setText('');
      }
    },
    [selectedMedia, text],
  );
  const handleSend = () => {
    if (selectedMedia.length > 0 || text.trim()) {
      onSend();
    }
  };

  const {renderSend, renderInputToolbar, renderComposer, renderActions} =
    ChatInput({text, setText, handleSend, mediaPicker});
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar
        backgroundColor={COLORS.black}
        barStyle="light-content"
        animated
      />
      <View style={styles.container}>
        <ChatHeader user={user} navigation={navigation} />
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}>
          <GiftedChat
            messages={messages}
            onSend={onSend}
            user={{_id: 1}}
            renderBubble={props => <ChatBubble {...props} />}
            renderSend={renderSend}
            renderInputToolbar={renderInputToolbar}
            renderComposer={renderComposer}
            renderActions={renderActions}
            alwaysShowSend
            scrollToBottom
            keyboardShouldPersistTaps="handled"
            showUserAvatar={false}
            renderAvatar={() => null}
            text={text}
            onInputTextChanged={setText}
            renderFooter={() => (
              <MediaPreview
                selectedMedia={selectedMedia}
                removeMedia={removeMedia}
              />
            )}
          />
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e5ddd5',
  },
});

export default ChatInbox;

// import React, {useState, useCallback, useEffect} from 'react';
// import {
//   View,
//   StyleSheet,
//   TouchableOpacity,
//   Image,
//   Text,
//   StatusBar,
//   Platform,
//   SafeAreaView,
//   KeyboardAvoidingView,
//   ScrollView,
//   Dimensions,
// } from 'react-native';
// import {
//   GiftedChat,
//   Bubble,
//   Send,
//   InputToolbar,
//   Composer,
//   Actions,
// } from 'react-native-gifted-chat';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import {COLORS} from '../../../../components/constants/colors';
// import {imagePicker} from '../../../../utils/common/services/services';
// import RenderMessageImage from '../../../../components/common/renderMessageImage/renderMessageImage';

// const {width} = Dimensions.get('window');

// export default function ChatInbox({route, navigation}) {
//   const {user} = route.params;
//   const [messages, setMessages] = useState([]);
//   const [selectedMedia, setSelectedMedia] = useState([]);
//   const [text, setText] = useState('');

//   const mediaPicker = async () => {
//     const results = await imagePicker();
//     if (results && results.length > 0) {
//       setSelectedMedia(prev => [...prev, ...results]);
//     }
//   };

//   const removeMedia = uri => {
//     setSelectedMedia(prev => prev.filter(item => item.uri !== uri));
//   };

//   useEffect(() => {
//     const initialMessages = [
//       {
//         _id: 1,
//         text: 'Hello there!',
//         createdAt: new Date(Date.now() - 1000 * 60 * 60),
//         user,
//       },
//       {
//         _id: 2,
//         text: 'Hi! How are you?',
//         createdAt: new Date(Date.now() - 1000 * 60 * 30),
//         user: {
//           _id: 1,
//           name: 'You',
//           avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
//         },
//       },
//       {
//         _id: 3,
//         text: "I'm doing great! Working on a new project.",
//         createdAt: new Date(Date.now() - 1000 * 60 * 5),
//         user,
//       },
//     ];
//     setMessages(initialMessages.reverse());
//   }, [user]);

//   const renderMessageImage = props => {
//     const {currentMessage} = props;
//     const imageCount = currentMessage.images ? currentMessage.images.length : 1;

//     if (imageCount === 1) {
//       return (
//         <Image
//           source={{uri: currentMessage.image || currentMessage.images[0]}}
//           style={styles.singleImage}
//           resizeMode="cover"
//         />
//       );
//     } else if (imageCount <= 4) {
//       return (
//         <View style={styles.doubleImageContainer}>
//           {currentMessage.images.slice(0, 4).map((image, index) => (
//             <View
//               key={index}
//               style={[
//                 styles.doubleImageWrapper,
//                 index % 2 === 0 ? {marginRight: 2} : {marginLeft: 2},
//                 index < 2 ? {marginBottom: 2} : {marginTop: 2},
//               ]}>
//               <Image
//                 source={{uri: image}}
//                 style={styles.doubleImage}
//                 resizeMode="cover"
//               />
//             </View>
//           ))}
//         </View>
//       );
//     } else {
//       return (
//         <View style={styles.multipleImageContainer}>
//           {currentMessage.images.slice(0, 4).map((image, index) => (
//             <View
//               key={index}
//               style={[
//                 styles.multipleImageWrapper,
//                 index === 1 && {marginHorizontal: 2},
//                 index === 2 && {marginHorizontal: 2},
//                 index < 2 ? {marginBottom: 2} : {marginTop: 2},
//               ]}>
//               <Image
//                 source={{uri: image}}
//                 style={styles.multipleImage}
//                 resizeMode="cover"
//               />
//               {index === 3 && (
//                 <View style={styles.moreImagesOverlay}>
//                   <Text style={styles.moreImagesText}>
//                     +{currentMessage.images.length - 4}
//                   </Text>
//                 </View>
//               )}
//             </View>
//           ))}
//         </View>
//       );
//     }
//   };

//   const onSend = useCallback(
//     (messages = []) => {
//       if (selectedMedia.length > 0) {
//         const newMessage = {
//           _id: Math.round(Math.random() * 1000000),
//           createdAt: new Date(),
//           user: {_id: 1},
//           text: text.trim(), // This can be empty
//           images: selectedMedia.map(media => media.uri),
//           image: selectedMedia[0].uri, // Keep for backward compatibility
//         };

//         setMessages(prev => GiftedChat.append(prev, [newMessage]));
//         setSelectedMedia([]);
//         setText('');
//       } else if (text.trim()) {
//         // Regular text message
//         setMessages(prev => GiftedChat.append(prev, messages));
//         setText('');
//       }
//     },
//     [selectedMedia, text],
//   );

//   const handleSend = () => {
//     if (selectedMedia.length > 0 || text.trim()) {
//       onSend();
//     }
//   };

//   const renderBubble = props => {
//     const {currentMessage} = props;

//     if (currentMessage.image || currentMessage.images) {
//       return (
//         <View
//           style={[
//             styles.imageBubbleWrapper,
//             currentMessage.user._id === 1
//               ? styles.rightImageBubble
//               : styles.leftImageBubble,
//           ]}>
//           <Bubble
//             {...props}
//             renderMessageImage={renderMessageImage}
//             wrapperStyle={{
//               left: {backgroundColor: 'transparent'},
//               right: {backgroundColor: 'transparent'},
//             }}
//           />
//           {currentMessage.text && currentMessage.text.trim() !== '' && (
//             <View
//               style={[
//                 styles.textAfterImage,
//                 currentMessage.user._id === 1
//                   ? styles.rightTextAfterImage
//                   : styles.leftTextAfterImage,
//               ]}>
//               <Text style={styles.imageMessageText}>{currentMessage.text}</Text>
//             </View>
//           )}
//         </View>
//       );
//     }

//     return (
//       <Bubble
//         {...props}
//         wrapperStyle={{
//           left: {backgroundColor: '#fff', marginBottom: 4},
//           right: {backgroundColor: '#DCF8C6', marginBottom: 4},
//         }}
//         textStyle={{
//           left: {color: '#000'},
//           right: {color: '#000'},
//         }}
//         timeTextStyle={{
//           left: {color: 'rgba(0,0,0,0.5)'},
//           right: {color: 'rgba(0,0,0,0.5)'},
//         }}
//       />
//     );
//   };

//   const renderSend = props => (
//     <Send
//       {...props}
//       containerStyle={styles.sendContainer}
//       onSend={handleSend} // Use our custom send handler
//     >
//       <View style={styles.sendButton}>
//         <Ionicons name="send" size={16} color="white" />
//       </View>
//     </Send>
//   );

//   const renderInputToolbar = props => (
//     <InputToolbar
//       {...props}
//       containerStyle={styles.inputToolbar}
//       primaryStyle={{alignItems: 'center'}}
//     />
//   );

//   const renderComposer = props => (
//     <Composer
//       {...props}
//       textInputStyle={styles.composer}
//       placeholder="Type a message..."
//       text={text}
//       onTextChanged={setText}
//     />
//   );

//   const renderActions = props => (
//     <Actions
//       {...props}
//       containerStyle={styles.actionsContainer}
//       onPressActionButton={mediaPicker}
//       icon={() => <Ionicons name="attach" size={22} color={COLORS.btnColor} />}
//     />
//   );

//   const renderMediaPreview = () => {
//     if (selectedMedia.length === 0) return null;

//     return (
//       <View style={styles.mediaPreviewContainer}>
//         <ScrollView horizontal showsHorizontalScrollIndicator={false}>
//           {selectedMedia.map((media, index) => (
//             <View key={index} style={styles.mediaPreviewItem}>
//               <Image
//                 source={{uri: media.uri}}
//                 style={styles.mediaPreviewImage}
//               />
//               <TouchableOpacity
//                 style={styles.removeMediaButton}
//                 onPress={() => removeMedia(media.uri)}>
//                 <Ionicons name="close" size={16} color="white" />
//               </TouchableOpacity>
//             </View>
//           ))}
//         </ScrollView>
//       </View>
//     );
//   };

//   return (
//     <SafeAreaView style={{flex: 1}}>
//       <StatusBar
//         backgroundColor={COLORS.black}
//         barStyle="light-content"
//         animated
//       />
//       <View style={styles.container}>
//         <View style={styles.header}>
//           <TouchableOpacity
//             onPress={() => navigation.goBack()}
//             style={styles.backButton}>
//             <Ionicons name="arrow-back" size={24} color="white" />
//           </TouchableOpacity>
//           <Image source={{uri: user.avatar}} style={styles.headerAvatar} />
//           <View style={styles.headerText}>
//             <Text style={styles.headerName}>{user.name}</Text>
//             <Text style={styles.headerStatus}>
//               {user.isOnline ? 'online' : 'last seen recently'}
//             </Text>
//           </View>
//           <View style={styles.headerActions}>
//             <TouchableOpacity style={styles.actionButton}>
//               <Ionicons name="search" size={20} color="white" />
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.actionButton}>
//               <Ionicons name="ellipsis-vertical" size={20} color="white" />
//             </TouchableOpacity>
//           </View>
//         </View>
//         <KeyboardAvoidingView
//           style={{flex: 1}}
//           behavior={Platform.OS === 'ios' ? 'padding' : undefined}
//           keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}>
//           <GiftedChat
//             messages={messages}
//             onSend={onSend}
//             user={{_id: 1}}
//             renderBubble={renderBubble}
//             renderSend={renderSend}
//             renderInputToolbar={renderInputToolbar}
//             renderComposer={renderComposer}
//             renderActions={renderActions}
//             alwaysShowSend
//             scrollToBottom
//             keyboardShouldPersistTaps="handled"
//             showUserAvatar={false}
//             renderAvatar={() => null}
//             text={text}
//             onInputTextChanged={setText}
//             renderFooter={renderMediaPreview}
//           />
//         </KeyboardAvoidingView>
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#e5ddd5',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 12,
//     paddingVertical: 12,
//     backgroundColor: COLORS.black,
//     borderBottomWidth: 1,
//     borderBottomColor: 'rgba(255,255,255,0.1)',
//   },
//   backButton: {
//     marginRight: 8,
//   },
//   headerAvatar: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     marginRight: 8,
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.2)',
//   },
//   headerText: {
//     flex: 1,
//   },
//   headerName: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: 'white',
//   },
//   headerStatus: {
//     fontSize: 12,
//     color: 'rgba(255,255,255,0.7)',
//   },
//   headerActions: {
//     flexDirection: 'row',
//   },
//   actionButton: {
//     marginLeft: 16,
//   },
//   inputToolbar: {
//     backgroundColor: 'white',
//     borderTopWidth: 0,
//     paddingVertical: 6,
//     paddingHorizontal: 8,
//   },
//   composer: {
//     backgroundColor: '#f5f5f5',
//     borderRadius: 20,
//     paddingHorizontal: 12,
//     fontSize: 15,
//     color: '#333',
//     height: 40,
//     minHeight: 40,
//     maxHeight: 120,
//     marginRight: 8,
//     marginLeft: 4,
//   },
//   sendContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 4,
//   },
//   sendButton: {
//     width: 36,
//     height: 36,
//     borderRadius: 18,
//     backgroundColor: COLORS.btnColor,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   actionsContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginLeft: 4,
//     top: 2,
//   },
//   mediaPreviewContainer: {
//     padding: 8,
//     backgroundColor: '#f5f5f5',
//     flexDirection: 'row',
//     borderTopWidth: 1,
//     borderTopColor: '#e0e0e0',
//   },
//   mediaPreviewItem: {
//     marginRight: 8,
//     position: 'relative',
//   },
//   mediaPreviewImage: {
//     width: 80,
//     height: 80,
//     borderRadius: 4,
//   },
//   removeMediaButton: {
//     position: 'absolute',
//     top: 4,
//     right: 4,
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     borderRadius: 10,
//     width: 20,
//     height: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   // Image message styles
//   doubleImageWrapper: {
//     width: '48%',
//     height: '48%',
//   },
//   doubleImage: {
//     width: '100%',
//     height: '100%',
//     borderRadius: 6,
//   },
//   multipleImageContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     width: width * 0.7,
//     height: width * 0.7,
//   },
//   multipleImageWrapper: {
//     width: '49%',
//     height: '49%',
//     position: 'relative',
//   },
//   multipleImage: {
//     width: '100%',
//     height: '100%',
//     borderRadius: 6,
//   },
//   moreImagesOverlay: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     borderRadius: 6,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   moreImagesText: {
//     color: 'white',
//     fontSize: 24,
//     fontWeight: 'bold',
//   },
//   textAfterImage: {
//     padding: 8,
//     borderRadius: 12,
//     marginTop: 4,
//     maxWidth: '100%',
//   },
//   rightTextAfterImage: {
//     backgroundColor: '#DCF8C6',
//     alignSelf: 'flex-end',
//   },
//   leftTextAfterImage: {
//     backgroundColor: '#fff',
//     alignSelf: 'flex-start',
//   },
//   imageMessageText: {
//     fontSize: 14,
//   },
//   leftImageBubble: {
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     padding: 8,
//     marginBottom: 4,
//     maxWidth: width * 0.8,
//   },
//   rightImageBubble: {
//     backgroundColor: '#DCF8C6',
//     borderRadius: 12,
//     padding: 8,
//     marginBottom: 4,
//     maxWidth: width * 0.8,
//   },
//   imageBubbleWrapper: {
//     maxWidth: width * 0.8,
//     overflow: 'hidden',
//   },
//   singleImage: {
//     width: width * 0.7 - 16,
//     height: width * 0.7 - 16,
//     borderRadius: 8,
//   },
//   doubleImageContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     width: width * 0.7 - 16,
//     height: width * 0.7 - 16,
//   },
// });
