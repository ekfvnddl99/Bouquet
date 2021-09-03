import React, { useState } from 'react';
import { View, TextInput } from 'react-native';
import styled from 'styled-components/native';

// styles
import colors from '../../styles/colors';
import * as area from '../../styles/styled-components/area';

// logics
import useCharacter from '../../logics/hooks/useCharacter';

// components
import ProfileButton from '../button/ProfileButton';
import LineButton from '../button/LineButton';
import QuestionItem from '../item/QuestionItem';
import QnAItem from '../item/QnAItem';

/**
 * Home의 피드 상단에 있는 질답
 *
 * @param question 질문
 * @param onChangeQuestion '질문 바꾸기' 버튼 눌렀을 때 실행되는 함수
 */
type QnATextInputProps = {
  question: string;
  onChangeQuestion: () => void;
};
export default function QnATextInput({
  question,
  onChangeQuestion,
}: QnATextInputProps): React.ReactElement {
  // '올리기' 버튼 눌렀는지 여부를 저장하는 state
  const [isUpload, setIsUpload] = useState(false);
  const [answer, setAnswer] = useState('');
  const [character, setCharacter] = useCharacter();

  if (!isUpload) {
    return (
      <area.NoHeightArea paddingH={10} paddingV={10} marBottom={10}>
        <area.RowArea style={{ marginBottom: 10 }}>
          <View style={{ flex: 1 }}>
            <ProfileButton
              diameter={30}
              isAccount={false}
              name={character.name}
              img={character.profileImg}
            />
          </View>
          <LineButton
            onPress={onChangeQuestion}
            content="질문 바꾸기"
            borderColor={colors.black}
          />
        </area.RowArea>

        <QuestionItem question={question} />

        <MiddleLine />
        <TextInput
          placeholder="답변을 입력해 보세요."
          multiline
          onChangeText={(input) => setAnswer(input)}
          style={{
            marginBottom: 10,
            paddingHorizontal: 10,
            paddingVertical: 10,
          }}
        />
        <View style={{ alignItems: 'flex-end' }}>
          <LineButton
            onPress={() => setIsUpload(true)}
            content="올리기"
            borderColor={colors.primary}
          />
        </View>
      </area.NoHeightArea>
    );
  }
  return (
    // 여기로 질문이랑 답변 넘겨줘야 함!
    <QnAItem question={question} answer={answer} />
  );
}

const MiddleLine = styled.View`
  border-width: 1;
  border-color: ${colors.gray5};
  margin-bottom: 10;
  margin-horizontal: 10;
`;
