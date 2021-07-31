import React, {useRef} from 'react';
import {
    ScrollView,
    FlatList,
    View,
    Animated,
    TouchableOpacity,
    Platform,
    StyleSheet
} from 'react-native';
import {colors} from '../../../styles/colors';
import * as area from '../../../styles/styled-components/area';
import * as text from '../../../styles/styled-components/text';
import * as elses from '../../../styles/styled-components/elses';

// icons
import PlusSvg from '../../../assets/Plus';
import GridSvg from '../../../assets/Grid';
import SwipeSvg from '../../../assets/Swipe';

// props & logic
import { StatusBarHeight } from '../../logics/StatusbarHeight';

// components
import BgButton from '../../components/BackgroundButton';
import ProfileSwipeScreen from './ProfileSwipeScreen';
import ProfileGridScreen from './ProfileGridScreen';
import { useState } from 'react';

const HEADER_MAX_HEIGHT = 90;
const HEADER_MIN_HEIGHT = 60;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

export default function EpisodeScreen(){
  const[swipe, setSwipe]=useState(1);
    // dummy data - 서버에서 불러와야 함
    let threeData=[1,2,3,4,5,6,7,8,9];

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
            <View style={{flex:1}}><elses.CircleImg diameter={24} source={require('../../../assets/img.jpg')}/></View>
            <View style={{marginRight:16}}><PlusSvg w='24' h='24'/></View>
            {swipe===1 ? 
            <TouchableOpacity onPress={()=>setSwipe(0)}>
              <GridSvg w='24' h='24'/>
            </TouchableOpacity> :
            <TouchableOpacity onPress={()=>setSwipe(1)}>
              <SwipeSvg w='24' h='24'/>
            </TouchableOpacity>}
          </area.RowArea>
          
          {swipe===1 ? <ProfileSwipeScreen/> : <ProfileGridScreen scroll={scroll}/>}
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