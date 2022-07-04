import React, { useState, useRef, useEffect, useCallback } from 'react';
import { StyleSheet, Animated, Alert, View } from 'react-native';
import { useRoute, RouteProp, useFocusEffect } from '@react-navigation/native';
import * as Analytics from 'expo-firebase-analytics';

// styles
import colors from '../../../styles/colors';
import * as area from '../../../styles/styled-components/area';
import * as text from '../../../styles/styled-components/text';

// view
import ProfileFeedView from './ProfileFeedView';
import ProfileQnAView from './ProfileQnAView';
import ProfileDetailTopView from './ProfileDetailTopView';

// logics
import { StatusBarHeight } from '../../../logics/non-server/StatusbarHeight';
import useCharacter from '../../../logics/hooks/useCharacter';
import { getPostListAsync, likePostAsync } from '../../../logics/server/Post';
import useViewCharacter from '../../../logics/hooks/useViewCharacter';
import { getQnaListAsync, likeQnaAsync } from '../../../logics/server/QnAs';

// utils
import { Post, AllTemplates, Qna } from '../../../utils/types/PostTypes';

// components
import HeaderItem from '../../../components/item/HeaderItem';
import PostItem from '../../../components/item/PostItem';
import QnAItem from '../../../components/item/QnAItem';
import ConditionButton from '../../../components/button/ConditionButton';

const HEADER_MAX_HEIGHT = 80;
const HEADER_MIN_HEIGHT = 60;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

