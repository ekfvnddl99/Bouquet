import React, {Component, useState, useRef} from 'react';
import {
    ScrollView,
    FlatList,
    View,
    TouchableOpacity,
    StyleSheet,
    Animated,
} from 'react-native';
import i18n from 'i18n-js';
import {colors} from '../../../styles/colors';
import * as area from '../../../styles/styled-components/area';
import * as text from '../../../styles/styled-components/text';
import * as elses from '../../../styles/styled-components/elses';
import * as button from '../../../styles/styled-components/button';

import ProfileFeedScreen from './ProfileFeedScreen';
import ProfileEpisodeScreen from './ProfileEpisodeScreen';
import ProfileQnAScreen from './ProfileQnAScreen';

// props & logic
import { StatusBarHeight } from '../../logics/StatusbarHeight';
import useCharacterView from '../../logics/useCharacterView';
import { noCharacter } from '../../logics/atoms';
import useCharacter from '../../logics/useCharacter';

// components
import ProfileInfoText from '../../components/ProfileInfoText';
import ProfileDetailItem from '../../components/ProfileDetailItem';
import BackButton from '../../components/BackButton';
import ProfileItem from '../../components/ProfileItem';

const dummy={
  id: 9,
  name: "오란지",
  profileImg: "https://i.pinimg.com/736x/05/79/5a/05795a16b647118ffb6629390e995adb.jpg",
  birth: "19990601",
  job: "과일",
  nationality: "플로리다",
  intro: "상금합니다.",
  tmi: "당도가 높은 편입니다.",
  likes:["햇빛","비옥한토양","해변가"],
  hates: ["비오는곳","낮은당도","사과(라이벌)"],
  num_follows:5,
  num_followers:1201,
  user_name:"태지니"
}

const HEADER_MAX_HEIGHT = 80;
const HEADER_MIN_HEIGHT = 60;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

export default function ProfileDetailScreen({ route, navigation }: {route: any, navigation: any}){
  const [press, setPress] = useState(0);
  const [viewCharacter, setViewCharacterId] = useCharacterView();
  const [character, setCharacter] = useState(dummy)

  const scroll = useRef(new Animated.Value(0)).current;
  const OpacityHeader=scroll.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE/2, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 0.5, 1],
    extrapolate: 'clamp',
  });
  
  return(
      <area.Container>
        <Animated.View
          pointerEvents="none"
          style={[styles.header,{ opacity: OpacityHeader }]}>
        </Animated.View>

        <area.RowArea style={{paddingHorizontal:30, paddingVertical:16}}>
          <BackButton/>
          <View style={{flex:1}}/>
          <ProfileItem diameter={28} picUrl={character.profileImg} characterId={character.id}/>
        </area.RowArea>

        <Animated.ScrollView
          style={{marginHorizontal:30}}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={1}
          onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scroll } } }],
          { useNativeDriver: true })}>
          <View style={{paddingTop: 20}}/>
          <ProfileDetailItem mini={0} press={0} id={-1} character={viewCharacter.state === 'hasValue' ? character : noCharacter} />

          <View style={{marginTop:30}}>
            <area.RowArea>
              <TouchableOpacity onPress={()=>setPress(0)}>
                <text.Subtitle3 color={press===0 ? colors.black : colors.gray5}>{i18n.t('게시글')}</text.Subtitle3>
              </TouchableOpacity>
              <View style={{marginRight:16}}/>
              {/* <TouchableOpacity onPress={()=>setPress(1)}>
                <text.Subtitle3 color={press===1 ? colors.black : colors.gray5}>에피소드</text.Subtitle3>
              </TouchableOpacity>
              <View style={{marginRight:16}}/> */}
              <TouchableOpacity onPress={()=>setPress(2)}>
                <text.Subtitle3 color={press===2 ? colors.black : colors.gray5}>{i18n.t('질문')}</text.Subtitle3>
              </TouchableOpacity>
            </area.RowArea>
            {press===0 ? <ProfileFeedScreen/> : press===1 ? <ProfileEpisodeScreen/> : <ProfileQnAScreen/>}
          </View>
        </Animated.ScrollView>
      </area.Container>
  );
}

const styles=StyleSheet.create({
  header: {
    position: 'absolute',
    left: 0,
    right: 0,
    top:0,
    backgroundColor: colors.white,
    overflow: 'hidden',
    height: HEADER_MIN_HEIGHT+StatusBarHeight,
    borderRadius:15
  },
})