import React, { useState, useEffect } from 'react';

// styles
import colors from '../../styles/colors';
import * as button from '../../styles/styled-components/button';
import * as text from '../../styles/styled-components/text';

// assets
import Svg from '../../assets/Icon';

// logics
import * as cal from '../../logics/non-server/Calculation';
import { likePostAsync } from '../../logics/server/Post';
import { likeQnaAsync } from '../../logics/server/QnAs';
import useCharacter from '../../logics/hooks/useCharacter';

type SunButtonProps = {
  sunNumber: number;
  active: boolean;
  onPress: () => void;
};
/**
 * 햇님 버튼
 * * state로 isActive 할 거라서 그냥 active라고 지었다.
 *
 * @param sunNum 햇살 개수
 * @param setSunNum 햇살의 set 함수
 * @param active 버튼이 눌러졌는지
 */
export default function SunButton({
  sunNumber,
  active,
  onPress,
}: SunButtonProps): React.ReactElement {
  return (
    <button.SunButton
      activeOpacity={1}
      onPress={onPress}
      backgroundColor={active ? colors.primary : 'transparent'}
    >
      {active ? (
        <Svg icon="sunFocus" size={20} />
      ) : (
        <Svg icon="sun" size={20} />
      )}
      <text.Body3
        textColor={active ? colors.white : colors.primary}
        style={{ marginLeft: 4 }}
      >
        {cal.numName(sunNumber)}
      </text.Body3>
    </button.SunButton>
  );
}
