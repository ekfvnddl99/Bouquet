import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';

// styles
import colors from '../../styles/colors';
import * as area from '../../styles/styled-components/area';

// components
import ProfileButton from '../button/ProfileButton';
import LineButton from '../button/LineButton';
import QuestionItem from '../item/QuestionItem';
import QnAItem from '../item/QnAItem';

// logics
import useCharacter from '../../logics/hooks/useCharacter';
import { createQnaAsync, getQuestionAsync } from '../../logics/server/QnAs';

// utils
import { QnaRequest } from '../../utils/types/PostTypes';

type QnATextInputProps = {
  routePrefix: string;
};
/**
 * Home의 피드 상단에 있는 질답
 * TODO 질문에 답하면 업로드 하는 함수를 연결해야 함
 *
 * @param routePrefix 라우트 접두사. 어느 탭에서 왔는가!
 */
export default function QnATextInput({
  routePrefix,
}: QnATextInputProps): React.ReactElement {
  const [myCharacter] = useCharacter();
  // '올리기' 버튼 눌렀는지 여부를 저장하는 state
  const [isUpload, setIsUpload] = useState(false);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  async function createQuestion(qna: QnaRequest) {
    const serverResult = await createQnaAsync(qna);
    if (serverResult.isSuccess) {
      setIsUpload(true);
    } else alert(serverResult.result.errorMsg);
  }

  async function getQuestion() {
    const serverResult = await getQuestionAsync();
    if (serverResult.isSuccess) {
      setQuestion(serverResult.result);
    } else alert(serverResult.result.errorMsg);
  }

  useEffect(() => {
    getQuestion();
  }, []);

  if (isUpload) {
    return (
      // 여기로 질문이랑 답변 넘겨줘야 함!
      <QnAItem
        question={question}
        answer={answer}
        characterInfo={myCharacter}
        routePrefix={routePrefix}
      />
    );
  }
  return (
    <area.NoHeightArea paddingH={10} paddingV={10} marBottom={10}>
      <area.RowArea style={{ marginBottom: 10 }}>
        <View style={{ flex: 1 }}>
          <ProfileButton
            diameter={30}
            isAccount={false}
            isJustImg={false}
            isPress
            name={myCharacter.name}
            profileImg={myCharacter.profile_img}
            routePrefix={routePrefix}
          />
        </View>
        <LineButton
          onPress={() => getQuestion()}
          content="질문 바꾸기"
          borderColor={colors.black}
        />
      </area.RowArea>

      <QuestionItem question={question} />

      <MiddleLine />

      <AnswerTextInput
        placeholder="답변을 입력해 보세요."
        multiline
        onChangeText={(input) => setAnswer(input)}
      />
      <View style={{ alignItems: 'flex-end' }}>
        <LineButton
          onPress={() => createQuestion({ question, answer })}
          content="올리기"
          borderColor={colors.primary}
        />
      </View>
    </area.NoHeightArea>
  );
}

// 구분선
const MiddleLine = styled.View`
  border-width: 1;
  border-color: ${colors.gray5};
  margin-bottom: 10;
  margin-horizontal: 10;
`;
const AnswerTextInput = styled.TextInput`
  margin-bottom: 10;
  padding-horizontal: 10;
  padding-vertical: 10;
`;
