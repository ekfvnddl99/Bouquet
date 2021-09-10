import React, { useState, useRef } from 'react';
import { View, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import i18n from 'i18n-js';
import colors from '../../../styles/colors';
import * as area from '../../../styles/styled-components/area';
import * as text from '../../../styles/styled-components/text';

import ProfileFeedScreen from './ProfileFeedView';
import ProfileQnAScreen from './ProfileQnAView';

// props & logic
import { StatusBarHeight } from '../../../logics/non-server/StatusbarHeight';
import useCharacter from '../../../logics/hooks/useCharacter';

// components
import ProfileDetailItem from '../../../components/item/ProfileDetailItem';
import HeaderItem from '../../../components/item/HeaderItem';

const HEADER_MAX_HEIGHT = 80;
const HEADER_MIN_HEIGHT = 60;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

export default function ProfileDetailScreen(): React.ReactElement {
  const [press, setPress] = useState(0);
  const [character] = useCharacter();

  const scroll = useRef(new Animated.Value(0)).current;
  const OpacityHeader = scroll.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 0.5, 1],
    extrapolate: 'clamp',
  });

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
      />

      <Animated.ScrollView
        style={{ marginHorizontal: 30 }}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={1}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scroll } } }],
          { useNativeDriver: true },
        )}
      >
        <View style={{ paddingTop: 20 }} />
        <ProfileDetailItem isMini={false} />

        <View style={{ marginTop: 30 }}>
          <area.RowArea>
            <TouchableOpacity onPress={() => setPress(0)}>
              <text.Subtitle3
                textColor={press === 0 ? colors.black : colors.gray5}
              >
                {i18n.t('게시글')}
              </text.Subtitle3>
            </TouchableOpacity>
            <View style={{ marginRight: 16 }} />
            <TouchableOpacity onPress={() => setPress(2)}>
              <text.Subtitle3
                textColor={press === 2 ? colors.black : colors.gray5}
              >
                {i18n.t('질문')}
              </text.Subtitle3>
            </TouchableOpacity>
          </area.RowArea>
          {press === 0 ? <ProfileFeedScreen /> : <ProfileQnAScreen />}
        </View>
      </Animated.ScrollView>
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
