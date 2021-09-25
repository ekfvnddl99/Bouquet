import React, { useState } from 'react';

// styles
import colors from '../../styles/colors';
import * as button from '../../styles/styled-components/button';
import * as text from '../../styles/styled-components/text';

// assets
import Svg from '../../assets/Icon';

// logics
import * as cal from '../../logics/non-server/Calculation';
import { sendPushNotificationAsync } from '../../logics/server/Notification';

type SunButtonProps = {
  sunNum: number;
  setSunNum: (param: number) => void;
  active: boolean;
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
  sunNum,
  setSunNum,
  active,
}: SunButtonProps): React.ReactElement {
  const [isActive, setIsActive] = useState(active);
  const [backgroundColor, setBackgroundColor] = useState('transparent');

  async function send() {
    const serverResult = await sendPushNotificationAsync('aaa', 'likePost');
  }

  return (
    <button.SunButton
      activeOpacity={1}
      onPress={() => [setIsActive(!isActive), send()]}
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
