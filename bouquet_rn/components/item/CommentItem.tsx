import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import i18n from 'i18n-js';
import { colors } from '../../styles/colors';
import * as area from '../../styles/styled-components/area';
import * as text from '../../styles/styled-components/text';
import * as button from '../../styles/styled-components/button';

// icons
import Icon from '../../assets/Icon';

// props & logic
import * as cal from '../../logics/non-server/Calculation';
import * as Post from '../../logics/Post';

// components
import ProfileButton from '../button/ProfileButton';

interface CommentItemProps {
  info: Post.Comment;
  press: number;
  isOwner: boolean;
  isLogin: boolean;
  setSelect: Function;
  setParentComment: Function;
  IsClick?: Function;
  AddClicks?: Function;
  clicks?: number[];
}

export default function CommentItem({
  info,
  press,
  isOwner,
  isLogin,
  setSelect,
  setParentComment,
  IsClick,
  AddClicks,
  clicks,
}: CommentItemProps): React.ReactElement {
  const [isMoreComments, setIsMoreComments] = useState(false);
  useEffect(() => {
    if (IsClick) {
      if (isMoreComments) {
        IsClick(info.id);
        inClick();
      } else {
        IsClick(-1);
        outClick();
      }
    }
  }, [isMoreComments]);

  const inClick = () => {
    if (clicks && AddClicks) {
      const tmp: number[] = clicks;
      if (tmp.includes(info.id) === false) tmp.push(info.id);
      AddClicks(tmp);
    }
  };
  const outClick = () => {
    if (clicks && AddClicks) {
      const tmp: number[] = clicks;
      const idx = tmp.indexOf(info.id);
      tmp.splice(idx, 1);
      AddClicks(tmp);
    }
  };

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
          <text.Body2R color={colors.black}>{info.comment}</text.Body2R>
        </View>
        <View
          style={{
            alignItems: 'flex-end',
            flex: 1,
            justifyContent: 'flex-end',
          }}
        >
          <text.Caption color={colors.gray5}>
            {cal.timeName(Number(info.createdAt))} {i18n.t('전')}
          </text.Caption>
        </View>
      </area.RowArea>

      <area.RowArea>
        <ProfileButton
          diameter={20}
          isAccount={false}
          name={info.name}
          profile={info.profileImg}
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
            <text.Body3 color={colors.primary} style={{ marginLeft: 4 }}>
              {cal.numName(0)}
            </text.Body3>
          </area.RowArea>
        </area.RowArea>
      </area.RowArea>
    </area.NoHeightArea>
  );
}
