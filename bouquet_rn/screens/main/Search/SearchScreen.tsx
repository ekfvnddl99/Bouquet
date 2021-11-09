import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
  View,
  Animated,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  Alert,
} from 'react-native';
import i18n from 'i18n-js';
import styled from 'styled-components/native';
import { debounce } from 'lodash';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Analytics from 'expo-firebase-analytics';

// styles
import colors from '../../../styles/colors';
import * as area from '../../../styles/styled-components/area';
import * as text from '../../../styles/styled-components/text';

// assets
import Svg from '../../../assets/Icon';

// logics
import { StatusBarHeight } from '../../../logics/non-server/StatusbarHeight';
import {
  getTopCharacterListAsync,
  getTopPostListAsync,
  searchPostAsync,
  searchCharacterAsync,
} from '../../../logics/server/Search';
import useCharacter from '../../../logics/hooks/useCharacter';
import { likePostAsync } from '../../../logics/server/Post';

// components
import FloatingButton from '../../../components/button/FloatingButton';
import PostItem from '../../../components/item/PostItem';
import ConditionButton from '../../../components/button/ConditionButton';

// utils
import { AllTemplates, Post } from '../../../utils/types/PostTypes';
import { CharacterMini } from '../../../utils/types/UserTypes';

// view
import SearchRecentView from './SearchRecentView';
import SearchCharacterView from './SearchCharacterView';
import SearchPostView from './SearchPostView';

const HEADER_MAX_HEIGHT = 95;
const HEADER_MIN_HEIGHT = 60;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

