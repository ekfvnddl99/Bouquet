import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';

// styles
import colors from '../../styles/colors';
import * as text from '../../styles/styled-components/text';

/**
 * 메일 / 구글 / 애플 로그인 버튼
 *
 * @param content 버튼에 써진 텍스트
 * @param icon 로그인 종류에 따른 아이콘
 * @param onPress 버튼 눌렀을 때 실행되는 함수
 */
type LoginButtonProps = {
  content: string;
  icon: JSX.Element;
  onPress: () => void;
};
export default function LoginButton({
  content,
  icon,
  onPress,
}: LoginButtonProps): React.ReactElement {
  return (
    <SocialButton activeOpacity={1} onPress={onPress}>
      {icon}
      <View style={{ flex: 1, alignItems: 'center' }}>
        <text.Button2B textColor={colors.black}>{content}</text.Button2B>
      </View>
    </SocialButton>
  );
}

const SocialButton = styled.TouchableOpacity`
  background-color: ${colors.white};
  height: 45;
  border-radius: 25;
  align-items: center;
  justify-content: center;
  padding-horizontal: 18;
  margin-top: 10;
  flex-direction: row;
  width: 100%;
`;