type ParamList = {
  ProfileDetail: {
    routePrefix: string;
    characterName?: string;
  };
};
export default function ProfileDetailScreen(): React.ReactElement {
  // 상세 프로필마다 있는 하단의 탭 인덱스
  const [tabIndex, setTabIndex] = useState(0);
  const [myCharacter] = useCharacter();
  const [viewCharacter, setViewCharacter] = useViewCharacter();

  // 해당 캐릭터의 게시글 담을 state
  const [postArray, setPostArray] = useState<Post<AllTemplates>[]>();
  const [qnaArray, setQnaArray] = useState<Array<Qna>>();

  const [routePrefix, setRoutePrefix] = useState('');

  const route = useRoute<RouteProp<ParamList, 'ProfileDetail'>>();

  useFocusEffect(
    useCallback(() => {
      let characterName;
      if (route.params !== undefined) {
        characterName = route.params.characterName;
        if (characterName) setViewCharacter(characterName);
        setRoutePrefix(route.params.routePrefix);
      }
    }, []),
  );

  const [postPageNum, setPostPageNum] = useState(1);
  const [isPostPageEnd, setIsPostPageEnd] = useState(false);
  const [qnaPageNum, setQnaPageNum] = useState(1);
  const [isQnaPageEnd, setIsQnaPageEnd] = useState(false);

  async function getPosts(newPageNum?: number, isRefreshing?: boolean) {
    const serverResult = await getPostListAsync(
      newPageNum || postPageNum,
      viewCharacter.name,
    );
    if (serverResult.isSuccess) {
      if (postArray === undefined || isRefreshing)
        setPostArray(serverResult.result[0]);
      else if (serverResult.result[0].length === 0) setIsPostPageEnd(true);
      else {
        const tmpArray = postArray;
        serverResult.result[0].forEach((obj) => tmpArray.push(obj));
        setPostArray(tmpArray);
      }
    } else alert(serverResult.result.errorMsg);
  }

  async function getQnas(newPageNum?: number, isRefreshing?: boolean) {
    const serverResult = await getQnaListAsync(
      viewCharacter.name,
      newPageNum || qnaPageNum,
    );
    if (serverResult.isSuccess) {
      if (qnaArray === undefined || isRefreshing)
        setQnaArray(serverResult.result);
      else if (serverResult.result.length === 0) setIsQnaPageEnd(true);
      else {
        const tmpArray = qnaArray;
        serverResult.result.forEach((obj) => tmpArray.push(obj));
        setQnaArray(tmpArray);
      }
    } else alert(serverResult.result.errorMsg);
  }

  // 해당 캐릭터의 게시글을 가져오는 api
  useEffect(() => {
    if (viewCharacter.name !== '') {
      getPosts(1, true);
      getQnas(1, true);
    }
  }, [viewCharacter]);

  const scroll = useRef(new Animated.Value(0)).current;
  const OpacityHeader = scroll.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 0.5, 1],
    extrapolate: 'clamp',
  });

  function setTopView() {
    return (
      <ProfileDetailTopView
        routePrefix={routePrefix}
        tabIndex={tabIndex}
        setTabIndex={setTabIndex}
      />
    );
  }

  const renderPost = ({
    item,
    index,
  }: {
    item: Post<AllTemplates>;
    index: number;
  }) => {
    const onPressItem = async (postInfo: Post<AllTemplates>) => {
      if (myCharacter.name === '') {
        alert('부캐가 없으면 햇님을 줄 수 없어요. 부캐를 만들어주세요!');
        return;
      }
      const serverResult = await likePostAsync(postInfo.id);
      if (serverResult.isSuccess) {
        const isLiked = serverResult.result;
        await Analytics.logEvent(isLiked ? 'like_post' : 'cancel_like_post');

        if (postArray !== undefined) {
          const tmpArray = [...postArray];
          if (tmpArray?.[index]) {
            tmpArray[index].liked = isLiked;
            tmpArray[index].num_sunshines = isLiked
              ? tmpArray[index].num_sunshines + 1
              : tmpArray[index].num_sunshines - 1;
          }

          setPostArray(tmpArray);
        }
      }
    };

    return (
      <PostItem
        postInfo={item}
        routePrefix={routePrefix}
        onPressSun={onPressItem}
      />
    );
  };

  const renderQna = ({ item, index }: { item: Qna; index: number }) => {
    const onPressItem = async (postInfo: Qna) => {
      const serverResult = await likeQnaAsync(postInfo.id);
      if (serverResult.isSuccess) {
        const isLiked = serverResult.result;
        await Analytics.logEvent(isLiked ? 'like_qna' : 'cancel_like_qna');

        if (qnaArray !== undefined) {
          const tmpArray = [...qnaArray];
          if (tmpArray?.[index]) {
            tmpArray[index].liked = isLiked;
            tmpArray[index].num_sunshines = isLiked
              ? tmpArray[index].num_sunshines + 1
              : tmpArray[index].num_sunshines - 1;
          }

          setQnaArray(tmpArray);
        }
      }
    };

    return (
      <QnAItem
        qna={item}
        characterInfo={viewCharacter}
        routePrefix={routePrefix}
        onPressSun={onPressItem}
        refresh={async () => {
          setQnaPageNum(1);
          await getQnas(1, true);
        }}
      />
    );
  };

  async function viewMorePost() {
    if (!isPostPageEnd) {
      const newPageNum = postPageNum + 1;
      setPostPageNum(newPageNum);
      await getPosts(newPageNum);
    }
  }
  async function viewMoreQna() {
    if (!isQnaPageEnd) {
      const newPageNum = qnaPageNum + 1;
      setQnaPageNum(newPageNum);
      await getQnas(newPageNum);
    }
  }

  const tabIndexArray = [
    {
      returnView: (
        <ProfileFeedView
          postArray={postArray}
          renderItem={renderPost}
          listFooterComponent={
            isPostPageEnd ? (
              <View style={{ flex: 1, marginBottom: 20, alignItems: 'center' }}>
                <text.Caption textColor={colors.gray6}>
                  여기가 끝이에요!
                </text.Caption>
              </View>
            ) : (
              <View style={{ marginBottom: 20 }}>
                <ConditionButton
                  onPress={() => viewMorePost()}
                  content="더보기"
                  isActive
                  paddingH={0}
                  paddingV={0}
                  height={32}
                />
              </View>
            )
          }
        />
      ),
    },
    {
      returnView: (
        <ProfileQnAView
          qnaArray={qnaArray}
          renderItem={renderQna}
          listFooterComponent={
            isQnaPageEnd ? (
              <View style={{ flex: 1, marginBottom: 20, alignItems: 'center' }}>
                <text.Caption textColor={colors.gray6}>
                  여기가 끝이에요!
                </text.Caption>
              </View>
            ) : (
              <View style={{ marginBottom: 20 }}>
                <ConditionButton
                  onPress={() => viewMoreQna()}
                  content="더보기"
                  isActive
                  paddingH={0}
                  paddingV={0}
                  height={32}
                />
              </View>
            )
          }
        />
      ),
    },
  ];

  return (
    <area.Container>
      <Animated.View
        pointerEvents="none"
        style={[styles.header, { opacity: OpacityHeader }]}
      />

      <HeaderItem
        isAccount={false}
        isBackButton
        name={myCharacter.name}
        profileImg={myCharacter.profile_img}
        routePrefix={routePrefix}
      />
      <Animated.FlatList
        style={{ marginHorizontal: 30 }}
        ListHeaderComponent={setTopView()}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scroll } } }],
          { useNativeDriver: true },
        )}
        data={tabIndexArray}
        renderItem={(obj) =>
          obj.index === tabIndex ? obj.item.returnView : null
        }
      />
    </area.Container>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.white,
    borderRadius: 15,
    height: HEADER_MIN_HEIGHT + StatusBarHeight,
    left: 0,
    overflow: 'hidden',
    position: 'absolute',
    right: 0,
    top: 0,
  },
});
