import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  View,
  BackHandler,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import I18n from 'i18n-js';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil';

// styles
import colors from '../../styles/colors';
import * as area from '../../styles/styled-components/area';
import * as text from '../../styles/styled-components/text';
import * as button from '../../styles/styled-components/button';
import * as input from '../../styles/styled-components/input';

// logics
import { selectTemplate, viewPostState } from '../../logics/atoms';
import { uploadPostAsync } from '../../logics/server/Post';

// components
import ConditionButton from '../../components/button/ConditionButton';
import ProfileButton from '../../components/button/ProfileButton';
import HeaderItem from '../../components/item/HeaderItem';
import LineButton from '../../components/button/LineButton';

// templates
import ImageTemplate from '../template/ImageTemplate';
import AlbumTemplate from '../template/AlbumTemplate';
import DiaryTemplate from '../template/DiaryTemplate';
import ListTemplate from '../template/ListTemplate';

// utils
import { WritingStackParam } from '../../utils/types/NavigationTypes';
import { Character } from '../../utils/types/UserTypes';
import { PostRequest } from '../../utils/types/PostTypes';

function setTemplate(idx: number) {
  switch (idx) {
    case 1:
      return <ImageTemplate mode="edit" />;
    case 2:
      return <AlbumTemplate mode="edit" />;
    case 3:
      return <DiaryTemplate mode="edit" />;
    case 4:
      return <ListTemplate mode="edit" />;
    default:
      return null;
  }
}

type PostWritingScreenProps = {
  characterInfo: Character;
};
export default function PostWritingScreen({
  characterInfo,
}: PostWritingScreenProps): React.ReactElement {
  const navigation = useNavigation<StackNavigationProp<WritingStackParam>>();
  // 템플릿을 고른 상태라면 select에 1을 넣어줘야 한다.
  const select = useRecoilValue(selectTemplate);
  const setSelect = useSetRecoilState(selectTemplate);
  const [defaultText, setDefaultText] = useState('');
  const [viewPost, setViewPost] = useRecoilState(viewPostState);
  const [post, setPost] = useState<PostRequest<template>>({
    character_id: characterInfo.id,
    template: 'None',
    text: defaultText,
  });

  function backAction() {
    setSelect(-1);
    navigation.goBack();
    return true;
  }
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
  });

  function goSelect() {
    navigation.navigate('SelectTemplate');
  }
  async function goUpload() {
    setSelect(-1);
    const serverResult = await uploadPostAsync({
      ...post,
      characterId: characterInfo.id,
    });
    if (serverResult.isSuccess) {
      setViewPost(post);
      navigation.replace('PostStack');
    } else alert(serverResult.result.errorMsg);
  }
  return (
    <area.Container>
      <HeaderItem
        isAccount={false}
        isBackButton
        name={characterInfo.name}
        profileImg={characterInfo.profile_img}
      />

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="height">
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="always"
          >
            <area.ContainerBlank30>
              <area.RowArea>
                <View style={{ flex: 1 }}>
                  <ProfileButton
                    diameter={30}
                    isAccount={false}
                    isJustImg={false}
                    name={characterInfo.name}
                    profileImg={characterInfo.profile_img}
                  />
                </View>
                {select !== -1 ? (
                  <LineButton
                    onPress={() => goSelect}
                    content={I18n.t('템플릿 변경')}
                    borderColor={colors.black}
                  />
                ) : null}
              </area.RowArea>

              {select === -1 ? (
                <button.AddTemplate onPress={goSelect}>
                  <text.Button2B textColor={colors.black}>
                    {I18n.t('템플릿 선택')}
                  </text.Button2B>
                </button.AddTemplate>
              ) : (
                <View style={{ marginTop: 12 }}>{setTemplate(select)}</View>
              )}

              <input.TextTemplate
                onChangeText={(textInput: string) => setDefaultText(textInput)}
                placeholder={I18n.t('내용을 입력해 주세요')}
                value={defaultText}
                multiline
              />
              <View style={{ marginTop: 40 }} />
              <ConditionButton
                isActive
                onPress={() => goUpload}
                content={I18n.t('게시글 올리기')}
                paddingH={0}
                paddingV={14}
                height={45}
              />
            </area.ContainerBlank30>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </area.Container>
  );
}
