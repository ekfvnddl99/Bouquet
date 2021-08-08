import styled from 'styled-components/native';
import React, { useRef } from 'react';
import { Animated, StyleSheet, View, TextInput, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';

import { colors } from '../../styles/colors';
import * as area from '../../styles/styled-components/area';
import * as text from '../../styles/styled-components/text';
import * as elses from '../../styles/styled-components/elses';

import { StatusBarHeight } from '../logics/StatusbarHeight';

import NameNText from '../components/NameNText';
import BackButton from '../components/BackButton';

const HEADER_MAX_HEIGHT = 90;
const HEADER_MIN_HEIGHT = 60;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const Container = styled.SafeAreaView`
  flex:1;
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

type AlbumLyricProps = {
  isEdit: boolean;
}

export default function AlbumLyric({ isEdit }: AlbumLyricProps) {
  const lyricExample =
  `서로를 닮아 기울어진 삶
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

  const scroll = useRef(new Animated.Value(0)).current;
  const OpacityHeader=scroll.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE/2, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 0, 1],
    extrapolate: 'clamp',
  });

  return (
    <Container>
      <Animated.View
        pointerEvents="none"
        style={[styles.header,{ opacity: OpacityHeader }]}>
      </Animated.View>

      <area.RowArea style={{paddingHorizontal:30, paddingVertical:16, justifyContent: 'space-between', height: 60}}>
        <BackButton/>
        <SongTitleWrap>
          <text.Body2B color={colors.white}>시간의 바깥</text.Body2B>
          <ArtistText color={colors.white}>아이유</ArtistText>
        </SongTitleWrap>
        <View style={{ width: 24, height: 24 }} />
      </area.RowArea>

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Animated.ScrollView
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scroll } } }],
            { useNativeDriver: true })}
        >
          {isEdit ?
          <LyricInput
            placeholder="가사를 입력해 보세요."
            multiline={true}
            placeholderTextColor={colors.gray5}
          />
          :
          <LyricText color={colors.white}>
            {lyricExample}
          </LyricText>
          }
        </Animated.ScrollView>
      </TouchableWithoutFeedback>
    </Container>
  )
}

const styles=StyleSheet.create({
  header: {
    position: 'absolute',
    left: 0,
    right: 0,
    top:0,
    backgroundColor: colors.gray9,
    overflow: 'hidden',
    height: HEADER_MIN_HEIGHT+StatusBarHeight,
    borderRadius:15
  },
})