import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
  View,
  Animated,
  TextInput,
  FlatList,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import i18n from 'i18n-js';
import styled from 'styled-components/native';
import { debounce } from 'lodash';

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
} from '../../../logics/server/Search';
import useCharacter from '../../../logics/hooks/useCharacter';

// components
import TagModifyingItem from '../../../components/item/TagModifyingItem';
import PostItem from '../../../components/item/PostItem';
import CharacterItem from '../../../components/item/CharacterItem';
import FloatingButton from '../../../components/button/FloatingButton';

// utils
import { AllTemplates, noPost, Post } from '../../../utils/types/PostTypes';
import { CharacterMini, noCharacter } from '../../../utils/types/UserTypes';

const HEADER_MAX_HEIGHT = 95;
const HEADER_MIN_HEIGHT = 60;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

export default function SearchScreen(): React.ReactElement {
  // 더미데이터
  const [recentList, setRecentList] = useState([
    '단호',
    '귀여움',
    '아이돌',
    '파란색',
    '먹방',
    '유튜버',
  ]);

  const [myCharacter] = useCharacter();

  // 검색창 눌러진 상태인지 아닌지
  const [isFocus, setIsFocus] = useState(false);
  // 검색어 값 state
  const [searchInput, setSearchInput] = useState('');
  // 인기 게시글 담을 state
  const [postArray, setPostArray] = useState<Post<AllTemplates>[]>([]);
  // 인기 캐릭터 담을 state
  const [characterArray, setCharacterArray] = useState<CharacterMini[]>([]);

  /**
   * 검색어에 따른 뷰 전환
   * @param searchText 입력된 검색어
   */
  async function getSearch(searchText: string) {
    if (searchText.length < 1) {
      await getCharacter();
      await getPost();
    } else {
      setCharacterArray([noCharacter]);
      setPostArray([noPost]);
    }
  }
  /**
   * debounce
   */
  const debounceHandler = useCallback(
    debounce((input) => getSearch(input), 500),
    [],
  );
  /**
   * 검색어가 입력될 때마다 onChangeText에 의해 실행될 함수
   * @param searchText 입력된 검색어
   */
  function setSearchResult(searchText: string) {
    setSearchInput(searchText);
    debounceHandler(searchText);
  }

  /**
   * 인기 캐릭터를 가져오는 함수
   */
  async function getCharacter() {
    const serverResult = await getTopCharacterListAsync();
    if (serverResult.isSuccess) {
      setCharacterArray(serverResult.result);
    } else alert(serverResult.result.errorMsg);
  }
  /**
   * 인기 게시글을 가져오는 함수
   */
  async function getPost() {
    const serverResult = await getTopPostListAsync(
      1,
      myCharacter.id ? myCharacter.id : undefined,
    );
    if (serverResult.isSuccess) {
      setPostArray(serverResult.result);
    } else alert(serverResult.result.errorMsg);
  }
  // 가장 처음에 인기 캐릭터 및 게시물 가져옴
  useEffect(() => {
    getCharacter();
    getPost();
  }, []);

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

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Animated.ScrollView
          style={{ marginTop: HEADER_MIN_HEIGHT - 30, flex: 1 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scroll } } }],
            { useNativeDriver: false },
          )}
        >
          <View style={{ paddingTop: 30 + 12 }} />
          <Animated.View style={{ marginLeft: 30 }}>
            {searchInput.length === 0 ? (
              <Animated.View>
                <text.Subtitle3 textColor={colors.black}>
                  {i18n.t('최근 검색어')}
                </text.Subtitle3>
                <FlatList
                  style={{ marginTop: 12 }}
                  data={recentList}
                  keyboardShouldPersistTaps="handled"
                  keyExtractor={(item, idx) => idx.toString()}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  renderItem={(obj) => (
                    <TagModifyingItem
                      content={obj.item}
                      setSearch={(input) => setSearchResult(input)}
                      tagIndex={obj.index}
                      isSearching
                      tagArray={recentList}
                      setTagArray={setRecentList}
                    />
                  )}
                />
              </Animated.View>
            ) : null}

            {characterArray.length > 0 ? (
              <Animated.View
                style={{ marginTop: searchInput.length > 0 ? 0 : 40 }}
              >
                <text.Subtitle3 textColor={colors.black}>
                  {searchInput.length > 0 ? '캐릭터' : i18n.t('인기 부캐')}
                </text.Subtitle3>
                <FlatList
                  style={{ marginTop: 12 }}
                  data={characterArray}
                  keyboardShouldPersistTaps="handled"
                  keyExtractor={(item, idx) => idx.toString()}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  renderItem={(obj) => (
                    <CharacterItem
                      characterInfo={obj.item}
                      routePrefix="SearchTab"
                    />
                  )}
                />
              </Animated.View>
            ) : null}
          </Animated.View>

          {postArray.length > 0 ? (
            <area.ContainerBlank30
              style={{ marginTop: searchInput.length > 0 ? 0 : 10 }}
            >
              <text.Subtitle3 textColor={colors.black}>
                {searchInput.length > 0 ? '게시물' : i18n.t('인기 게시물')}
              </text.Subtitle3>
              <FlatList
                style={{ marginTop: 12 }}
                data={postArray}
                keyboardShouldPersistTaps="handled"
                keyExtractor={(item, idx) => idx.toString()}
                showsVerticalScrollIndicator={false}
                renderItem={(obj) => (
                  <PostItem postInfo={obj.item} routePrefix="SearchTab" />
                )}
              />
            </area.ContainerBlank30>
          ) : null}
        </Animated.ScrollView>
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
