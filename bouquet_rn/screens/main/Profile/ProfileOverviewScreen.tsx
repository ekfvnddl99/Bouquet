import React, {useRef, useEffect} from 'react';
import {
    ScrollView,
    FlatList,
    View,
    Animated,
    TouchableOpacity,
    Platform,
    StyleSheet
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {colors} from '../../../styles/colors';
import * as area from '../../../styles/styled-components/area';
import * as text from '../../../styles/styled-components/text';
import * as elses from '../../../styles/styled-components/elses';

// icons
import PlusSvg from '../../../assets/Plus';
import GridSvg from '../../../assets/Grid';
import SwipeSvg from '../../../assets/Swipe';
import SettingSvg from '../../../assets/Setting';

// props & logic
import { StatusBarHeight } from '../../../logics/non-server/StatusbarHeight';
import useCharacter from '../../../logics/hooks/useCharacter';
import { characterListState, noCharacter } from '../../../logics/atoms';
import { useRecoilState } from 'recoil';
import { Character } from '../../../utils/types/types';

// components
import BgButton from '../../../components/button/BackgroundButton';
import ProfileSwipeScreen from './ProfileSwipeScreen';
import ProfileGridScreen from './ProfileGridScreen';
import { useState } from 'react';
import FloatingButton from '../../../components/button/FloatingButton';
import { ProfileProps } from '../../../utils/types/types';

const HEADER_MAX_HEIGHT = 90;
const HEADER_MIN_HEIGHT = 60;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

export default function ProfileOverviewScreen(){
  const[swipe, setSwipe]=useState(1);
  const [character, setCharacter] = useCharacter();
  const [characterList, setCharacterList] = useRecoilState(characterListState);
  const[chaList, setChaList]=useState<Character[]>(characterList);
  useEffect(()=>{
    if(chaList.length%2===1) setChaList([...chaList, noCharacter]);
  }, []);

  const navigation = useNavigation();
  useEffect(()=>{
    scroll.setValue(0);
  })
  const goChaGeneration=()=>{
    navigation.navigate('ChaGeneration');
  }
  const goSetting=()=>{
    navigation.navigate('Setting');
  }

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
          <View style={{flex:1}}><elses.CircleImg diameter={24} source={{uri: character.profileImg}}/></View>
          <TouchableOpacity style={{marginRight:16}} onPress={goChaGeneration}>
            <PlusSvg w='24' h='24'/>
          </TouchableOpacity>
          {swipe===1 ? 
          <TouchableOpacity onPress={()=>setSwipe(0)}>
            <GridSvg w='24' h='24'/>
          </TouchableOpacity> : 
          <TouchableOpacity onPress={()=>setSwipe(1)}>
            <SwipeSvg w='24' h='24'/>
          </TouchableOpacity>}
          <TouchableOpacity style={{marginLeft:16}} onPress={goSetting}>
            <SettingSvg w='24' h='24'/>
          </TouchableOpacity>
        </area.RowArea>
        
        {swipe===1 ? <ProfileSwipeScreen characterList={characterList}/> : <ProfileGridScreen scroll={scroll} characterList={characterList}/>}
        <FloatingButton/>
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