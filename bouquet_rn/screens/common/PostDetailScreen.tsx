import React, { useRef, useState, useMemo, useCallback } from 'react';
import {
  KeyboardAvoidingView,
  FlatList,
  View,
  Animated,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
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

/**
 * TODO 댓글 삭제
 * TODO 햇님 누르기
 * @returns
 */
export default function PostDetailScreen(): React.ReactElement {
  const user = useRecoilValue(userState);
  const [myCharacter] = useCharacter();
  const [viewPost, setViewPost] = useViewPost();

  // 내가 고른 댓글의 아이디
  const [selectId, setSelectId] = useState(-1);
  // 대댓글이 보이는 댓글의 아이디가 들어가는 배열
  const [openingCommentArray, setOpeningCommentArray] = useState<number[]>([]);
  // 내가 쓴 댓글 값 state
  const [comment, setComment] = useState('');
  // 아래 2개를 그냥 1개의 PostComment 변수로 설정하면 되지 않냐고 생각할 수 있습니다.
  // 따로 설정한 이유는, 대댓글A에 새 대댓글을 달 때 새 대댓글의 parent를 대댓글A를 담는 댓글의 아이디로 설정해야 합니다.
  // PostComment에는 parent id만 있으니, id로만 set을 해줘야 하는데 대댓글을 달 때 input 창 위에 대댓글A 내용이 뜹니다.
  // id도 필요하고, 대댓글A의 내용도 필요하니 불가피하게 따로 두게 되었습니다.
  // 내가 쓴 댓글이 어떤 것의 대댓글일 때, 어떤 것을 맡고 있습니다.
  const [parentComment, setParentComment] = useState<string>();
  // 댓글 혹은 대댓글에 댓글을 달 때, 서버에 입력할 parent id 값을 저장하는 변수
  const [parentCommentId, setParentCommentById] = useState(0);

  /**
   * 내가 쓴 댓글 업로드하는 함수
   * @param comment 내가 쓴 댓글
   */
  async function onUpload() {
    const newComment: PostCommentRequest = {
      post_id: viewPost?.id,
      character_id: myCharacter.id,
      comment,
      parent: parentCommentId,
    };
    const serverResult = await uploadCommentAsync(newComment);
    if (serverResult.isSuccess) {
      setComment('');
      setSelectId(-1);
      setParentComment(undefined);
      setParentCommentById(-1);
      // 새로고침을 위하여
      setViewPost(viewPost.id);
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

  function clickComment(commentInfo: PostComment) {
    if (selectId === commentInfo.id) {
      setSelectId(-1);
    } else {
      setSelectId(commentInfo.id);
    }
  }

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

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
          }}
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
            keyboardShouldPersistTaps="handled"
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
              keyboardShouldPersistTaps="handled"
              keyExtractor={(item, idx) => idx.toString()}
              renderItem={(obj) => (
                <View>
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => clickComment(obj.item)}
                  >
                    <CommentItem
                      commentInfo={obj.item}
                      selectId={selectId}
                      setTargetComment={setParentComment}
                      setTargetCommentId={setParentCommentById}
                      openingCommentArray={openingCommentArray}
                      setOpeningCommentArray={setOpeningCommentArray}
                    />
                  </TouchableOpacity>

                  {openingCommentArray.includes(obj.item.id) ? (
                    <FlatList
                      style={{ marginLeft: 16 }}
                      data={obj.item.children}
                      keyExtractor={(item, idx) => idx.toString()}
                      renderItem={(childObj) => (
                        <TouchableOpacity
                          activeOpacity={1}
                          onPress={() => clickComment(childObj.item)}
                        >
                          <CommentItem
                            commentInfo={childObj.item}
                            selectId={selectId}
                            setTargetComment={setParentComment}
                            setTargetCommentId={setParentCommentById}
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
            <CommentTextInput
              textValue={comment}
              onChangeText={setComment}
              onPress={() => onUpload()}
              isChild={parentComment !== undefined}
              targetComment={parentComment}
              setTargetComment={setParentComment}
              setTargetCommentId={setParentCommentById}
            />
          ) : null}
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
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
