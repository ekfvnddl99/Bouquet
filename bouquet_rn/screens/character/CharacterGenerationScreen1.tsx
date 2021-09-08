import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import i18n from 'i18n-js';
import * as ImagePicker from 'expo-image-picker';

// styles
import * as area from '../../styles/styled-components/area';
import * as elses from '../../styles/styled-components/elses';

// icons
import Svg from '../../assets/Icon';

// logics
import type { MyCharacter } from '../../utils/types/UserTypes';

// components
import ConditionButton from '../../components/button/ConditionButton';

type CharacterGenerationScreen1Props = {
  isModifying: boolean;
  onPress: () => void;
  newCharacter: MyCharacter;
  setNewCharacter: (param: MyCharacter) => void;
};
export default function CharacterGenerationScreen1({
  isModifying,
  onPress,
  newCharacter,
  setNewCharacter,
}: CharacterGenerationScreen1Props): React.ReactElement {
  const [IsOK, setIsOK] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('이미지를 업로드하려면 권한이 필요해요.');
      }
    })();
  }, []);
  useEffect(() => {
    if (newCharacter.profile_img) setIsOK(true);
  });

  const setImage = async () => {
    const imgResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!imgResult.cancelled) {
      setNewCharacter({
        ...newCharacter,
        profile_img: imgResult.uri,
      });
    }
  };

  return (
    <area.ContainerBlank20>
      <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <TouchableOpacity onPress={() => setImage}>
          {newCharacter.profile_img ? (
            <elses.CircleImg
              diameter={180}
              source={{ uri: newCharacter.profile_img }}
            />
          ) : (
            <elses.Circle diameter={180}>
              <Svg icon="gallery" size={24} />
            </elses.Circle>
          )}
        </TouchableOpacity>
      </View>
      <area.BottomArea style={{ marginBottom: 16 }}>
        <ConditionButton
          height={44}
          isActive={IsOK}
          onPress={() => (IsOK ? onPress : undefined)}
          content={
            isModifying ? i18n.t('기본 정보 수정') : i18n.t('기본 정보 입력')
          }
          paddingH={0}
          paddingV={14}
        />
      </area.BottomArea>
    </area.ContainerBlank20>
  );
}
