import React from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const MediaPreview = ({selectedMedia, removeMedia}) => {
  if (selectedMedia.length === 0) return null;

  return (
    <View style={styles.mediaPreviewContainer}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {selectedMedia.map((media, index) => (
          <View key={index} style={styles.mediaPreviewItem}>
            <Image source={{uri: media.uri}} style={styles.mediaPreviewImage} />
            <TouchableOpacity
              style={styles.removeMediaButton}
              onPress={() => removeMedia(media.uri)}>
              <Ionicons name="close" size={16} color="white" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default MediaPreview;
