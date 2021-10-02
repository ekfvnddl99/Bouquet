import React, { useState } from 'react';

// styles
import colors from '../../styles/colors';
import * as button from '../../styles/styled-components/button';
import * as text from '../../styles/styled-components/text';

// assets
import Svg from '../../assets/Icon';

// logics
import * as cal from '../../logics/non-server/Calculation';
import { likePostAsync } from '../../logics/server/Post';

type SunButtonProps = {
  sunNum: number;
  setSunNum: (param: number) => void;
  active: boolean;
  postId: number;
};
/**
 * 햇님 버튼
 * * state로 isActive 할 거라서 그냥 active라고 지었다.
 *
 * @param sunNum 햇살 개수
 * @param setSunNum 햇살의 set 함수
 * @param active 버튼이 눌러졌는지
 * @param postId 해당 포스트의 아이디
 */
export default function SunButton({
  sunNum,
  setSunNum,
  active,
  postId,
}: SunButtonProps): React.ReactElement {
  const [isActive, setIsActive] = useState(active);
  const [backgroundColor, setBackgroundColor] = useState('transparent');

  async function likePost() {
    const serverResult = await likePostAsync(postId);
    if (serverResult.isSuccess) {
      setIsActive(!isActive);
      if (isActive) setSunNum(sunNum + 1);
      else setSunNum(sunNum - 1);
    } else alert(serverResult.result.errorMsg);
  }

  return (
    <button.SunButton
      activeOpacity={1}
      onPress={() => likePost()}
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
