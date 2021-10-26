import React, { useState } from 'react';
import { View, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import i18n from 'i18n-js';
import { useNavigation } from '@react-navigation/native';
import * as Analytics from 'expo-firebase-analytics';

// styles
import colors from '../../styles/colors';
import * as area from '../../styles/styled-components/area';
import * as text from '../../styles/styled-components/text';

// logics
import * as cal from '../../logics/non-server/Calculation';
import { deleteQnaAsync } from '../../logics/server/QnAs';
import useCharacter from '../../logics/hooks/useCharacter';

// utils
import { Character, MyCharacter } from '../../utils/types/UserTypes';
import { Qna } from '../../utils/types/PostTypes';

// components
import ProfileButton from '../button/ProfileButton';
import QuestionItem from './QuestionItem';
import SunButton from '../button/SunButton';

import Icon from '../../assets/Icon';

type QnAItemProps = {
  qna: Qna;
  characterInfo: Character | MyCharacter;
  routePrefix: string;
  refresh?: () => Promise<void>;
  onPressSun: (postInfo: Qna) => Promise<void>;
};
/**
 * 질답 게시물 컴포넌트
 * ! 뭔가 객체 자체를 반환할 것 같다.
 * TODO 햇살
 * TODO 햇살 set 함수
 * TODO 시간
 *
 * @param question 질문
 * @param answer 대답
 * @param characterInfo 해당 캐릭터 객체
 * @param routePrefix 라우트 접두사. 어느 탭에서 왔는가!
 */
export default function QnAItem({
  qna,
  characterInfo,
  routePrefix,
  refresh,
  onPressSun,
}: QnAItemProps): React.ReactElement {
  const navigation = useNavigation();
  const [myCharacter] = useCharacter();

  /**
   * '상세 게시물' 화면으로 가는 함수
   *
   * TODO SunButton의 postId 바꿔야함.
   * */
  function goPostStack() {
    navigation.navigate(`${routePrefix}PostStack`, { routePrefix });
  }

  const [loading, setLoading] = useState(false);
  async function deleteQna() {
    if (loading) return;
    setLoading(true);

    const serverResult = await deleteQnaAsync(qna.id);
    if (serverResult.isSuccess) {
      await Analytics.logEvent('delete_qna');
      alert('Q&A가 삭제되었어요.');
      if (refresh) await refresh();
    }
    setLoading(false);
  }

  return (
    <TouchableWithoutFeedback onPress={() => goPostStack}>
      <WholeArea>
        <area.RowArea style={{ marginBottom: 10 }}>
          <View style={{ flex: 1 }}>
            <ProfileButton
              diameter={30}
              isAccount={false}
              isJustImg={false}
              isPress
              name={characterInfo.name}
              profileImg={characterInfo.profile_img}
              routePrefix={routePrefix}
            />
          </View>
        </area.RowArea>
        <QuestionItem question={qna.question} />
        <MiddleLine />
        <text.Body2R
          textColor={colors.black}
          style={{
            marginBottom: 10,
            paddingHorizontal: 10,
            paddingVertical: 10,
          }}
        >
          {qna.answer}
        </text.Body2R>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <SunButton
            sunNumber={qna.num_sunshines}
            active={qna.liked}
            onPress={() => onPressSun(qna)}
          />
          {myCharacter.id === characterInfo.id ? (
            <TouchableOpacity onPress={() => deleteQna()}>
              <Icon icon="bin" size={20} />
            </TouchableOpacity>
          ) : null}
        </View>
      </WholeArea>
    </TouchableWithoutFeedback>
  );
}

const MiddleLine = styled.View`
  border-width: 1;
  border-color: ${colors.gray5};
  margin-bottom: 10;
  margin-horizontal: 10;
`;

const WholeArea = styled.View`
  padding-horizontal: 10;
  padding-vertical: 10;
  background-color: ${colors.white};
  border-radius: 10;
  margin-bottom: 10;
`;
