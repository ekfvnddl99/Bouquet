import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

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
  isPress: boolean;
  name: string;
  profileImg: string;
  routePrefix: string;
};
/**
 * (원형 모양의 프로필 사진, 해당 이름) 버튼
 *
 * @param diameter 원의 지름
 * @param isAccount 계정 화면에 쓰이는지 아닌지
 * @param isJustImg 프로필 이미지만 있는지 아닌지
 * @param isPress 누르면 이동 하는 건지 아닌지
 * @param name 프로필 이름
 * @param profileImg 프로필 사진
 * @param routePrefix 라우트 접두사. 어느 탭에서 왔는가!
 */
export default function ProfileButton({
  diameter,
  isAccount,
  isJustImg,
  isPress,
  name,
  profileImg,
  routePrefix,
}: ProfileButtonProps): React.ReactElement {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const [, setViewUser] = useViewUser();
  const [, setViewCharacter] = useViewCharacter();
  /**
   * '상세 프로필' 또는 '계정' 화면으로 이동하는 함수
   * @description 캐릭터/계정 프로필을 눌렀을 때
   */
  async function goNavigation() {
    if (isAccount) {
      await setViewUser(name);
      navigation.push(`${routePrefix}AccountStack`, {
        screen: 'Account',
        params: { routePrefix },
      });
    } else {
      await setViewCharacter(name);
      navigation.push(`${routePrefix}ProfileDetailStack`, {
        screen: 'ProfileDetail',
        params: { routePrefix },
      });
    }
  }

  return (
    <TouchableWithoutFeedback
      onPress={isPress ? () => goNavigation() : undefined}
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
