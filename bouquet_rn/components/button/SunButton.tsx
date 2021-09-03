import React, { useState } from 'react';

// styles
import colors from '../../styles/colors';
import * as button from '../../styles/styled-components/button';
import * as text from '../../styles/styled-components/text';

// assets
import Svg from '../../assets/Icon';

// logics
import * as cal from '../../logics/non-server/Calculation';

/**
 * 햇님 버튼
 * * state로 sunNum, isActive 할 거라서 그냥 sun, active라고 했음.
 *
 * @param sun 햇살 개수
 * @param active 버튼이 눌러졌는지
 */
type SunButtonProps = {
  sun: number;
  active: boolean;
};
export default function SunButton({
  sun,
  active,
}: SunButtonProps): React.ReactElement {
  const [isActive, setIsActive] = useState(active);
  const [sunNum, setSunNum] = useState(sun);
  const [backgroundColor, setBackgroundColor] = useState('transparent');

  return (
    <button.SunButton
      activeOpacity={1}
      onPress={() => setIsActive(!isActive)}
      backgroundColor={isActive ? colors.primary : backgroundColor}
      onPressIn={() => setBackgroundColor(colors.alpha20_primary)}
      onPressOut={() => [
        setIsActive(!isActive),
        setBackgroundColor('transparent'),
        isActive ? setSunNum(sunNum - 1) : setSunNum(sunNum + 1),
      ]}
    >
      {isActive ? (
        <Svg icon="sunFocus" size={20} />
      ) : (
        <Svg icon="sun" size={20} />
      )}
      <text.Body3
        textColor={isActive ? colors.white : colors.primary}
        style={{ marginLeft: 4 }}
      >
        {cal.numName(sunNum)}
      </text.Body3>
    </button.SunButton>
  );
}
