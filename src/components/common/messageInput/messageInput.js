import {
  View,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {FONT} from '../../constants/font';
import {COLORS} from '../../constants/colors';

export default function MessageInput({
  message,
  setMessage,
  media,
  setMedia,
  onSendMessage,
  onLongPress,
}) {
  const [inputHeight, setInputHeight] = useState(48);

  const handlePickImage = async () => {};

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={70}
      style={styles.inputContainer}>
      <View style={[styles.inputWrapper, {height: Math.min(inputHeight, 100)}]}>
        <TextInput
          placeholder="Type a message"
          value={message}
          onChangeText={setMessage}
          style={[
            styles.input,
            {
              height: Math.min(inputHeight, 100),
              textAlignVertical: inputHeight > 70 ? 'top' : 'center',
            },
          ]}
          onContentSizeChange={e =>
            setInputHeight(e.nativeEvent.contentSize.height)
          }
          multiline
        />

        <TouchableOpacity
          style={styles.sendButton}
          onPress={() => {
            onSendMessage();
            setInputHeight(48);
          }}>
          {/* <Image
            source={require('../../../../assets/png/send.png')}
            style={{width: 18, height: 18, tintColor: 'white'}}
          /> */}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.borderColor,
    alignItems: 'center',
    paddingHorizontal: 8,
    backgroundColor: COLORS.primaryColor,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: FONT.WorkSansRegular,
  },
  sendButton: {
    width: 28,
    height: 28,
    backgroundColor: COLORS.secondaryColor,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
    // marginTop: 8,
  },
});
