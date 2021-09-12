import React, { useState } from 'react';
import { View, Dimensions } from 'react-native';
import i18n from 'i18n-js';
import { useFocusEffect } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';

// logics
import Carousel from '../../../components/view/Carousel';
import useCharacter from '../../../logics/hooks/useCharacter';

// components
import BackgroundButton from '../../../components/button/BackgroundButton';
import { MyCharacter } from '../../../utils/types/UserTypes';

// 스크린 너비
const screenWidth = Math.round(Dimensions.get('window').width);
export default function ProfileSwipeScreen({
  characterList,
}: {
  characterList: MyCharacter[];
}): React.ReactElement {
  // 스와이프 뷰를 이루는 페이지 인덱스
  const [page, setPage] = useState(0);
  // 내가 선택한 캐릭터의 페이지 인덱스
  const [select, setSelect] = useState(-1);
  const [character, setCharacter] = useCharacter();

  /**
   * 하단의 캐릭터 선택 버튼을 눌렀을 시 시행되는 함수
   */
  const onPress = async () => {
    if (characterList.length > 0) {
      await SecureStore.setItemAsync('tmpPageNum', page.toString());
      setCharacter(characterList[page]);
      setSelect(page);
    }
  };

  useFocusEffect(() => {
    if (characterList.length > 0) {
      const idx = characterList.findIndex(
        (element: MyCharacter) => element.id === character.id,
      );
      if (idx !== -1) setSelect(idx);
    }
  });

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }} />
      <Carousel
        pages={characterList}
        gap={20}
        offset={(screenWidth - 260 - 20 * 2) / 2}
        pageWidth={260}
        setPage={setPage}
      />
      {characterList.length === 0 ? null : (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'flex-end',
            marginBottom: 16,
            marginTop: 41,
          }}
        >
          <BackgroundButton
            onPress={onPress}
            content={
              select === page ? i18n.t('선택된 캐릭터') : i18n.t('캐릭터 선택')
            }
            height={45}
            isActive={!(select === page)}
            paddingH={40}
            paddingV={14}
          />
        </View>
      )}
    </View>
  );
}
