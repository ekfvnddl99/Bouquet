import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import i18n from 'i18n-js';

// styles
import colors from '../../styles/colors';
import * as area from '../../styles/styled-components/area';
import * as text from '../../styles/styled-components/text';

// assets
import Icon from '../../assets/Icon';

// logics
import * as cal from '../../logics/non-server/Calculation';
import * as Post from '../../logics/server/Post';

// components
import ProfileButton from '../button/ProfileButton';

interface CommentItemProps {
  info: Post.Comment;
  press: number;
  isOwner: boolean;
  isLogin: boolean;
  setParentComment: (param: Post.Comment) => void;
  setClickId?: (param: number) => void;
  setClickArray?: (param: number[]) => void;
  clickArray?: number[];
}

export default function CommentItem({
  info,
  press,
  isOwner,
  isLogin,
  setParentComment,
  setClickId,
  setClickArray,
  clickArray,
}: CommentItemProps): React.ReactElement {
  // 대댓글이 있는지
  const [isMoreComments, setIsMoreComments] = useState(false);
  useEffect(() => {
    if (setClickId) {
      if (isMoreComments) {
        setClickId(info.id);
        manageClickArray('add');
      } else {
        setClickId(-1);
        manageClickArray('subtract');
      }
    }
  }, [isMoreComments]);

  /**
   * 대댓글이 보여지는 댓글들을 배열로 관리하는 함수
   * 대댓글이 보여지는 댓글들은 함수에 넣고, 아니면 뺀다.
   *
   * @param mode 클릭한 댓글을 추가/삭제 어떤 상황인지 나타내는 문자열 값
   */
  function manageClickArray(mode: string) {
    if (
      typeof clickArray !== 'undefined' &&
      typeof setClickArray !== 'undefined'
    ) {
      const tmp: number[] = clickArray;
      if (mode === 'add') {
        if (!tmp.includes(info.id)) tmp.push(info.id);
      } else {
        const idx = tmp.indexOf(info.id);
        tmp.splice(idx, 1);
      }
      setClickArray(tmp);
    }
  }

  return (
    <area.NoHeightArea
      marBottom={8}
      paddingH={16}
      paddingV={12}
      style={{
        backgroundColor:
          press === info.id && isLogin ? colors.alpha10_primary : colors.white,
      }}
    >
      <area.RowArea style={{ alignItems: 'flex-start', marginBottom: 8 }}>
        <View style={{ flex: 2 }}>
          <text.Body2R textColor={colors.black}>{info.comment}</text.Body2R>
        </View>
        <View
          style={{
            alignItems: 'flex-end',
            flex: 1,
            justifyContent: 'flex-end',
          }}
        >
          <text.Caption textColor={colors.gray5}>
            {cal.timeName(Number(info.createdAt))} {i18n.t('전')}
          </text.Caption>
        </View>
      </area.RowArea>

      <area.RowArea>
        <ProfileButton
          diameter={20}
          isAccount={false}
          name={info.name}
          img={info.profileImg}
        />
        <View style={{ flex: 1 }} />
        <area.RowArea>
          {press === info.id && isOwner ? (
            <TouchableOpacity>
              <Icon icon="bin" size={18} />
            </TouchableOpacity>
          ) : null}
          {info.children ? (
            <View style={{ marginLeft: 8 }}>
              {isMoreComments ? (
                <TouchableOpacity onPress={() => setIsMoreComments(false)}>
                  <Icon icon="commentDownArrow" size={18} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => setIsMoreComments(true)}>
                  <Icon icon="commentUpArrow" size={18} />
                </TouchableOpacity>
              )}
            </View>
          ) : null}

          <View style={{ marginLeft: 8 }} />
          <TouchableOpacity onPress={() => setParentComment(info)}>
            <Icon icon="comment" size={18} />
          </TouchableOpacity>

          <View style={{ marginLeft: 8 }} />
          <area.RowArea>
            <TouchableOpacity>
              {info.liked ? (
                <Icon icon="sunFocusPri" size={18} />
              ) : (
                <Icon icon="sun" size={18} />
              )}
            </TouchableOpacity>
            <text.Body3 textColor={colors.primary} style={{ marginLeft: 4 }}>
              {cal.numName(0)}
            </text.Body3>
          </area.RowArea>
        </area.RowArea>
      </area.RowArea>
    </area.NoHeightArea>
  );
}
