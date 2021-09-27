import React from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components/native';
import i18n from 'i18n-js';
import { useNavigation } from '@react-navigation/native';

// styles
import colors from '../../styles/colors';
import * as area from '../../styles/styled-components/area';
import * as text from '../../styles/styled-components/text';

// logics
import * as cal from '../../logics/non-server/Calculation';

// utils
import { Character, MyCharacter } from '../../utils/types/UserTypes';

// components
import ProfileButton from '../button/ProfileButton';
import QuestionItem from './QuestionItem';
import SunButton from '../button/SunButton';

type QnAItemProps = {
  question: string;
  answer: string;
  characterInfo: Character | MyCharacter;
  routePrefix: string;
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
  question,
  answer,
  characterInfo,
  routePrefix,
}: QnAItemProps): React.ReactElement {
  const navigation = useNavigation();

  /**
   * '상세 게시물' 화면으로 가는 함수
   *
   * TODO SunButton의 postId 바꿔야함.
   * */
  function goPostStack() {
    navigation.navigate(`${routePrefix}PostStack`, { routePrefix });
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
          <text.Caption textColor={colors.gray5}>
            {cal.timeName('')} {i18n.t('전')}
          </text.Caption>
        </area.RowArea>
        <QuestionItem question={question} />
        <MiddleLine />
        <text.Body2R
          textColor={colors.black}
          style={{
            marginBottom: 10,
            paddingHorizontal: 10,
            paddingVertical: 10,
          }}
        >
          {answer}
        </text.Body2R>
        <View style={{ alignItems: 'flex-start' }}>
          <SunButton
            sunNum={0}
            setSunNum={() => undefined}
            active={false}
            postId={0}
          />
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
