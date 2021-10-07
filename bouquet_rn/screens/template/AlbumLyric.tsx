import styled from 'styled-components/native';
import React, { useRef, useEffect, useState, useMemo } from 'react';
import {
  Animated,
  StyleSheet,
  View,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';

import colors from '../../styles/colors';
import * as area from '../../styles/styled-components/area';
import * as text from '../../styles/styled-components/text';

import { StatusBarHeight } from '../../logics/non-server/StatusbarHeight';

import BackButton from '../../components/button/BackButton';
import { AlbumTemplate } from '../../utils/types/PostTypes';

const HEADER_MAX_HEIGHT = 90;
const HEADER_MIN_HEIGHT = 60;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.black};
  padding-top: ${StatusBarHeight};
`;

const SongTitleWrap = styled.View`
  flex-direction: column;
  align-items: center;
`;

const ArtistText = styled(text.Body2R)`
  margin-top: 4;
`;

const LyricText = styled(text.Body2R)`
  padding-left: 30;
  padding-right: 30;
  padding-top: 20;
  padding-bottom: 20;
  line-height: 28;
`;

const LyricInput = styled.TextInput`
  padding-left: 30;
  padding-right: 30;
  padding-top: 20;
  padding-bottom: 20;
  line-height: 28;
  font-weight: normal;
  font-size: 14;
  text-align-vertical: top;
  color: ${colors.white};
`;

type ParamList = {
  AlbumLyric: {
    song: { title: string; lyric: string };
    artist: string;
    setPost?: ((t: string) => void) | undefined;
  };
};

export default function AlbumLyric(): React.ReactElement {
  const lyricExample = `서로를 닮아 기울어진 삶
소원을 담아 차오르는 달
하려다 만 괄호 속의 말
이제야 음 음 음
어디도 닿지 않는 나의 닻
넌 영원히 도착할 수 없는 섬 같아
헤메던 날
이제야 음 음 음

기록하지 않아도
내가 널 전부 기억할 테니까

기다려
기어이 우리가 만나면
시간의 테두리 바깥에서
과거를 밟지 않고 선다면
숨이 차게 춤을 추겠어

낮에도 밝지 않은 나의 밖
끝없는 밤 남겨진 반
넌 어떨까 나와 같을까
알 수 없음에 아파지던 맘`;

  const [songState, setSongState] = useState({ title: '', lyric: '' });
  const [artistState, setArtistState] = useState('');
  const [setPostState, setSetPostState] = useState<
    ((t: string) => void) | undefined
  >(undefined);

  const route = useRoute<RouteProp<ParamList, 'AlbumLyric'>>();
  useEffect(() => {
    if (route.params !== undefined) {
      const { song, artist, setPost } = route.params;
      setSongState(song);
      setArtistState(artist);
      setSetPostState(setPost);
    }
  }, []);

  const scroll = useRef(new Animated.Value(0)).current;
  const OpacityHeader = scroll.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 0, 1],
    extrapolate: 'clamp',
  });

  return (
    <Container>
      <Animated.View
        pointerEvents="none"
        style={[styles.header, { opacity: OpacityHeader }]}
      />

      <area.RowArea
        style={{
          paddingHorizontal: 30,
          paddingVertical: 16,
          justifyContent: 'space-between',
          height: 60,
        }}
      >
        <BackButton />
        <SongTitleWrap>
          <text.Body2B textColor={colors.white}>{songState.title}</text.Body2B>
          <ArtistText textColor={colors.white}>{artistState}</ArtistText>
        </SongTitleWrap>
        <View style={{ width: 24, height: 24 }} />
      </area.RowArea>

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Animated.ScrollView
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scroll } } }],
            { useNativeDriver: true },
          )}
        >
          {setPostState !== undefined ? (
            <LyricInput
              placeholder="가사를 입력해 보세요."
              multiline
              placeholderTextColor={colors.gray5}
              value={songState.lyric}
              onChangeText={(t: string) => {
                setPostState(t);
                setSongState({ ...songState, lyric: t });
              }}
            />
          ) : (
            <LyricText textColor={colors.white}>
              {setPostState === undefined ? 'true' : 'false'}
            </LyricText>
          )}
        </Animated.ScrollView>
      </TouchableWithoutFeedback>
    </Container>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.gray9,
    borderRadius: 15,
    height: HEADER_MIN_HEIGHT + StatusBarHeight,
    left: 0,
    overflow: 'hidden',
    position: 'absolute',
    right: 0,
    top: 0,
  },
});
