import React, {
  useRef,
  useState,
  useMemo,
  useCallback,
  useEffect,
} from 'react';
import {
  KeyboardAvoidingView,
  FlatList,
  View,
  Animated,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import * as Analytics from 'expo-firebase-analytics';

// styles
import colors from '../../styles/colors';
import * as area from '../../styles/styled-components/area';

// logics
import { StatusBarHeight } from '../../logics/non-server/StatusbarHeight';
import {
  uploadCommentAsync,
  deletePostAsync,
  likePostAsync,
  deleteCommentAsync,
} from '../../logics/server/Post';
import useViewPost from '../../logics/hooks/useViewPost';
import useCharacter from '../../logics/hooks/useCharacter';

// utils
import { PostCommentRequest } from '../../utils/types/PostTypes';

// components
import HeaderItem from '../../components/item/HeaderItem';
import CommentItem from '../../components/item/CommentItem';
import CommentTextInput from '../../components/input/CommentTextInput';
import PostDetailTopView from './PostDetailTopView';

// templates
import ImageTemplate from '../template/ImageTemplate';
import AlbumTemplate from '../template/AlbumTemplate';
import DiaryTemplate from '../template/DiaryTemplate';
import ListTemplate from '../template/ListTemplate';

const HEADER_MAX_HEIGHT = 90;
const HEADER_MIN_HEIGHT = 60;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

type ParamList = {
  PostDetail: {
    routePrefix: string;
    postId?: number;
  };
};
/**
 * TODO 댓글 삭제
 * TODO 햇님 누르기
 * @returns
 */
export default function PostDetailScreen(): React.ReactElement {
  const [myCharacter] = useCharacter();
  const [viewPost, setViewPost] = useViewPost();
  const navigation = useNavigation();

  const route = useRoute<RouteProp<ParamList, 'PostDetail'>>();
  const [routePrefix, setRoutePrefix] = useState('');

  useEffect(() => {
    if (route.params !== undefined) {
      setRoutePrefix(route.params.routePrefix);
      let postId;
      if (route.params.postId) postId = route.params.postId;
      if (postId) setViewPost(postId);
    }
  }, []);

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

  const insets = useSafeAreaInsets();

  /**
   * 내가 쓴 댓글 업로드하는 함수
   * @param comment 내가 쓴 댓글
   */
  const [loading, setLoading] = useState(false);
  async function onUpload() {
    if (loading) return;
    setLoading(true);
    const newComment: PostCommentRequest = {
      post_id: viewPost?.id,
      character_id: myCharacter.id,
      comment,
      parent: parentCommentId,
    };
    const serverResult = await uploadCommentAsync(newComment);
    if (serverResult.isSuccess) {
      await Analytics.logEvent('write_comment', {
        is_child: parentCommentId !== 0,
      });
      setComment('');
      setParentComment(undefined);
      setParentCommentById(0);
      // 새로고침을 위하여
      await setViewPost(viewPost.id);
    } else alert(serverResult.result.errorMsg);
    setLoading(false);
  }

  const deleteComment = async (commentId: number) => {
    if (loading) return;
    setLoading(true);

    const serverResult = await deleteCommentAsync(commentId);
    if (serverResult.isSuccess) {
      await Analytics.logEvent('delete_comment');
      // 새로고침을 위하여
      await setViewPost(viewPost.id);
    } else alert(serverResult.result.errorMsg);
    setLoading(false);
  };

  async function deletePost() {
    if (loading) return;
    setLoading(true);
    navigation.goBack();
    const serverResult = await deletePostAsync(viewPost.id);
    if (serverResult.isSuccess) {
      await Analytics.logEvent('delete_post');
      alert('삭제 되었습니다.');
    } else alert(serverResult.result.errorMsg);
    setLoading(false);
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

  async function onPressSun() {
    if (loading) return;
    setLoading(true);
    const serverResult = await likePostAsync(viewPost.id);
    if (serverResult.isSuccess) {
      await Analytics.logEvent(
        serverResult.result ? 'like_post' : 'cancel_like_post',
      );
      setViewPost(viewPost.id);
    } else alert(serverResult.result.errorMsg);
    setLoading(false);
  }

  return (
    <>
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
          routePrefix={routePrefix}
        />
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={{ flex: 1 }}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Animated.ScrollView
              style={{ flexGrow: 1 }}
              contentContainerStyle={{ paddingHorizontal: 30, flexGrow: 1 }}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { y: scroll } } }],
                { useNativeDriver: true },
              )}
            >
              <FlatList
                ListHeaderComponent={
                  <PostDetailTopView
                    viewPost={viewPost}
                    routePrefix={routePrefix}
                    postOwner={postOwner}
                    template={template}
                    onDelete={() => deletePost()}
                    onPressSun={() => onPressSun()}
                  />
                }
                showsVerticalScrollIndicator={false}
                data={viewPost?.comments}
                keyboardShouldPersistTaps="always"
                keyExtractor={(item) => `${item.id}`}
                renderItem={(obj) => (
                  <View>
                    <TouchableOpacity
                      activeOpacity={1}
                      onPress={() => Keyboard.dismiss()}
                    >
                      <CommentItem
                        commentInfo={obj.item}
                        setTargetComment={setParentComment}
                        setTargetCommentId={setParentCommentById}
                        routePrefix={routePrefix}
                        deleteComment={deleteComment}
                        openingCommentArray={openingCommentArray}
                        setOpeningCommentArray={setOpeningCommentArray}
                      />
                    </TouchableOpacity>

                    {openingCommentArray.includes(obj.item.id) ? (
                      <FlatList
                        style={{ marginLeft: 16 }}
                        data={obj.item.children}
                        keyboardShouldPersistTaps="always"
                        keyExtractor={(item) => `${item.id}`}
                        renderItem={(childObj) => (
                          <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => Keyboard.dismiss()}
                          >
                            <CommentItem
                              commentInfo={childObj.item}
                              setTargetComment={setParentComment}
                              setTargetCommentId={setParentCommentById}
                              routePrefix={routePrefix}
                              deleteComment={deleteComment}
                            />
                          </TouchableOpacity>
                        )}
                      />
                    ) : null}
                  </View>
                )}
              />
            </Animated.ScrollView>
          </TouchableWithoutFeedback>
          {myCharacter.name !== '' ? (
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
      </area.Container>
      <View
        style={{
          paddingBottom: insets.bottom,
          backgroundColor: colors.white,
        }}
      />
    </>
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
