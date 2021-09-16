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
import { useRecoilValue, useSetRecoilState } from 'recoil';

// styles
import colors from '../../styles/colors';
import * as area from '../../styles/styled-components/area';
import * as text from '../../styles/styled-components/text';
import * as button from '../../styles/styled-components/button';
import * as input from '../../styles/styled-components/input';

// logics
import { selectTemplate } from '../../logics/atoms';
import { uploadPostAsync } from '../../logics/server/Post';
import useCharacter from '../../logics/hooks/useCharacter';
import useViewPost from '../../logics/hooks/useViewPost';

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
import { noPost } from '../../utils/types/PostTypes';

/**
 * 템플릿을 선택하고 게시글을 쓰는 화면
 * TODO template 내 setPost 함수 필요
 * @returns
 */
export default function PostWritingScreen(): React.ReactElement {
  const navigation = useNavigation<StackNavigationProp<WritingStackParam>>();
  const [myCharacter] = useCharacter();
  const [, setViewPost] = useViewPost();

  // 내가 선택한 템플릿 번호(enum 순서대로 0부터 시작)
  const select = useRecoilValue(selectTemplate);
  const setSelect = useSetRecoilState(selectTemplate);

  // 기본적으로 들어가는 text 담는 state
  const [defaultText, setDefaultText] = useState('');
  // 새 게시글 객체
  const [newPost, setNewPost] = useState({
    character_id: myCharacter.id,
    text: defaultText,
    template: noPost.template,
  });

  /**
   * 백핸들러 처리
   * * 글을 안 쓰고 그 이전 페이지로 가면 내가 고른 템플릿도 다 지워져야 한다. 그래서 setSelect(-1) 해줌.
   * @returns
   */
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

  /**
   * 템플릿 고르는 화면 이동
   */
  function goSelect() {
    navigation.navigate('SelectTemplate');
  }
  /**
   * 게시글 업로드하는 함수
   */
  async function goUpload() {
    setSelect(-1);
    const serverResult = await uploadPostAsync({
      character_id: myCharacter.id,
      template: newPost.template,
      text: defaultText,
    });
    if (serverResult.isSuccess) {
      setViewPost(serverResult.result);
      navigation.replace('PostStack');
    } else alert(serverResult.result.errorMsg);
  }

  /**
   * 인덱스에 따른 템플릿 세팅. template enum의 순서에 따라
   * @param idx 템플릿의 인덱스
   * @returns
   */
  function setTemplate(idx: number) {
    switch (idx) {
      case 1:
        return <ImageTemplate mode="edit" setPost={() => setNewPost} />;
      case 2:
        return <AlbumTemplate mode="edit" setPost={() => setNewPost} />;
      case 3:
        return <DiaryTemplate mode="edit" setPost={() => setNewPost} />;
      case 4:
        return <ListTemplate mode="edit" setPost={() => setNewPost} />;
      default:
        return null;
    }
  }

  return (
    <area.Container>
      <HeaderItem
        isAccount={false}
        isBackButton
        name={myCharacter.name}
        profileImg={myCharacter.profile_img}
      />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="height">
          <area.ContainerBlank30>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ flexGrow: 1 }}
              keyboardShouldPersistTaps="handled"
            >
              <area.RowArea>
                <View style={{ flex: 1 }}>
                  <ProfileButton
                    diameter={30}
                    isAccount={false}
                    isJustImg={false}
                    name={myCharacter.name}
                    profileImg={myCharacter.profile_img}
                  />
                </View>
                {select !== -1 ? (
                  <LineButton
                    onPress={() => goSelect()}
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
                onPress={() => goUpload()}
                content={I18n.t('게시글 올리기')}
                paddingH={0}
                paddingV={14}
                height={45}
              />
              <View style={{ marginTop: 40 }} />
            </ScrollView>
          </area.ContainerBlank30>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </area.Container>
  );
}
