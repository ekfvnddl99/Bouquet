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

import { ImageTemplate } from '../../utils/types/PostTypes';

const windowWidth = Dimensions.get('window').width;
function Img({
  img,
  isMini,
  isEditMode,
}: {
  img?: string;
  isMini: boolean;
  isEditMode?: boolean;
}) {
  const [image, setImage] = useState(img);

  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('이미지를 업로드하려면 권한이 필요해요.');
      }
    })();
  }, []);

  const onPress = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
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
        ) : image === '' ? (
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
  post?: ImageTemplate;
};

export default function ImageTemplateComp({
  mode,
  post,
}: TemplateProps): React.ReactElement {
  switch (mode) {
    case 'edit':
      return <Img isMini={false} isEditMode />;
    case 'detail':
      return (
        <Img img={post ? post.img : ''} isMini={false} isEditMode={false} />
      );
    case 'ex':
      return <Img img="" isMini isEditMode={false} />;
    default:
      return <Img img={post ? post.img : ''} isMini isEditMode={false} />;
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
