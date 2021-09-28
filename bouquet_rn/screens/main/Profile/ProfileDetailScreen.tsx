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
import { getPostListAsync } from '../../../logics/server/Post';
import useViewCharacter from '../../../logics/hooks/useViewCharacter';

// utils
import { Post, AllTemplates } from '../../../utils/types/PostTypes';

// components
import HeaderItem from '../../../components/item/HeaderItem';

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

  const route = useRoute<RouteProp<ParamList, 'ProfileDetail'>>();
  let routePrefix = '';
  useEffect(() => {
    if (route.params !== undefined) {
      const { characterName } = route.params;
      if (characterName) setViewCharacter(characterName);
      routePrefix = route.params.routePrefix;
    }
  }, []);

  const [postPageNum, setPostPageNum] = useState(1);
  const [isPostPageEnd, setIsPostPageEnd] = useState(false);
  // 해당 캐릭터의 게시글을 가져오는 api
  useEffect(() => {
    async function getPosts() {
      const serverResult = await getPostListAsync(
        postPageNum,
        viewCharacter.name,
      );
      if (serverResult.isSuccess) {
        if (postArray === undefined) setPostArray(serverResult.result);
        else if (serverResult.result.length === 0) setIsPostPageEnd(true);
        else {
          const tmpArray = postArray;
          serverResult.result.forEach((obj) => tmpArray.push(obj));
          setPostArray(tmpArray);
        }
      } else alert(serverResult.result.errorMsg);
    }
    if (viewCharacter.name !== '') getPosts();
  }, [viewCharacter, postPageNum]);

  const scroll = useRef(new Animated.Value(0)).current;
  const OpacityHeader = scroll.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 0.5, 1],
    extrapolate: 'clamp',
  });

  function setTopView(arrayLength: number) {
    return (
      <ProfileDetailTopView
        routePrefix={routePrefix}
        arrayLength={arrayLength}
        tabIndex={tabIndex}
        setTabIndex={setTabIndex}
      />
    );
  }

  const tabIndexArray = [
    {
      arrayLength: postArray ? postArray.length : 0,
      returnView: (
        <ProfileFeedView
          routePrefix={routePrefix}
          postArray={postArray}
          isPostPageEnd={isPostPageEnd}
          postPageNum={postPageNum}
          setPostPageNum={setPostPageNum}
        />
      ),
    },
    {
      arrayLength: 3,
      returnView: <ProfileQnAView routePrefix={routePrefix} />,
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
        ListHeaderComponent={setTopView(tabIndexArray[tabIndex].arrayLength)}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scroll } } }],
          { useNativeDriver: true },
        )}
        data={[1]}
        renderItem={() => tabIndexArray[tabIndex].returnView}
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
