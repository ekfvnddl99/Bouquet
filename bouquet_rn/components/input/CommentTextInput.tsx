import React from 'react';
import { View, TouchableOpacity, Platform } from 'react-native';
import styled from 'styled-components/native';

// styles
import colors from '../../styles/colors';
import * as elses from '../../styles/styled-components/elses';
import * as text from '../../styles/styled-components/text';

// assets
import Svg from '../../assets/Icon';

// logics
import useCharacter from '../../logics/hooks/useCharacter';
import { PostComment } from '../../utils/types/PostTypes';

/**
 * 댓글 입력하는 textinput
 *
 * @param textValue textinput의 value로 지정할 것
 * @param onChanageText textinput의 onChangeText 함수 역할을 할 것
 * @param onPress '전송' 버튼 누르면 실행되는 함수
 * @param isChild 대댓글인지 아닌지
 * @param setParentComment 대댓글의 대상이 되는 부모댓글 set 함수 (대상이 되는 부모댓글을 x버튼으로 누를 때 삭제하기 위해 사용됨)
 * @param parentComment 대댓글의 대상이 되는 부모댓글 Comment 객체
 */
type CommInputProps = {
  textValue: string;
  onChanageText: (param: string) => void;
  onPress: (param: string) => void;
  isChild: boolean;
  setParentComment?: () => void;
  parentComment?: PostComment;
};
export default function CommentTextInput({
  textValue,
  onChanageText,
  onPress,
  isChild,
  setParentComment,
  parentComment,
}: CommInputProps): React.ReactElement {
  const [character, setCharacter] = useCharacter();

  return (
    <View>
      {isChild ? (
        <CommentUpperArea>
          <Svg icon="commentInput" size={18} />
          <View style={{ flex: 1, marginHorizontal: 8 }}>
            <text.Body3 textColor={colors.gray6} numberOfLines={1}>
              {parentComment ? parentComment.comment : parentComment}
            </text.Body3>
          </View>
          <TouchableOpacity
            onPress={setParentComment ? () => setParentComment : undefined}
          >
            <Svg icon="roundX" size={18} />
          </TouchableOpacity>
        </CommentUpperArea>
      ) : null}

      <CommentLowerArea>
        <View style={{ marginBottom: 3 }}>
          <elses.CircleImg
            diameter={30}
            source={{ uri: character.profileImg }}
          />
        </View>
        <CommentInput
          placeholder="어떤 반응을 남기고 싶나요?"
          placeholderTextColor={colors.gray5}
          value={textValue}
          onChangeText={(input: string) => onChanageText(input)}
          multiline
        />
        <TouchableOpacity
          style={{ marginBottom: 3 }}
          onPress={() => onPress(textValue)}
        >
          <Svg icon="send" size={30} />
        </TouchableOpacity>
      </CommentLowerArea>
    </View>
  );
}

const CommentUpperArea = styled.View`
  background-color: ${colors.gray1};
  height: 32;
  justify-content: center;
  align-item
  padding-horizontal: 15;
  padding-vertical: 7;
  align-items:center;
  flex-direction:row;
`;
const CommentLowerArea = styled.View`
  align-items: flex-end;
  background-color: ${colors.white};
  flex-direction: row;
  justify-content: center;
  padding-horizontal: 18;
  padding-vertical: 8;
`;
const CommentInput = styled.TextInput`
  background-color: ${colors.gray0};
  border-radius: 10;
  flex: 1;
  margin-horizontal: 12;
  min-height: 33;
  padding-bottom: ${Platform.OS === 'ios' ? 8 : 0};
  padding-horizontal: 18;
  padding-top: ${Platform.OS === 'ios' ? 8 : 0};
`;
