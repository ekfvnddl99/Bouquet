import React from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  StyleSheet,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';

import colors from '../../styles/colors';
import * as elses from '../../styles/styled-components/elses';

import Icon from '../../assets/Icon';

import { ImageTemplate } from '../../utils/types/PostTypes';

const windowWidth = Dimensions.get('window').width;
function Img({
  img,
  isMini,
  isEditMode,
  setPost,
  setImages,
}: {
  img?: string;
  isMini: boolean;
  isEditMode?: boolean;
  setPost?: (template: ImageTemplate) => void;
  setImages?: React.Dispatch<React.SetStateAction<string[]>>;
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
      const manipResult = await ImageManipulator.manipulateAsync(result.uri, [
        { resize: { width: 1024, height: 1024 } },
      ]);
      const realUri = manipResult.uri;
      if (setImages && setPost) {
        setPost({ type: 'Image', img: realUri });
        setImages([realUri]);
      }
    }
  };

  return (
    <View style={{ marginBottom: isMini ? 0 : 12, alignItems: 'center' }}>
      {
        /* eslint-disable-next-line no-nested-ternary */
        !img || img === '' ? (
          isEditMode ? (
            <TouchableOpacity onPress={onPress} style={styles.selectImg}>
              <Icon icon="gallery" size={24} />
            </TouchableOpacity>
          ) : (
            <elses.RectangleImg
              width={windowWidth / 2}
              height={windowWidth / 2}
              source={{}}
            />
          )
        ) : isEditMode ? (
          <TouchableOpacity onPress={onPress}>
            <Image
              source={{ uri: img }}
              resizeMode="cover"
              style={styles.setImg}
            />
          </TouchableOpacity>
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
  setImages?: React.Dispatch<React.SetStateAction<string[]>>;
};

export default function ImageTemplateComp({
  mode,
  post,
  setPost,
  setImages,
}: TemplateProps): React.ReactElement {
  switch (mode) {
    case 'edit':
      return (
        <Img
          isMini={false}
          isEditMode
          img={post.img}
          setPost={setPost}
          setImages={setImages}
        />
      );
    case 'detail':
      return <Img img={post.img} isMini={false} isEditMode={false} />;
    case 'ex':
      return (
        <Img
          img="https://bouquet-storage.s3.ap-northeast-2.amazonaws.com/e11de704-2746-11ec-8d2f-0242ac110002.jpg"
          isMini
          isEditMode={false}
        />
      );
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
