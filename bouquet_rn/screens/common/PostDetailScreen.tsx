import React, { useRef, useState, useMemo, useCallback } from 'react';
import {
  KeyboardAvoidingView,
  FlatList,
  View,
  Animated,
  TouchableOpacity,
} from 'react-native';
import i18n from 'i18n-js';
import styled from 'styled-components/native';
import { useRecoilValue } from 'recoil';

// styles
import colors from '../../styles/colors';
import * as area from '../../styles/styled-components/area';
import * as text from '../../styles/styled-components/text';

// logics
import { StatusBarHeight } from '../../logics/non-server/StatusbarHeight';
import { userState } from '../../logics/atoms';
import { uploadCommentAsync } from '../../logics/server/Post';
import useViewPost from '../../logics/hooks/useViewPost';
import useCharacter from '../../logics/hooks/useCharacter';

// utils
import { PostComment, PostCommentRequest } from '../../utils/types/PostTypes';

// components
import ProfileButton from '../../components/button/ProfileButton';
import HeaderItem from '../../components/item/HeaderItem';
import SunButton from '../../components/button/SunButton';
import CommentItem from '../../components/item/CommentItem';
import CommentTextInput from '../../components/input/CommentTextInput';
import LineButton from '../../components/button/LineButton';

// templates
import TextTemplate from '../template/TextTemplate';
import ImageTemplate from '../template/ImageTemplate';
import AlbumTemplate from '../template/AlbumTemplate';
import DiaryTemplate from '../template/DiaryTemplate';
import ListTemplate from '../template/ListTemplate';

const HEADER_MAX_HEIGHT = 90;
const HEADER_MIN_HEIGHT = 60;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

