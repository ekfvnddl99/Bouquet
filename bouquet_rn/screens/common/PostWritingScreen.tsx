import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  View,
  BackHandler,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from 'react-native';
import I18n from 'i18n-js';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { useRecoilValue, useSetRecoilState } from 'recoil';

// styles
import colors from '../../styles/colors';
import * as area from '../../styles/styled-components/area';
import * as text from '../../styles/styled-components/text';
import * as button from '../../styles/styled-components/button';

// logics
import { selectTemplate } from '../../logics/atoms';
import { uploadPostAsync } from '../../logics/server/Post';
import useCharacter from '../../logics/hooks/useCharacter';
import useViewPost from '../../logics/hooks/useViewPost';
import uploadImageAsync from '../../logics/server/UploadImage';

// components
import ConditionButton from '../../components/button/ConditionButton';
import ProfileButton from '../../components/button/ProfileButton';
import HeaderItem from '../../components/item/HeaderItem';
import LineButton from '../../components/button/LineButton';

// templates
import TextTemplate from '../template/TextTemplate';
import ImageTemplate from '../template/ImageTemplate';
import AlbumTemplate from '../template/AlbumTemplate';
import DiaryTemplate from '../template/DiaryTemplate';
import ListTemplate from '../template/ListTemplate';

// utils
import * as Post from '../../utils/types/PostTypes';

type ParamList = {
  PostWriting: {
    routePrefix: string;
  };
};
/**
 * 템플릿을 선택하고 게시글을 쓰는 화면
 * @returns
 */
export default function PostWritingScreen(): React.ReactElement {
  const navigation = useNavigation();
  const [myCharacter] = useCharacter();
  const [, setViewPost] = useViewPost();

  const route = useRoute<RouteProp<ParamList, 'PostWriting'>>();
  const [routePrefix, setRoutePrefix] = useState('');
  useEffect(() => {
    if (route !== undefined) {
      setRoutePrefix(route.params.routePrefix);
    }
    setSelect(-1);
  }, []);

  // 내가 선택한 템플릿 번호(enum 순서대로 0부터 시작)
  const select = useRecoilValue(selectTemplate);
  const setSelect = useSetRecoilState(selectTemplate);

  // 새 게시글 객체
  const [newPost, setNewPost] = useState<Post.PostRequest<Post.AllTemplates>>({
    character_id: myCharacter.id,
    text: '',
    template: Post.noTemplate<Post.PlainTemplate>('None'),
  });

  // 각 템플릿에 필요한 이미지 정보
  // setImage는 각 템플릿으로부터 전달받는 함수
  // 각 템플릿으로부터 전달받은 이미지들(images)을 서버에 업로드한 뒤 그 주소를 이 함수에 넣어서 실행하면 됨
  const [[images, setImage], setImageInfo] = useState<
    [Array<string>, ((images: Array<string>) => Post.AllTemplates) | undefined]
  >([[], undefined]);

  /**
   * 템플릿이 있는 경우 템플릿 설정
   * @param template 새로 설정할 템플릿 객체
   */
  const setTemplate = (template: Post.AllTemplates) => {
    setNewPost({ ...newPost, template });
  };

  /**
   * 텍스트 템플릿의 텍스트 설정
   * @param newText 새로 설정할 텍스트
   */
  const setText = (newText: string) => {
    setNewPost({ ...newPost, text: newText });
  };

  /**
   * 백핸들러 처리
   * * 글을 안 쓰고 그 이전 페이지로 가면 내가 고른 템플릿도 다 지워져야 한다. 그래서 setSelect(-1) 해줌.
   * @returns
   */
  function backAction() {
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
    navigation.navigate('SelectTemplate', { newPost, setNewPost });
  }

  /**
   * 게시글 업로드하는 함수
   */
  async function goUpload() {
    setSelect(5);

    const realImages = await Promise.all(
      images.map(async (img) => {
        const imgResult = await uploadImageAsync(img);
        if (imgResult.isSuccess) {
          return imgResult.result;
        }
        // TODO: 빈 문자열 대신 기본 이미지 쓰기
        return '';
      }),
    );

    const realNewPost = newPost;
    if (setImage) realNewPost.template = setImage(realImages);

    const serverResult = await uploadPostAsync(realNewPost);
    if (serverResult.isSuccess) {
      setViewPost(serverResult.result);
      setSelect(-1);
      navigation.reset({ index: 0, routes: [{ name: 'PostStack' }] });
    } else {
      alert(serverResult.result.errorMsg);
      setSelect(-1);
    }
  }

  /**
   * 인덱스에 따른 템플릿 세팅. template enum의 순서에 따라
   * @param idx 템플릿의 인덱스
   * @returns
   */
  function getTemplate(idx: number) {
    switch (idx) {
      case 1:
        return (
          <ImageTemplate
            mode="edit"
            post={
              newPost.template.type === 'Image'
                ? newPost.template
                : Post.noTemplate<Post.ImageTemplate>('Image')
            }
            setPost={setTemplate}
            setImageInfo={setImageInfo}
          />
        );
      case 2:
        return (
          <AlbumTemplate
            mode="edit"
            post={
              newPost.template.type === 'Album'
                ? newPost.template
                : Post.noTemplate<Post.AlbumTemplate>('Album')
            }
            setPost={setTemplate}
            setImageInfo={setImageInfo}
          />
        );
      case 3:
        return (
          <DiaryTemplate
            mode="edit"
            post={
              newPost.template.type === 'Diary'
                ? newPost.template
                : Post.noTemplate<Post.DiaryTemplate>('Diary')
            }
            setPost={setTemplate}
            setImageInfo={setImageInfo}
          />
        );
      case 4:
        return (
          <ListTemplate
            mode="edit"
            post={
              newPost.template.type === 'List'
                ? newPost.template
                : Post.noTemplate<Post.ListTemplate>('List')
            }
            setPost={setTemplate}
            setImageInfo={setImageInfo}
          />
        );
      case 5:
        // 게시글 업로드중 fallback
        return (
          <TextTemplate mode="detail" post="게시글을 업로드하고 있어요..." />
        );
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
        routePrefix={routePrefix}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={{
              paddingHorizontal: 30,
              paddingTop: 30,
              flexGrow: 1,
            }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <area.RowArea>
              <View style={{ flex: 1 }}>
                <ProfileButton
                  diameter={30}
                  isAccount={false}
                  isJustImg={false}
                  isPress={false}
                  name={myCharacter.name}
                  profileImg={myCharacter.profile_img}
                  routePrefix={routePrefix}
                />
              </View>
              {select !== -1 && select !== 5 ? (
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
              <View style={{ marginTop: 12 }}>{getTemplate(select)}</View>
            )}

            {select !== 5 ? (
              <TextTemplate mode="edit" post={newPost.text} setPost={setText} />
            ) : null}
            <View style={{ marginTop: 40 }} />
            {select !== 5 ? (
              <ConditionButton
                isActive
                onPress={() => goUpload()}
                content={I18n.t('게시글 올리기')}
                paddingH={0}
                paddingV={14}
                height={45}
              />
            ) : null}
            <View style={{ marginTop: 40 }} />
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </area.Container>
  );
}
