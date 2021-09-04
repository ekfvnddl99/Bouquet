import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import i18n from 'i18n-js';

// styles
import colors from '../../styles/colors';
import * as area from '../../styles/styled-components/area';
import * as text from '../../styles/styled-components/text';

// assets
import Icon from '../../assets/Icon';

// logics
import useUser from '../../logics/hooks/useUser';
import useCharacter from '../../logics/hooks/useCharacter';
import * as cal from '../../logics/non-server/Calculation';

// utils
import { PostComment } from '../../utils/types/PostTypes';

// components
import ProfileButton from '../button/ProfileButton';

/**
 * 댓글 컴포넌트
 * TODO 댓글 삭제 함수
 * TODO 햇살 set 함수
 *
 * @param commentInfo 댓글 객체. 서버에서 불러온다.
 * @param selectId 사용자가 클릭한 댓글.
 * @param setTargetComment 대댓글 대상이 되는 댓글의 set 함수
 * ---------------
 * @param OpeningCommentArray 대댓글이 보이는 댓글들의 아이디가 담긴 배열
 * @param setOpeningCommentArray 대댓글이 보이는 댓글들의 아이디가 담긴 배열의 set 함수
 */
interface CommentItemProps {
  commentInfo: PostComment;
  selectId: number;
  setTargetComment: (param: PostComment) => void;
  OpeningCommentArray?: number[];
  setOpeningCommentArray?: (param: number[]) => void;
}
export default function CommentItem({
  commentInfo,
  selectId,
  setTargetComment,
  OpeningCommentArray,
  setOpeningCommentArray,
}: CommentItemProps): React.ReactElement {
  // 얘가 부모 댓글일 때, 대댓글이 있는지
  const [isOpeningCommentComment, setIsOpeningCommentComment] = useState(false);
  const [user, isLogined] = useUser();
  const [character, setCharacter] = useCharacter();

  /**
   * 대댓글이 보여지는 댓글들을 배열로 관리하는 함수
   * 대댓글이 보여지는 댓글들은 함수에 넣고, 아니면 뺀다.
   */
  function manageOpeningCommentArray() {
    if (OpeningCommentArray && setOpeningCommentArray) {
      const tmp: number[] = OpeningCommentArray;
      // 대댓글이 열린 상태의 댓글이라면 '추가'
      if (isOpeningCommentComment) {
        if (!tmp.includes(commentInfo.id)) tmp.push(commentInfo.id);
      } else {
        const idx = tmp.indexOf(commentInfo.id);
        tmp.splice(idx, 1);
      }
      setOpeningCommentArray(tmp);
    }
  }

  return (
    <area.NoHeightArea
      marBottom={8}
      paddingH={16}
      paddingV={12}
      style={{
        backgroundColor:
          selectId === commentInfo.id && isLogined
            ? colors.alpha10_primary
            : colors.white,
      }}
    >
      <area.RowArea style={{ alignItems: 'flex-start', marginBottom: 8 }}>
        <View style={{ flex: 2 }}>
          <text.Body2R textColor={colors.black}>
            {commentInfo.comment}
          </text.Body2R>
        </View>
        <View
          style={{
            alignItems: 'flex-end',
            flex: 1,
            justifyContent: 'flex-end',
          }}
        >
          <text.Caption textColor={colors.gray5}>
            {cal.timeName(Number(commentInfo.created_at))} {i18n.t('전')}
          </text.Caption>
        </View>
      </area.RowArea>

      <area.RowArea>
        <ProfileButton
          diameter={20}
          isAccount={false}
          name={commentInfo.name}
          img={commentInfo.profile_img}
        />
        <View style={{ flex: 1 }} />
        <area.RowArea>
          {selectId === commentInfo.id &&
          character.name === commentInfo.name ? (
            <TouchableOpacity>
              <Icon icon="bin" size={18} />
            </TouchableOpacity>
          ) : null}

          {commentInfo.parent === 0 ? (
            <View style={{ marginLeft: 8 }}>
              {isOpeningCommentComment ? (
                <TouchableOpacity
                  onPress={() => [
                    setIsOpeningCommentComment(false),
                    manageOpeningCommentArray,
                  ]}
                >
                  <Icon icon="commentDownArrow" size={18} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => [
                    setIsOpeningCommentComment(true),
                    manageOpeningCommentArray,
                  ]}
                >
                  <Icon icon="commentUpArrow" size={18} />
                </TouchableOpacity>
              )}
            </View>
          ) : null}

          <View style={{ marginLeft: 8 }} />
          <TouchableOpacity onPress={() => setTargetComment(commentInfo)}>
            <Icon icon="comment" size={18} />
          </TouchableOpacity>

          <View style={{ marginLeft: 8 }} />
          <area.RowArea>
            <TouchableOpacity>
              {commentInfo.liked ? (
                <Icon icon="sunFocusPrimary" size={18} />
              ) : (
                <Icon icon="sun" size={18} />
              )}
            </TouchableOpacity>
            <text.Body3 textColor={colors.primary} style={{ marginLeft: 4 }}>
              {cal.numName(commentInfo.num_sunshines)}
            </text.Body3>
          </area.RowArea>
        </area.RowArea>
      </area.RowArea>
    </area.NoHeightArea>
  );
}
