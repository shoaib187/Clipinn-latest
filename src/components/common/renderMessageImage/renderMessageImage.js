import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import {COLORS} from '../../constants/colors';
const {width} = Dimensions.get('window');
export default function RenderMessageImage({props}) {
  const {currentMessage} = props;
  const imageCount = currentMessage.images ? currentMessage.images.length : 1;

  if (imageCount === 1) {
    return (
      <Image
        source={{uri: currentMessage.image || currentMessage.images[0]}}
        style={styles.singleImage}
        resizeMode="cover"
      />
    );
  } else if (imageCount <= 4) {
    return (
      <View style={styles.doubleImageContainer}>
        {currentMessage.images.slice(0, 4).map((image, index) => (
          <View
            key={index}
            style={[
              styles.doubleImageWrapper,
              index % 2 === 0 ? {marginRight: 2} : {marginLeft: 2},
              index < 2 ? {marginBottom: 2} : {marginTop: 2},
            ]}>
            <Image
              source={{uri: image}}
              style={styles.doubleImage}
              resizeMode="cover"
            />
          </View>
        ))}
      </View>
    );
  } else {
    return (
      <View style={styles.multipleImageContainer}>
        {currentMessage.images.slice(0, 4).map((image, index) => (
          <View
            key={index}
            style={[
              styles.multipleImageWrapper,
              index === 1 && {marginHorizontal: 2},
              index === 2 && {marginHorizontal: 2},
              index < 2 ? {marginBottom: 2} : {marginTop: 2},
            ]}>
            <Image
              source={{uri: image}}
              style={styles.multipleImage}
              resizeMode="cover"
            />
            {index === 3 && (
              <View style={styles.moreImagesOverlay}>
                <Text style={styles.moreImagesText}>
                  +{currentMessage.images.length - 4}
                </Text>
              </View>
            )}
          </View>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e5ddd5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: COLORS.black,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  backButton: {
    marginRight: 8,
  },
  headerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
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
  mediaPreviewContainer: {
    padding: 8,
    backgroundColor: '#f5f5f5',
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  mediaPreviewItem: {
    marginRight: 8,
    position: 'relative',
  },
  mediaPreviewImage: {
    width: 80,
    height: 80,
    borderRadius: 4,
  },
  removeMediaButton: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Image message styles
  doubleImageWrapper: {
    width: '48%',
    height: '48%',
  },
  doubleImage: {
    width: '100%',
    height: '100%',
    borderRadius: 6,
  },
  multipleImageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: width * 0.7,
    height: width * 0.7,
  },
  multipleImageWrapper: {
    width: '49%',
    height: '49%',
    position: 'relative',
  },
  multipleImage: {
    width: '100%',
    height: '100%',
    borderRadius: 6,
  },
  moreImagesOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreImagesText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  textAfterImage: {
    padding: 8,
    borderRadius: 12,
    marginTop: 4,
    maxWidth: '100%',
  },
  rightTextAfterImage: {
    backgroundColor: '#DCF8C6',
    alignSelf: 'flex-end',
  },
  leftTextAfterImage: {
    backgroundColor: '#fff',
    alignSelf: 'flex-start',
  },
  imageMessageText: {
    fontSize: 14,
  },
  leftImageBubble: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 8,
    marginBottom: 4,
    maxWidth: width * 0.8,
  },
  rightImageBubble: {
    backgroundColor: '#DCF8C6',
    borderRadius: 12,
    padding: 8,
    marginBottom: 4,
    maxWidth: width * 0.8,
  },
  imageBubbleWrapper: {
    maxWidth: width * 0.8,
    overflow: 'hidden',
  },
  singleImage: {
    width: width * 0.7 - 16,
    height: width * 0.7 - 16,
    borderRadius: 8,
  },
  doubleImageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: width * 0.7 - 16,
    height: width * 0.7 - 16,
  },
});
