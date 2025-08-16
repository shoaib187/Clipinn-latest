import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Text,
} from 'react-native';
import React, { useState } from 'react';
import Header from '../../../components/homePage/header/header';
import { COLORS } from '../../../components/constants/colors';
import InputField from '../../../components/common/inputField/inputField';
import { imagePicker } from '../../../utils/imagePicker';
import TextButton from '../../../components/common/button/textButton';
import { FONT } from '../../../components/constants/font';

export default function GroupName({ navigation }) {
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [image, setImage] = useState(null);

  const handleImagePick = async () => {
    const results = await imagePicker();
    setImage(results.image.path);
  };

  return (
    <View style={styles.container}>
      <Header
        showBackArrow={true}
        navigation={navigation}
        title={'Create Group'}
        titleStyle={{ color: COLORS.lightDark }}
      />
      <View style={styles.wrapper}>
        <View style={styles.wrapperInner}>
          <View style={[styles.imageContainer, image && { borderWidth: 0 }]}>
            {!image ? (
              <Image
                source={require('../../../../assets/png/user.png')}
                style={styles.userIcon}
              />
            ) : (
              <Image
                source={{ uri: image }}
                style={{ width: '100%', height: '100%' }}
                resizeMode="cover"
              />
            )}
          </View>
          {!image && (
            <TouchableOpacity
              style={styles.iconWrapper}
              onPress={handleImagePick}
            >
              <Image
                source={require('../../../../assets/png/camer.png')}
                style={styles.camerIcon}
              />
            </TouchableOpacity>
          )}
        </View>
        <View style={{ marginTop: 30 }}>
          <InputField
            label={'Group Name'}
            value={name}
            onChangeText={t => setName(t)}
            placeholder={'Name'}
            iconName={require('../../../../assets/png/emoji.png')}
          />
          <Text style={{ fontFamily: FONT.WorkSansRegular }}>Description</Text>
          <TextInput
            label={'Group Description'}
            value={description}
            onChangeText={t => setDescription(t)}
            placeholder={'Description'}
            textAlignVertical="top"
            multiline={true}
            iconName={require('../../../../assets/png/emoji.png')}
            style={styles.input}
          />
        </View>
      </View>
      <View style={styles.bottomButton}>
        <TextButton
          onPress={() =>
            navigation.navigate('GroupChatInbox', {
              group: { name, description, image },
            })
          }
          title="Create"
          disabled={!name || !description}
          buttonStyle={{ height: 44 }}
        />
        <TextButton
          title="Cancel"
          buttonStyle={{
            borderWidth: 1,
            borderColor: COLORS.blue,
            backgroundColor: 'transparent',
            height: 44,
          }}
          textStyle={{ color: COLORS.blue }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 20,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    paddingHorizontal: 14,
  },
  imageContainer: {
    width: 90,
    height: 90,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: COLORS.secondaryColor,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    alignSelf: 'center',
    backgroundColor: COLORS.primaryColor,
  },
  userIcon: {
    width: 34,
    height: 34,
    tintColor: COLORS.secondaryColor,
  },
  wrapperInner: {
    position: 'relative',
  },
  iconWrapper: {
    position: 'absolute',
    bottom: -10,
    width: 34,
    height: 34,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primaryColor,
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 50,
  },
  camerIcon: {
    width: 18,
    height: 18,
  },
  bottomButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    gap: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  input: {
    height: 100,
    borderWidth: 1,
    borderColor: COLORS.borderColor,
    borderRadius: 12,
    marginTop: 8,
    fontFamily: FONT.WorkSansRegular,
    padding: 12,
    paddingLeft: 12,
  },
});