export default function PostDetailScreen(): React.ReactElement {
  const user = useRecoilValue(userState);
  const [myCharacter] = useCharacter();
  const [viewPost, setViewPost] = useViewPost();

  // 내가 고른 댓글의 아이디
  const [selectId, setSelectId] = useState(-1);
  // 대댓글이 보이는 댓글의 아이디가 들어가는 배열
  const [openingCommentArray, setOpeningCommentArray] = useState<number[]>([]);
  // 내가 쓴 댓글 값 state
  const [Comment, setComment] = useState('');
  // 내가 쓴 댓글이 어떤 것의 대댓글일 때, 어떤 것을 맡고 있습니다.
  const [parentComment, setParentComment] = useState<PostComment>();

  /**
   * 내가 쓴 댓글 업로드하는 함수
   * @param comment 내가 쓴 댓글
   */
  async function onUpload(comment: string) {
    const newComment: PostCommentRequest = {
      post_id: viewPost?.id,
      character_id: myCharacter.id,
      comment,
      parent: parentComment !== undefined ? parentComment.id : 0,
    };
    const serverResult = await uploadCommentAsync(newComment);
    if (serverResult.isSuccess) {
      setViewPost(serverResult.result);
      // 새로고침
    } else alert(serverResult.result.errorMsg);
  }

  // 이 게시글이 나의 게시글인지
  const postOwner = useMemo(
    () => myCharacter.name === viewPost?.character_info.name,
    [myCharacter, viewPost],
  );

  // scroll - animation 변수
  // OpacityHeader - 헤더 투명도
  const scroll = useRef(new Animated.Value(0)).current;
  const OpacityHeader = scroll.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 0.5, 1],
    extrapolate: 'clamp',
  });

  // 해당 게시글의 템플릿 내용을 얻어온다.
  const getTemplate = useCallback(() => {
    if (viewPost?.template) {
      switch (viewPost?.template.type) {
        case 'Image':
          return <ImageTemplate mode="detail" post={viewPost.template} />;
        case 'Diary':
          return <DiaryTemplate mode="detail" post={viewPost.template} />;
        case 'Album':
          return <AlbumTemplate mode="detail" post={viewPost.template} />;
        case 'List':
          return <ListTemplate mode="detail" post={viewPost.template} />;
        default:
          return null;
      }
    }
    return true;
  }, [viewPost]);
  const template = useMemo(() => getTemplate(), [getTemplate]);

  return (
    <area.Container>
      <AnimationHeader
        pointerEvents="none"
        style={[{}, { opacity: OpacityHeader }]}
      />

      <HeaderItem
        isAccount={false}
        isBackButton
        name={myCharacter.name}
        profileImg={myCharacter.profile_img}
      />

      <KeyboardAvoidingView
        style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}
        behavior="padding"
        enabled
      >
        <Animated.ScrollView
          contentContainerStyle={{
            marginHorizontal: 30,
            flexGrow: 1,
            flexDirection: 'column',
          }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="always"
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scroll } } }],
            { useNativeDriver: true },
          )}
        >
          <View style={{ paddingTop: 20 }} />

          <area.RowArea>
            <View style={{ flex: 1 }}>
              <ProfileButton
                diameter={30}
                isAccount={false}
                isJustImg={false}
                name={viewPost?.character_info.name}
                profileImg={viewPost?.character_info.profile_img}
              />
            </View>
            {postOwner ? (
              <area.RowArea style={{ paddingRight: 1 }}>
                <LineButton
                  onPress={() => {
                    /**/
                  }}
                  content={i18n.t('수정')}
                  borderColor={colors.black}
                />
                <View style={{ marginRight: 4 }} />
                <LineButton
                  onPress={() => {
                    /**/
                  }}
                  content={i18n.t('삭제')}
                  borderColor={colors.warning_red}
                />
              </area.RowArea>
            ) : null}
          </area.RowArea>
          <View style={{ marginBottom: 12 }} />
          {template}
          {viewPost?.template && viewPost.text ? (
            <TextTemplate mode="detail" post={viewPost.text} />
          ) : null}
          <View style={{ alignItems: 'flex-start' }}>
            <SunButton
              sunNum={viewPost?.num_sunshines}
              setSunNum={() => {
                /* */
              }}
              active={viewPost?.liked}
            />
          </View>
          <text.Subtitle3 textColor={colors.black} style={{ marginTop: 36 }}>
            {i18n.t('반응')}
          </text.Subtitle3>

          <View style={{ paddingTop: 12 }} />
          <FlatList
            data={viewPost?.comments}
            keyboardShouldPersistTaps="always"
            keyExtractor={(item) => item.id.toString()}
            renderItem={(obj) => (
              <View>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() =>
                    selectId === obj.item.id
                      ? setSelectId(-1)
                      : setSelectId(obj.item.id)
                  }
                >
                  <CommentItem
                    commentInfo={obj.item}
                    selectId={selectId}
                    setTargetComment={setParentComment}
                    OpeningCommentArray={openingCommentArray}
                    setOpeningCommentArray={setOpeningCommentArray}
                  />
                </TouchableOpacity>

                {openingCommentArray.includes(obj.item.id) &&
                obj.item.children ? (
                  <FlatList
                    style={{ marginLeft: 16 }}
                    data={obj.item.children}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={(childObj) => (
                      <TouchableOpacity
                        activeOpacity={1}
                        onPress={() =>
                          selectId === childObj.item.id
                            ? setSelectId(-1)
                            : setSelectId(childObj.item.id)
                        }
                      >
                        <CommentItem
                          commentInfo={childObj.item}
                          selectId={selectId}
                          setTargetComment={setParentComment}
                        />
                      </TouchableOpacity>
                    )}
                  />
                ) : null}
              </View>
            )}
          />
        </Animated.ScrollView>
        {user.name !== '' ? (
          <View style={{ justifyContent: 'flex-end' }}>
            <CommentTextInput
              textValue={Comment}
              onChangeText={() => setComment}
              onPress={() => onUpload}
              isChild={parentComment !== undefined}
            />
          </View>
        ) : null}
      </KeyboardAvoidingView>
    </area.Container>
  );
}

const AnimationHeader = styled(Animated.View)`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  background-color: ${colors.white};
  overflow: hidden;
  height: ${HEADER_MIN_HEIGHT + StatusBarHeight};
  border-radius: 15;
`;
