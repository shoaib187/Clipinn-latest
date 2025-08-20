import React from 'react';
import {View, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Send, InputToolbar, Composer, Actions} from 'react-native-gifted-chat';
import {COLORS} from '../../constants/colors';

const ChatInput = ({text, setText, handleSend, mediaPicker}) => {
  const renderSend = props => (
    <Send {...props} containerStyle={styles.sendContainer} onSend={handleSend}>
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
      text={text}
      onTextChanged={setText}
    />
  );

  const renderActions = props => (
    <Actions
      {...props}
      containerStyle={styles.actionsContainer}
      onPressActionButton={mediaPicker}
      icon={() => <Ionicons name="attach" size={22} color={COLORS.btnColor} />}
    />
  );

  return {
    renderSend,
    renderInputToolbar,
    renderComposer,
    renderActions,
  };
};

const styles = StyleSheet.create({
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
    height: 40,
    minHeight: 40,
    maxHeight: 120,
    marginRight: 8,
    marginLeft: 4,
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
    top: 2,
  },
});

export default ChatInput;
