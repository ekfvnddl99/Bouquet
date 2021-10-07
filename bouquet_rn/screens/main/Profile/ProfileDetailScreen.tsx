import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Animated } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';

// styles
import colors from '../../../styles/colors';
import * as area from '../../../styles/styled-components/area';

// view
import ProfileFeedView from './ProfileFeedView';
import ProfileQnAView from './ProfileQnAView';
import ProfileDetailTopView from './ProfileDetailTopView';

// logics
import { StatusBarHeight } from '../../../logics/non-server/StatusbarHeight';
import useCharacter from '../../../logics/hooks/useCharacter';
import { getPostListAsync, likePostAsync } from '../../../logics/server/Post';
import useViewCharacter from '../../../logics/hooks/useViewCharacter';
import { getQnaListAsync } from '../../../logics/server/QnAs';

// utils
import { Post, AllTemplates, Qna } from '../../../utils/types/PostTypes';

// components
import HeaderItem from '../../../components/item/HeaderItem';
import PostItem from '../../../components/item/PostItem';
import QnAItem from '../../../components/item/QnAItem';

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
  const [character] = useCharacter();
  const [viewCharacter, setViewCharacter] = useViewCharacter();

  // 해당 캐릭터의 게시글 담을 state
  const [postArray, setPostArray] = useState<Post<AllTemplates>[]>();
  const [qnaArray, setQnaArray] = useState<Array<Qna>>();

  const [routePrefix, setRoutePrefix] = useState('');

  const route = useRoute<RouteProp<ParamList, 'ProfileDetail'>>();
  useEffect(() => {
    if (route.params !== undefined) {
      const { characterName } = route.params;
      if (characterName) setViewCharacter(characterName);
      setRoutePrefix(route.params.routePrefix);
    }
  }, []);

  const [postPageNum, setPostPageNum] = useState(1);
  const [isPostPageEnd, setIsPostPageEnd] = useState(false);
  const [qnaPageNum, setQnaPageNum] = useState(1);
  const [isQnaPageEnd, setIsQnaPageEnd] = useState(false);

  async function getPosts(newPageNum?: number) {
    const serverResult = await getPostListAsync(
      newPageNum || postPageNum,
      viewCharacter.name,
    );
    if (serverResult.isSuccess) {
      if (postArray === undefined) setPostArray(serverResult.result[0]);
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
      getPosts();
      getQnas();
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
      const serverResult = await likePostAsync(postInfo.id);
      if (serverResult.isSuccess) {
        const isLiked = serverResult.result;

        const tmpArray = [...postArray];
        if (tmpArray?.[index]) {
          tmpArray[index].liked = isLiked;
          tmpArray[index].num_sunshines = isLiked
            ? tmpArray[index].num_sunshines + 1
            : tmpArray[index].num_sunshines - 1;
        }

        setPostArray(tmpArray);
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
      const serverResult = await likePostAsync(postInfo.id);
      if (serverResult.isSuccess) {
        const isLiked = serverResult.result;

        const tmpArray = [...qnaArray];
        if (tmpArray?.[index]) {
          tmpArray[index].liked = isLiked;
          tmpArray[index].num_sunshines = isLiked
            ? tmpArray[index].num_sunshines + 1
            : tmpArray[index].num_sunshines - 1;
        }

        setQnaArray(tmpArray);
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

  const tabIndexArray = [
    {
      returnView: (
        <ProfileFeedView
          postArray={postArray}
          onEndReached={async () => {
            if (!isPostPageEnd) {
              const newPageNum = postPageNum + 1;
              setPostPageNum(newPageNum);
              await getPosts(newPageNum);
            }
          }}
          renderItem={renderPost}
        />
      ),
    },
    {
      returnView: (
        <ProfileQnAView
          qnaArray={qnaArray}
          onEndReached={async () => {
            if (!isQnaPageEnd) {
              const newPageNum = qnaPageNum + 1;
              setQnaPageNum(newPageNum);
              await getQnas(newPageNum);
            }
          }}
          renderItem={renderQna}
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
        name={character.name}
        profileImg={character.profile_img}
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
