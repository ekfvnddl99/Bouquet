import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import i18n from 'i18n-js';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { useRecoilValue } from 'recoil';

// styles
import colors from '../../styles/colors';
import * as text from '../../styles/styled-components/text';

// logics
import { userState } from '../../logics/atoms';

/**
 * 로그인 안 했을 때, Home과 Notification 하단에 뜨는 '캐릭터 생성' 버튼
 */
export default function NotLoginPrimaryButton(): React.ReactElement {
  const [color, setColor] = useState(colors.primary);
  const user = useRecoilValue(userState);
  const navigation = useNavigation();
  /**
   * '캐릭터 생성' 화면으로 이동하는 함수
   */
  function goCharacterGeneration() {
    navigation.navigate('CharacterGeneration');
  }
  /**
   * '로그인' 화면으로 이동하는 함수
   */
  function goLogin() {
    navigation.navigate('Login');
  }

  return (
    <TouchableOpacity
      onPressIn={() => setColor(colors.pressed_primary)}
      onPressOut={() => setColor(colors.primary)}
      activeOpacity={1}
      onPress={() => (user.name !== '' ? goCharacterGeneration() : goLogin())}
    >
      <WholeArea backgroundColor={color}>
        <text.Button2R textColor={colors.white}>
          {i18n.t('여기를 눌러')}{' '}
        </text.Button2R>

        <text.Button2R textColor={colors.white}>
          {i18n.locale === 'en' ? i18n.t('를 만들어 보세요') : i18n.t('캐릭터')}{' '}
        </text.Button2R>
        <text.Button2B textColor={colors.white}>
          {i18n.locale === 'en' ? i18n.t('캐릭터') : i18n.t('를 만들어 보세요')}{' '}
          {i18n.t('캐릭터')}!
        </text.Button2B>
      </WholeArea>
    </TouchableOpacity>
  );
}

interface WholeAreaProps {
  backgroundColor: string;
}
const WholeArea = styled.View`
  background-color: ${(props: WholeAreaProps) => props.backgroundColor}
  height: 40;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;
