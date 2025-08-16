import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS} from '../../constants/colors';
import {FONT} from '../../constants/font';

const FromMe = ({item, onMediaPress}) => {
  const hasMedia = Array.isArray(item?.media) && item.media.length > 0;
  const isAudio = hasMedia && item.media[0]?.type === 'audio';
  const isSingleMedia = hasMedia && item.media.length === 1;

  return (
    <View style={styles.messageContainer}>
      <View style={styles.inner}>
        {/* bubble */}
        <View style={styles.messageContentMe}>
          {item.text !== '' && (
            <Text selectable style={styles.messageTextMe}>
              {item?.text}
            </Text>
          )}

          <View style={{height: isSingleMedia ? 240 : 70}}>
            <FlatList
              data={item.media}
              keyExtractor={(_, index) => index.toString()}
              horizontal
              contentContainerStyle={styles.mediaWrapper}
              showsHorizontalScrollIndicator={false}
              renderItem={({item: m}) => (
                <TouchableOpacity
                  onPress={() => onMediaPress(m)}
                  activeOpacity={0.8}
                  style={
                    isSingleMedia
                      ? styles.singleMediaItem
                      : styles.multipleMediaItem
                  }>
                  {m.type === 'image' && (
                    <Image
                      source={{uri: m.path}}
                      style={styles.fullMediaContent}
                      resizeMode="cover"
                    />
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        </View>

        <Text style={styles.timeText}>{item?.time}</Text>
      </View>

      {/* <Image
        source={require('../../../../assets/images/tolga.jpg')}
        style={styles.avatar}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    // alignItems: 'flex-end',
    marginVertical: 6,
    // paddingHorizontal: 12,
  },
  inner: {
    maxWidth: '78%',
    alignItems: 'flex-end',
  },
  messageContentMe: {
    backgroundColor: COLORS.secondaryColor,
    padding: 10,
    borderRadius: 16,
    borderTopRightRadius: 0,
  },
  messageTextMe: {
    fontSize: 14,
    color: '#fff',
    fontFamily: FONT.WorkSansRegular,
  },
  timeText: {
    fontSize: 10,
    color: '#999',
    marginTop: 4,
    fontFamily: FONT.WorkSansRegular,
    alignSelf: 'flex-start',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginLeft: 6,
  },

  mediaWrapper: {
    gap: 6,
  },

  singleMediaItem: {
    width: 240,
    height: 240,
    borderRadius: 10,
    overflow: 'hidden',
  },
  multipleMediaItem: {
    width: 70,
    height: 70,
    borderRadius: 10,
    overflow: 'hidden',
  },
  fullMediaContent: {
    width: '100%',
    height: '100%',
  },
});

export default FromMe;
