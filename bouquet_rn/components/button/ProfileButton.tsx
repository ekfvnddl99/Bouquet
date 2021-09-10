import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// styles
import colors from '../../styles/colors';
import * as area from '../../styles/styled-components/area';
import * as elses from '../../styles/styled-components/elses';
import * as text from '../../styles/styled-components/text';

// logics
import useViewCharacter from '../../logics/hooks/useViewCharacter';
import useViewUser from '../../logics/hooks/useViewUser';

type ProfileButtonProps = {
  diameter: number;
  isAccount: boolean;
  isJustImg: boolean;
  name: string;
  profileImg: string;
};
/**
 * (원형 모양의 프로필 사진, 해당 이름) 버튼
 *
 * @param diameter 원의 지름
 * @param isAccount 계정 화면에 쓰이는지 아닌지
 * @param isJustImg 프로필 이미지만 있는지 아닌지
 * @param name 프로필 이름
 * @param profileImg 프로필 사진
 */
export default function ProfileButton({
  diameter,
  isAccount,
  isJustImg,
  name,
  profileImg,
}: ProfileButtonProps): React.ReactElement {
  const navigation = useNavigation();
  const [, setViewUser] = useViewUser();
  const [, setViewCharacter] = useViewCharacter();
  /**
   * '상세 프로필' 화면으로 이동하는 함수
   * @description 캐릭터 프로필을 눌렀을 때
   */
  async function goProfileDetail() {
    await setViewCharacter(name);
    navigation.navigate('ProfileDetailStack');
  }
  /**
   * '계정' 화면으로 이동하는 함수
   * @description 계정 프로필을 눌렀을 때
   */
  async function goAccount() {
    await setViewUser(name);
    navigation.navigate('AccountStack');
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => (isAccount ? goAccount() : goProfileDetail())}
    >
      <area.RowArea>
        <elses.CircleImg diameter={diameter} source={{ uri: profileImg }} />
        {isJustImg ? null : (
          <text.Body2B textColor={colors.black} style={{ marginLeft: 8 }}>
            {name}
          </text.Body2B>
        )}
      </area.RowArea>
    </TouchableWithoutFeedback>
  );
}
