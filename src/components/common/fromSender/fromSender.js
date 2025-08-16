import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {FONT} from '../../constants/font';

const FromSender = ({item, onMediaPress}) => {
  const hasMedia = Array.isArray(item?.media) && item.media.length > 0;
  const isAudio = hasMedia && item.media[0]?.type === 'audio';

  return (
    <View style={styles.messageContainer}>
      {/* Avatar on left */}
      {/* <Image
        source={require('../../../../assets/images/tolga.jpg')}
        style={styles.avatar}
      /> */}

      <View style={styles.inner}>
        <View style={styles.messageContentOther}>
          {!!item?.text && (
            <Text selectable style={styles.messageTextOther}>
              {item.text}
            </Text>
          )}
        </View>
        <Text style={styles.timeText}>{item?.time}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    flexDirection: 'row',
    marginVertical: 6,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  inner: {
    maxWidth: '78%',
    marginLeft: 6,
    alignItems: 'flex-start',
  },
  messageContentOther: {
    backgroundColor: '#F1F5F9',
    padding: 10,
    borderRadius: 16,
    borderTopLeftRadius: 0,
  },
  messageTextOther: {
    fontSize: 14,
    color: '#111',
    fontFamily: FONT.WorkSansRegular,
  },
  timeText: {
    fontSize: 10,
    color: '#999',
    marginTop: 4,
    fontFamily: FONT.WorkSansRegular,
    alignSelf: 'flex-end',
  },
  mediaWrapper: {
    gap: 6,
  },
  singleMediaItem: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 10,
    overflow: 'hidden',
  },
  multipleMediaItem: {
    width: 70,
    height: 70,
  },
  fullMediaContent: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    overflow: 'hidden',
  },
});

export default FromSender;
