import React from 'react';
import {View, Text, Image, StyleSheet, Dimensions} from 'react-native';
import {Bubble} from 'react-native-gifted-chat';

const {width} = Dimensions.get('window');

const ChatBubble = props => {
  const {currentMessage} = props;
  console.log('props', props);

  const renderMessageImage = () => {
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
  };

  if (currentMessage.image || currentMessage.images) {
    return (
      <View
        style={[
          styles.imageBubbleWrapper,
          currentMessage.user._id === 1
            ? styles.rightImageBubble
            : styles.leftImageBubble,
        ]}>
        <Bubble
          {...props}
          renderMessageImage={renderMessageImage}
          wrapperStyle={{
            left: {backgroundColor: 'transparent'},
            right: {backgroundColor: 'transparent'},
          }}
        />
        {currentMessage.text && currentMessage.text.trim() !== '' && (
          <View
            style={[
              styles.textAfterImage,
              currentMessage.user._id === 1
                ? styles.rightTextAfterImage
                : styles.leftTextAfterImage,
            ]}>
            <Text style={styles.imageMessageText}>{currentMessage.text}</Text>
          </View>
        )}
      </View>
    );
  }

  return (
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
};

const styles = StyleSheet.create({
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

export default ChatBubble;
