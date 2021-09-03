import React from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// styles
import colors from '../../styles/colors';
import * as area from '../../styles/styled-components/area';
import * as elses from '../../styles/styled-components/elses';
import * as text from '../../styles/styled-components/text';

// logics
import useCharacterView from '../../logics/hooks/useCharacterView';
import useUserView from '../../logics/hooks/useUserView';

/**
 * (원형 모양의 프로필 사진, 해당 이름) 버튼
 *
 * @param diameter 원의 지름
 * @param isAccount 계정 화면에 쓰이는지 아닌지
 * @param name 프로필 이름
 * @param img 프로필 사진
 */
type ProfileButtonProps = {
  diameter: number;
  isAccount: boolean;
  name: string;
  img: string;
};
export default function ProfileButton({
  diameter,
  isAccount,
  name,
  img,
}: ProfileButtonProps): React.ReactElement {
  const navigation = useNavigation();
  const [characterView, setCharacterView] = useCharacterView();
  const [viewUser, setViewUser, isMe] = useUserView();

  /**
   * '상세 프로필' 화면으로 이동하는 함수
   * 캐릭터 프로필을 눌렀을 때
   */
  function goProfileDetail() {
    setCharacterView(name);
    navigation.navigate('ProfileDetailStack');
  }
  /**
   * '계정' 화면으로 이동하는 함수
   * 계정 프로필을 눌렀을 때
   */
  function goAccount() {
    setViewUser({ name, profileImg: img });
    navigation.navigate('AccountStack');
  }

  return (
    <TouchableWithoutFeedback onPress={isAccount ? goAccount : goProfileDetail}>
      <area.RowArea>
        <elses.CircleImg diameter={diameter} source={{ uri: img }} />
        <View style={{ marginLeft: 8 }} />
        <text.Body2B textColor={colors.black}>{name}</text.Body2B>
      </area.RowArea>
    </TouchableWithoutFeedback>
  );
}
