import React, { useEffect, useState } from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  StyleSheet,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import colors from '../../styles/colors';
import * as elses from '../../styles/styled-components/elses';

import Icon from '../../assets/Icon';

import { ImageTemplate, AllTemplates } from '../../utils/types/PostTypes';

const windowWidth = Dimensions.get('window').width;
function Img({
  img,
  isMini,
  isEditMode,
  setPost,
  setImageInfo,
}: {
  img?: string;
  isMini: boolean;
  isEditMode?: boolean;
  setPost?: (template: ImageTemplate) => void;
  setImageInfo?: React.Dispatch<
    React.SetStateAction<
      [string[], ((images: string[]) => AllTemplates) | undefined]
    >
  >;
}) {
  const onPress = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('이미지를 업로드하려면 권한이 필요해요.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      if (setImageInfo && setPost) {
        setPost({ type: 'Image', img: result.uri });
        setImageInfo([
          [result.uri],
          (images: string[]) => {
            setPost({ type: 'Image', img: images[0] });
            return { type: 'Image', img: images[0] };
          },
        ]);
      }
    }
  };

  return (
    <View style={{ marginBottom: isMini ? 0 : 12, alignItems: 'center' }}>
      {
        /* eslint-disable-next-line no-nested-ternary */
        isEditMode ? (
          <TouchableOpacity onPress={onPress} style={styles.selectImg}>
            <Icon icon="gallery" size={24} />
          </TouchableOpacity>
        ) : img === '' ? (
          <elses.RectangleImg
            width={windowWidth / 2}
            height={windowWidth / 2}
            source={{}}
          />
        ) : (
          <Image
            source={{ uri: img }}
            resizeMode="cover"
            style={styles.setImg}
          />
        )
      }
    </View>
  );
}

type TemplateProps = {
  mode: string;
  post: ImageTemplate;
  setPost?: (template: ImageTemplate) => void;
  setImageInfo?: React.Dispatch<
    React.SetStateAction<
      [string[], ((images: string[]) => AllTemplates) | undefined]
    >
  >;
};

export default function ImageTemplateComp({
  mode,
  post,
  setPost,
  setImageInfo,
}: TemplateProps): React.ReactElement {
  switch (mode) {
    case 'edit':
      return (
        <Img
          isMini={false}
          isEditMode
          setPost={setPost}
          setImageInfo={setImageInfo}
        />
      );
    case 'detail':
      return <Img img={post.img} isMini={false} isEditMode={false} />;
    case 'ex':
      return <Img img="" isMini isEditMode={false} />;
    default:
      return <Img img={post.img} isMini isEditMode={false} />;
  }
}

const styles = StyleSheet.create({
  selectImg: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 10,
    height: 200,
    justifyContent: 'center',
    width: '100%',
  },
  setImg: {
    aspectRatio: 1 / 1,
    borderRadius: 10,
    width: '100%',
  },
});
