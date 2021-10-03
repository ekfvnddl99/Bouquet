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
import useCharacter from '../../logics/hooks/useCharacter';
import * as cal from '../../logics/non-server/Calculation';
import { likeCommentAsync } from '../../logics/server/Post';

// utils
import { PostComment } from '../../utils/types/PostTypes';

// components
import ProfileButton from '../button/ProfileButton';

type CommentItemProps = {
  commentInfo: PostComment;
  selectComment: PostComment;
  setTargetComment: (param: string) => void;
  setTargetCommentId: (param: number) => void;
  onDelete: () => void;
  routePrefix: string;
  openingCommentArray?: number[];
  setOpeningCommentArray?: (param: number[]) => void;
};
/**
 * 댓글 컴포넌트
 * TODO 댓글 삭제 함수
 * TODO 햇살 set 함수
 *
 * @param commentInfo 댓글 객체. 서버에서 불러온다.
 * @param selectComment 사용자가 클릭한 댓글.
 * @param setTargetComment 대댓글 대상이 되는 댓글의 set 함수
 * @param setTargetCommentId 대댓글 대상이 되는 댓글의 아이디 set 함수
 * * 대댓글에 대댓글을 달 경우, 대상이 되는 대댓글을 담은 댓글의 아이디가 들어간다.
 * @param onDelete 댓글 삭제 함수
 * @param routePrefix 라우트 접두사. 어느 탭에서 왔는가!
 * ---------------
 * @param openingCommentArray 대댓글이 보이는 댓글들의 아이디가 담긴 배열
 * @param setOpeningCommentArray 대댓글이 보이는 댓글들의 아이디가 담긴 배열의 set 함수
 */
export default function CommentItem({
  commentInfo,
  selectComment,
  setTargetComment,
  setTargetCommentId,
  onDelete,
  routePrefix,
  openingCommentArray,
  setOpeningCommentArray,
}: CommentItemProps): React.ReactElement {
  const [myCharacter] = useCharacter();
  const [isActive, setIsActive] = useState(commentInfo.liked);

  return (
    <area.NoHeightArea
      marBottom={8}
      paddingH={16}
      paddingV={12}
      style={{
        backgroundColor:
          selectComment.id === commentInfo.id &&
          myCharacter.name === commentInfo.character_info.name
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
            {cal.timeName(commentInfo.created_at)} {i18n.t('전')}
          </text.Caption>
        </View>
      </area.RowArea>

      <area.RowArea>
        <ProfileButton
          diameter={20}
          isAccount={false}
          isJustImg={false}
          isPress
          name={commentInfo.character_info.name}
          profileImg={commentInfo.character_info.profile_img}
          routePrefix={routePrefix}
        />
        <View style={{ flex: 1 }} />
        <area.RowArea>
          {selectComment.id === commentInfo.id &&
          myCharacter.name === commentInfo.character_info.name ? (
            <TouchableOpacity onPress={() => onDelete()}>
              <Icon icon="bin" size={18} />
            </TouchableOpacity>
          ) : null}

          {commentInfo.parent === 0 &&
          commentInfo.children.length > 0 &&
          openingCommentArray &&
          setOpeningCommentArray ? (
            <View style={{ marginLeft: 8 }}>
              {openingCommentArray.includes(commentInfo.id) ? (
                <TouchableOpacity
                  onPress={() =>
                    setOpeningCommentArray(
                      openingCommentArray.filter(
                        (item) => item !== commentInfo.id,
                      ),
                    )
                  }
                >
                  <Icon icon="commentDownArrow" size={18} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() =>
                    setOpeningCommentArray([
                      ...openingCommentArray,
                      commentInfo.id,
                    ])
                  }
                >
                  <Icon icon="commentUpArrow" size={18} />
                </TouchableOpacity>
              )}
            </View>
          ) : null}

          <TouchableOpacity
            onPress={() => [
              setTargetCommentId(
                commentInfo.parent === 0 ? commentInfo.id : commentInfo.parent,
              ),
              setTargetComment(commentInfo.comment),
            ]}
            style={{ marginLeft: 8 }}
          >
            <Icon icon="comment" size={18} />
          </TouchableOpacity>

          <area.RowArea style={{ marginLeft: 8 }}>
            <TouchableOpacity
              onPress={async () => {
                const newState = !isActive;
                setIsActive(newState);
                const serverResult = await likeCommentAsync(commentInfo.id);
                if (serverResult.isSuccess) setIsActive(serverResult.result);
                else setIsActive(!newState);
              }}
            >
              {isActive ? (
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
