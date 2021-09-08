import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Animated,
  ScrollView,
  TextInput,
  FlatList,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import i18n from 'i18n-js';
import styled from 'styled-components/native';

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
import { AllTemplates, Post } from '../../../utils/types/PostTypes';
import { CharacterMini } from '../../../utils/types/UserTypes';

const HEADER_MAX_HEIGHT = 95;
const HEADER_MIN_HEIGHT = 60;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

export default function SearchScreen(): React.ReactElement {
  const [recentList, setRecentList] = useState([
    '단호',
    '귀여움',
    '아이돌',
    '파란색',
    '먹방',
    '유튜버',
  ]);
  const [myCharacter] = useCharacter();

  const [isFocus, setIsFocus] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [postArray, setPostArray] = useState<Post<AllTemplates>[]>();
  const [characterArray, setCharacterArray] = useState<CharacterMini[]>([]);

  useEffect(() => {
    async function getPost() {
      let serverResult;
      if (myCharacter.id === -1) serverResult = await getTopPostListAsync(0);
      else serverResult = await getTopPostListAsync(0, myCharacter.id);
      if (serverResult.isSuccess) {
        setPostArray(serverResult.result);
      } else alert(serverResult.result.errorMsg);
    }
    getPost();
  }, []);

  useEffect(() => {
    async function getCharacter() {
      const serverResult = await getTopCharacterListAsync();
      if (serverResult.isSuccess) {
        setCharacterArray(serverResult.result);
      } else alert(serverResult.result.errorMsg);
    }
    getCharacter();
  }, []);

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
          style={[searchColor, { transform: [{ translateY: TranslateInput }] }]}
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
              onChangeText={(textInput: string) => setSearchInput(textInput)}
              value={searchInput}
            />
          </View>
        </SearchArea>
      </View>

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          style={{ marginTop: HEADER_MIN_HEIGHT - 30, flex: 1 }}
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scroll } } }],
            { useNativeDriver: false },
          )}
        >
          <View style={{ paddingTop: 30 + 12 }} />
          <Animated.View style={{ marginLeft: 30 }}>
            <Animated.View>
              <text.Subtitle3 textColor={colors.black}>
                {i18n.t('최근 검색어')}
              </text.Subtitle3>
              <FlatList
                style={{ marginTop: 12 }}
                data={recentList}
                keyExtractor={(item) => item}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={(obj) => (
                  <TagModifyingItem
                    content={obj.item}
                    setSearch={setSearchInput}
                    tagIndex={obj.index}
                    isSearching
                    tagArray={recentList}
                    setTagArray={setRecentList}
                  />
                )}
              />
            </Animated.View>

            <Animated.View style={{ marginTop: 40 }}>
              <text.Subtitle3 textColor={colors.black}>
                {i18n.t('인기 부캐')}
              </text.Subtitle3>
              <FlatList
                style={{ marginTop: 12 }}
                data={characterArray}
                keyExtractor={(index) => index.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={(obj) => <CharacterItem characterInfo={obj.item} />}
              />
            </Animated.View>
          </Animated.View>

          <area.ContainerBlank30 style={{ marginTop: 10 }}>
            <text.Subtitle3 textColor={colors.black}>
              {i18n.t('인기 게시물')}
            </text.Subtitle3>
            <FlatList
              style={{ marginTop: 12 }}
              data={postArray}
              keyExtractor={(item, idx) => idx.toString()}
              showsVerticalScrollIndicator={false}
              renderItem={(obj) => <PostItem postInfo={obj.item} />}
            />
          </area.ContainerBlank30>
        </ScrollView>
      </TouchableWithoutFeedback>
      <FloatingButton />
    </area.Container>
  );
}

const SearchArea = styled(Animated.View)`
height: 40,
    paddingVertical: 10,
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    position: 'absolute',
    // 0을 해주니까 상태바 길이만큼 위치가 내려간다!
    top: 0,
    left: 0,
    right: 0,
`;

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