export default function SearchScreen(): React.ReactElement {
  // 더미데이터
  const [recentList, setRecentList] = useState<string[]>([]);

  const [myCharacter] = useCharacter();

  // 검색창 눌러진 상태인지 아닌지
  const [isFocus, setIsFocus] = useState(false);
  // 검색어 값 state
  const [searchInput, setSearchInput] = useState('');
  // 인기 게시글 담을 state
  const [postArray, setPostArray] = useState<Post<AllTemplates>[]>([]);
  // 인기 캐릭터 담을 state
  const [characterArray, setCharacterArray] = useState<CharacterMini[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [pageNum, setPageNum] = useState(1);
  const [isPageEnd, setIsPageEnd] = useState(false);
  const [chPageNum, setChPageNum] = useState(1);
  const [isChPageEnd, setIsChPageEnd] = useState(false);

  useEffect(() => {
    const getRecentList = async () => {
      const jsonValue = await AsyncStorage.getItem('recentList');
      const result = jsonValue !== null ? JSON.parse(jsonValue) : [];
      setRecentList(result);
    };
    getRecentList();
  }, []);

  /**
   * 검색어에 따른 뷰 전환
   * @param searchText 입력된 검색어
   */
  async function getSearch(searchText: string) {
    if (searchText.length < 1) {
      await onRefresh();
    } else {
      setPageNum(1);
      setChPageNum(1);
      setIsPageEnd(false);
      setIsChPageEnd(false);
      await getCharacter(1, true, searchText);
      await getPost(1, true, searchText);
      await Analytics.logEvent('search', {
        search_text: searchText,
      });
    }
  }

  /**
   * async storage
   */
  const storeRecentList = async (value: string[]) => {
    let tmpArray = value;
    if (tmpArray.length > 10) tmpArray = tmpArray.slice(0, 10);
    setRecentList(tmpArray);
    const jsonValue = JSON.stringify(tmpArray);
    await AsyncStorage.setItem('recentList', jsonValue);
  };
  const getRecentList = async () => {
    const jsonValue = await AsyncStorage.getItem('recentList');
    const result = jsonValue !== null ? JSON.parse(jsonValue) : [];
    setRecentList(result);
    return result;
  };
  /**
   * debounce
   */
  const debounceHandler = useCallback(
    debounce((input) => getSearch(input), 500),
    [],
  );
  const debounceRecentSearchHandler = useCallback(
    debounce(async (input) => {
      if (input.length !== 0) {
        let tmpArray = await getRecentList();
        tmpArray.unshift(input);
        tmpArray = [...new Set(tmpArray)];
        storeRecentList(tmpArray);
      }
    }, 2000),
    [],
  );
  /**
   * 검색어가 입력될 때마다 onChangeText에 의해 실행될 함수
   * @param searchText 입력된 검색어
   */
  const setSearchResult = (searchText: string) => {
    setSearchInput(searchText);
    debounceHandler(searchText);
    debounceRecentSearchHandler(searchText);
  };

  /**
   * 인기 캐릭터를 가져오는 함수
   */
  async function getCharacter(
    newPageNum?: number,
    isRefreshing?: boolean,
    searchText?: string,
  ) {
    let serverResult;
    if (searchText) {
      serverResult = await searchCharacterAsync(
        searchText,
        newPageNum || chPageNum,
      );
    } else serverResult = await getTopCharacterListAsync();

    if (serverResult.isSuccess) {
      if (serverResult.result.length === 0) {
        setIsChPageEnd(true);
        if (characterArray === undefined || isRefreshing)
          setCharacterArray(serverResult.result);
      } else if (characterArray === undefined || isRefreshing)
        setCharacterArray(serverResult.result);
      else {
        const tmpArray = [...characterArray];
        serverResult.result.forEach((obj) => tmpArray.push(obj));
        setCharacterArray(tmpArray);
      }
    } else {
      alert(serverResult.result.errorMsg);
    }
  }
  /**
   * 인기 게시글을 가져오는 함수
   */
  async function getPost(
    newPageNum?: number,
    isRefreshing?: boolean,
    searchText?: string,
  ) {
    let serverResult;
    if (searchText) {
      serverResult = await searchPostAsync(searchText, newPageNum || pageNum);
    } else serverResult = await getTopPostListAsync(newPageNum || pageNum);

    if (serverResult.isSuccess) {
      if (serverResult.result.length === 0) {
        setIsPageEnd(true);
        if (postArray === undefined || isRefreshing)
          setPostArray(serverResult.result);
      } else if (postArray === undefined || isRefreshing)
        setPostArray(serverResult.result);
      else {
        const tmpArray = [...postArray];
        serverResult.result.forEach((obj) => tmpArray.push(obj));
        setPostArray(tmpArray);
      }
    } else {
      alert(serverResult.result.errorMsg);
    }
  }
  // 가장 처음에 인기 캐릭터 및 게시물 가져옴
  useEffect(() => {
    async function init() {
      await getPost();
      await getCharacter();
    }
    init();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    setIsPageEnd(false);
    setIsChPageEnd(false);
    setPageNum(1);
    if (searchInput !== '') setChPageNum(1);
    await getCharacter(1, true, searchInput !== '' ? searchInput : undefined);
    await getPost(1, true, searchInput !== '' ? searchInput : undefined);
    setRefreshing(false);
  };

  /**
   * animation 관련 변수
   * scroll - animation 변수
   * OpacityHeader - 헤더 투명도가 달라진다.
   * TranslateInput - 검색창 이동 정도
   * ColorInput - 검색창 색 변화
   * searchColor - ColorInput을 담는 변수
   */
  const scroll = useRef(new Animated.Value(0)).current;
  const OpacityHeader = scroll.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 0.5, 1],
    extrapolate: 'clamp',
  });
  const TranslateInput = scroll.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -18],
    extrapolate: 'clamp',
  });
  const ColorInput = scroll.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [colors.white, colors.gray0],
    extrapolate: 'clamp',
  });
  const searchColor = {
    backgroundColor: ColorInput,
  };

  const renderItem = ({
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
        routePrefix="SearchTab"
        onPressSun={onPressItem}
      />
    );
  };

  async function viewMorePost() {
    if (!isPageEnd) {
      const newPageNum = pageNum + 1;
      setPageNum(newPageNum);
      await getPost(
        newPageNum,
        undefined,
        searchInput === '' ? undefined : searchInput,
      );
    }
  }

  const viewArray = [
    <SearchRecentView
      searchInput={searchInput}
      setSearchResult={setSearchResult}
      recentList={recentList}
      setRecentList={storeRecentList}
    />,
    <SearchCharacterView
      searchInput={searchInput}
      characterArray={characterArray}
      onEndReached={async () => {
        if (!isChPageEnd && searchInput !== '') {
          const newPageNum = chPageNum + 1;
          setChPageNum(newPageNum);
          await getCharacter(
            newPageNum,
            undefined,
            searchInput !== '' ? searchInput : undefined,
          );
        }
      }}
    />,
    <SearchPostView
      searchInput={searchInput}
      postArray={postArray}
      renderItem={renderItem}
      ListFooterComponent={
        isPageEnd ? (
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
    />,
  ];

  return (
    <area.Container>
      <AnimationHeader
        pointerEvents="none"
        style={[{}, { opacity: OpacityHeader }]}
      />

      <View style={{ marginTop: 30, marginHorizontal: 30 }}>
        <SearchArea
          style={[
            {},
            searchColor,
            { transform: [{ translateY: TranslateInput }] },
          ]}
        >
          <View style={{ marginLeft: 18, marginRight: 10 }}>
            {isFocus || searchInput.length > 0 ? (
              <Svg icon="searchViewFocus" size={15} />
            ) : (
              <Svg icon="searchView" size={15} />
            )}
          </View>
          <View style={{ flex: 1 }}>
            <TextInput
              placeholder={i18n.t('무엇이 궁금한가요')}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChangeText={(textInput: string) => setSearchResult(textInput)}
              value={searchInput}
            />
          </View>
        </SearchArea>
      </View>

      <View style={{ marginTop: HEADER_MIN_HEIGHT - 30 }} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Animated.FlatList
          style={{
            paddingBottom: HEADER_MIN_HEIGHT - 30,
          }}
          contentContainerStyle={{ paddingTop: 30 + 12 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scroll } } }],
            { useNativeDriver: false },
          )}
          data={viewArray}
          keyExtractor={(item, index) => index.toString()}
          renderItem={(obj) => obj.item}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      </TouchableWithoutFeedback>

      {myCharacter.id === -1 ? null : (
        <FloatingButton routePrefix="SearchTab" />
      )}
    </area.Container>
  );
}

// 0을 해주니까 상태바 길이만큼 위치가 내려간다!
const SearchArea = styled(Animated.View)`
  height: 40;
  padding-vertical: 10;
  background-color: ${colors.white};
  flex-direction: row;
  align-items: center;
  border-radius: 10;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
`;

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
