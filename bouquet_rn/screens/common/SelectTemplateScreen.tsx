import React, {useRef, useState, useEffect} from 'react';
import {
    ScrollView,
    FlatList,
    View,
    Animated,
    TouchableHighlight,
    Platform,
    StyleSheet
} from 'react-native';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import {colors} from '../../styles/colors';
import * as area from '../../styles/styled-components/area';

// props & logic
import { StatusBarHeight } from '../../logics/non-server/StatusbarHeight';
import { selectTemplate } from '../../logics/atoms';
import useCharacter from '../../logics/hooks/useCharacter';

// components
import PostingItem from '../../components/item/PostingItem';
import SelectTemplateItem from '../../components/item/SelectTemplateItem';
import BackButton from '../../components/button/BackButton';
import ProfileItem from '../../components/item/ProfileItem';

import TextTemplate from '../template/TextTemplate';
import ImageTemplate from '../template/ImageTemplate';
import AlbumTemplate from '../template/AlbumTemplate';
import DiaryTemplate from '../template/DiaryTemplate';
import ListTemplate from '../template/ListTemplate';

const HEADER_MAX_HEIGHT = 90;
const HEADER_MIN_HEIGHT = 60;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

export default function SelectTemplateScreen(){
  const select=useRecoilValue(selectTemplate);
  const setSelect=useSetRecoilState(selectTemplate);

  const [character, setCharacter] = useCharacter();

    const scroll = useRef(new Animated.Value(0)).current;
    const OpacityHeader=scroll.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE/2, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 0.5, 1], 
      extrapolate: 'clamp',
    });
    const templates=[
      {name : '선택 안 함.', explain : '텍스트만 담을 수 있는 기본적인 템플릿이에요. 텍스트로 전하고 싶은 말을 담아보세요.', svg : <TextTemplate mode='ex'/>},
      {name : '이미지', explain : '이미지를 담을 수 있는 템플릿이에요. 가장 빛났던 순간을 사진으로 남겨 두고두고 간직해보세요.', svg : <ImageTemplate mode='ex'/>},
      {name : '앨범', explain : '음악인이 되어 앨범을 발매할 수 있는 템플릿이에요. 소리는 없지만 가사와 앨범 소개까지 있는 충실한 앨범이랍니다.', svg : <AlbumTemplate mode='ex'/>},
      {name : '일기', explain : '어릴 적 적었던 그림일기를 구현할 수 있는 템플릿이에요. 직접 그리진 못해도 직접 찍은 사진과 함께 일기를 완성해보세요.', svg : <DiaryTemplate mode='ex'/>},
      {name : '리스트', explain : '항목들을 나열할 수 있는 리스트 템플릿이에요. 하나의 주제에 대해서 여러가지 이야기 하고 싶을 때 사용해보세요.', svg : <ListTemplate mode='ex'/>},
      ]

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
            <FlatList
              data={templates}
              showsVerticalScrollIndicator={false}
              renderItem={(obj)=>{
                return(
                  <SelectTemplateItem name={obj.item.name} explain={obj.item.explain} svg={obj.item.svg} 
                  select={select} setSelect={setSelect} id={obj.index}/>
                );
              }}/>
          </Animated.ScrollView>
        </area.Container>
    )
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