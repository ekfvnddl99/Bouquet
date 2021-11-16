import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';

// styles
import colors from '../../styles/colors';
import * as text from '../../styles/styled-components/text';
import * as area from '../../styles/styled-components/area';
import * as button from '../../styles/styled-components/button';

type ChooseButtonProps = {
  isLeft: boolean;
  onPress?: () => void;
  leftContent: string;
  rightContent: string;
  buttonColor: string;
};
/**
 * 배경색 없이 테두리만 있는 버튼
 *
 * @param onPress 버튼 눌렀을 때 실행되는 함수
 * @param content 버튼 이름
 * @param borderColor
 */
export default function ChooseButton({
  isLeft,
  onPress,
  leftContent,
  rightContent,
  buttonColor,
}: ChooseButtonProps): React.ReactElement {
  return (
    <area.RowArea>
      <ButtonContainer
        style={{
          borderColor: buttonColor,
          borderTopLeftRadius: 4,
          borderBottomLeftRadius: 4,
          backgroundColor: isLeft ? buttonColor : colors.white,
        }}
        onPress={onPress}
      >
        <text.Button3 textColor={isLeft ? colors.white : buttonColor}>
          {leftContent}
        </text.Button3>
      </ButtonContainer>
      <ButtonContainer
        style={{
          borderColor: buttonColor,
          borderTopRightRadius: 4,
          borderBottomRightRadius: 4,
          backgroundColor: !isLeft ? buttonColor : colors.white,
        }}
        onPress={onPress}
      >
        <text.Button3 textColor={!isLeft ? colors.white : buttonColor}>
          {rightContent}
        </text.Button3>
      </ButtonContainer>
    </area.RowArea>
  );
}

const ButtonContainer = styled.TouchableOpacity`
  background-color: ${colors.white};
  border-width: 1;
  padding-horizontal: 8;
  padding-vertical: 4;
`;
