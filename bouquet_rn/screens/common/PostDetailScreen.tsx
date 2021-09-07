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
import { useRecoilValue, useRecoilState } from 'recoil';

// styles
import colors from '../../styles/colors';
import * as area from '../../styles/styled-components/area';
import * as text from '../../styles/styled-components/text';

// logics
import { StatusBarHeight } from '../../logics/non-server/StatusbarHeight';
import { userState, viewPostState } from '../../logics/atoms';
import { uploadCommentAsync } from '../../logics/server/Post';

// utils
import { PostComment, PostCommentRequest } from '../../utils/types/PostTypes';
import { Character } from '../../utils/types/UserTypes';

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

type PostDetailScreenProps = {
  characterInfo: Character;
};
export default function PostDetailScreen({
  characterInfo,
}: PostDetailScreenProps): React.ReactElement {
  const user = useRecoilValue(userState);
  const [selectId, setSelectId] = useState(-1);
  const [openingCommentArray, setOpeningCommentArray] = useState<number[]>([]);
  const [Comment, setComment] = useState('');
  const [parentComment, setParentComment] = useState<PostComment>();

  const [viewPost, setViewPost] = useRecoilState(viewPostState);

  async function onUpload(comment: string) {
    const newComment: PostCommentRequest = {
      post_id: viewPost?.id,
      character_id: characterInfo.id,
      comment: comment,
      parent: parentComment !== undefined ? parentComment.id : 0,
    };
    const serverResult = await uploadCommentAsync(newComment);
    if (serverResult.isSuccess) {
      // 새로고침
    } else alert(serverResult.result.errorMsg);
  }

  const getIsPostOwner = useCallback(
    () =>
      characterInfo !== undefined &&
      characterInfo?.name === viewPost?.character_info.character_name,
    [characterInfo, viewPost],
  );
  const postOwner = useMemo(() => getIsPostOwner(), [getIsPostOwner]);

  const scroll = useRef(new Animated.Value(0)).current;
  const OpacityHeader = scroll.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 0.5, 1],
    extrapolate: 'clamp',
  });

  const getSelectedComment = useCallback(() => {
    if (viewPost?.comments) {
      viewPost.comments.map((obj) => {
        if (obj.id === selectId) {
          return obj.comment;
        }
        return true;
      });
    }
    return '';
  }, [viewPost, selectId]);
  const selectedComment = useMemo(
    () => getSelectedComment(),
    [getSelectedComment],
  );

  const getTemplate = useCallback(() => {
    if (viewPost?.template) {
      switch (viewPost?.template.type) {
        case 'Image':
          return <ImageTemplate mode="detail" post={viewPost} />;
        case 'Diary':
          return <DiaryTemplate mode="detail" post={viewPost} />;
        case 'Album':
          return <AlbumTemplate mode="detail" post={viewPost} />;
        case 'List':
          return <ListTemplate mode="detail" post={viewPost} />;
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
        name={characterInfo.name}
        profileImg={characterInfo.profile_img}
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
                name={viewPost?.character_info.character_name}
                profileImg={viewPost?.character_info.character_img}
              />
            </View>
            {postOwner ? (
              <area.RowArea style={{ paddingRight: 1 }}>
                <LineButton
                  onPress={() => {}}
                  content={i18n.t('수정')}
                  borderColor={colors.black}
                />
                <View style={{ marginRight: 4 }} />
                <LineButton
                  onPress={() => {}}
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
              setSunNum={}
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
        {user !== undefined ? (
          <View style={{ justifyContent: 'flex-end' }}>
            <CommentTextInput
              characterInfo={characterInfo}
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
  height: ${HEADER_MIN_HEIGHT}+${StatusBarHeight};
  border-radius: 15;
`;
