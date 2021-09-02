import React, { Component, useState, useCallback, useMemo } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import i18n from 'i18n-js';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../styles/colors';
import * as area from '../../styles/styled-components/area';
import * as text from '../../styles/styled-components/text';
import * as button from '../../styles/styled-components/button';
import { useRecoilState } from 'recoil';

// props & logic
import * as cal from '../../logics/non-server/Calculation';
import {
  PostInterface,
  AllPostRequestType,
  RequestToPostAsync,
} from '../../logics/Post';
import { viewPostState } from '../../logics/atoms';

// components
import SunButton from '../button/SunButton';
import ProfileButton from '../button/ProfileButton';

import TextTemplate from '../../screens/template/TextTemplate';
import ImageTemplate from '../../screens/template/ImageTemplate';
import AlbumTemplate from '../../screens/template/AlbumTemplate';
import DiaryTemplate from '../../screens/template/DiaryTemplate';
import ListTemplate from '../../screens/template/ListTemplate';
import { useEffect } from 'react';

type PostingItemProps = {
  info?: PostInterface<AllPostRequestType>;
};
export default function PostingItem({
  info,
}: PostingItemProps): React.ReactElement {
  const navigation = useNavigation();
  const [viewPost, setViewPost] = useRecoilState(viewPostState);
  function goPosting() {
    if (info) {
      setViewPost(info);
      navigation.navigate('PostItem');
    }
  }

  const getTemplate = useCallback(() => {
    if (info) {
      switch (info.template.template) {
        case 'None':
          return <TextTemplate mode="mini" content={info.template.text} />;
        case 'Image':
          return <ImageTemplate mode="mini" post={info} />;
        case 'Diary':
          return <DiaryTemplate mode="mini" post={info} />;
        case 'Album':
          return <AlbumTemplate mode="mini" post={info} />;
        case 'List':
          return <ListTemplate mode="mini" post={info} />;
        default:
          return null;
      }
    } else return null;
  }, [info]);
  const template = useMemo(() => getTemplate(), [getTemplate]);

  return (
    <button.BigListButton
      backgroundColor={colors.white}
      paddingH={10}
      paddingV={10}
      onPress={() => goPosting}
      activeOpacity={1}
    >
      <area.RowArea>
        <View style={{ alignItems: 'center', flex: 2, flexDirection: 'row' }}>
          <ProfileButton
            diameter={30}
            isAccount={false}
            name={info ? info.characterName : ''}
            profile={info ? info.characterImg : ''}
          />
        </View>
        <View style={{ alignItems: 'flex-end', flex: 1 }}>
          <text.Caption color={colors.gray5}>
            {cal.timeName(1)} {i18n.t('전')}
          </text.Caption>
        </View>
      </area.RowArea>
      <View style={{ marginVertical: 10 }}>{template}</View>
      <View style={{ alignItems: 'flex-start' }}>
        <SunButton
          active={info ? info.liked : false}
          sun={info ? info.numSunshines : 0}
        />
      </View>
    </button.BigListButton>
  );
}
