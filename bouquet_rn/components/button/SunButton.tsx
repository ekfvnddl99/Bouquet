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
  sunNum: number;
  active: boolean;
  postId: number;
  isQna?: boolean;
  refreshSunshine?: (newLiked: boolean, newNumSunshines: number) => void;
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
  active,
  postId,
  isQna,
  refreshSunshine,
}: SunButtonProps): React.ReactElement {
  const [myCharacter] = useCharacter();

  const [backgroundColor, setBackgroundColor] = useState('transparent');

  async function likePost() {
    if (myCharacter.name === '') {
      alert('캐릭터를 설정해주세요!');
      return;
    }
    const newLiked = !active;
    let newNumSunshines = sunNum;
    if (newLiked) newNumSunshines += 1;
    else newNumSunshines -= 1;
    if (refreshSunshine) refreshSunshine(newLiked, newNumSunshines);

    const functionToExecute = isQna ? likeQnaAsync : likePostAsync;

    const serverResult = await functionToExecute(postId);
    if (serverResult.isSuccess) {
      const realState = serverResult.result;
      if (realState !== newLiked && refreshSunshine) {
        if (realState) refreshSunshine(realState, newNumSunshines + 2);
        else refreshSunshine(realState, newNumSunshines - 2);
      }
    } else {
      alert(serverResult.result.errorMsg);
      if (refreshSunshine) {
        if (newLiked) refreshSunshine(!newLiked, newNumSunshines - 1);
        else refreshSunshine(!newLiked, newNumSunshines + 1);
      }
    }
  }

  return (
    <button.SunButton
      activeOpacity={1}
      onPress={() => likePost()}
      backgroundColor={active ? colors.primary : backgroundColor}
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
        {cal.numName(sunNum)}
      </text.Body3>
    </button.SunButton>
  );
}
