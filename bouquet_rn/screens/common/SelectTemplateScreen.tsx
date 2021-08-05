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
import { useSetRecoilState } from 'recoil';
import {colors} from '../../styles/colors';
import * as area from '../../styles/styled-components/area';

// props & logic
import { StatusBarHeight } from '../logics/StatusbarHeight';
import { selectTemplate } from '../logics/atoms';

// components
import PostingItem from '../components/PostingItem';
import SelectTemplateItem from '../components/SelectTemplateItem';
import BackButton from '../components/BackButton';
import ProfileItem from '../components/ProfileItem';

import AlbumTemplate from '../template/AlbumTemplate';
import DiaryTemplate from '../template/DiaryTemplate';
import ListTemplate from '../template/ListTemplate';

const HEADER_MAX_HEIGHT = 90;
const HEADER_MIN_HEIGHT = 60;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

export default function SelectTemplateScreen(){
  const[press, setPress]=useState<number>(-1);
  const setTemplate=useSetRecoilState(selectTemplate);

  useEffect(()=>{
    setTemplate(press);
  }, [press])

    const scroll = useRef(new Animated.Value(0)).current;
    const OpacityHeader=scroll.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE/2, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 0.5, 1], 
      extrapolate: 'clamp',
    });
    const templates=[
      {name : '선택 안 함.', explain : '텍스트로 승부한다.', svg : <View/>},
      {name : '앨범', explain : '이건 앨범', svg : <AlbumTemplate mode='detail'/>},
      {name : '일기', explain : '이건 일기', svg : <DiaryTemplate mode='detail'/>},
      {name : '리스트', explain : '이건 리스트', svg : <ListTemplate mode='detail'/>},
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
            <ProfileItem diameter={28}/>
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
                  press={press} setPress={setPress} id={obj.index}/>
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