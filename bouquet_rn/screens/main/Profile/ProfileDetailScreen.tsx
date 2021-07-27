import React, {Component, useState, useRef} from 'react';
import {
    ScrollView,
    FlatList,
    View,
    TouchableOpacity,
    StyleSheet,
    Animated,
} from 'react-native';
import {colors} from '../../../styles/colors';
import * as area from '../../../styles/styled-components/area';
import * as text from '../../../styles/styled-components/text';
import * as elses from '../../../styles/styled-components/elses';
import * as button from '../../../styles/styled-components/button';

import ProfileFeedScreen from './ProfileFeedScreen';
import ProfileEpisodeScreen from './ProfileEpisodeScreen';

// props & logic
import { StatusBarHeight } from '../../logics/StatusbarHeight';

// components
import ProfileInfoText from '../../components/ProfileInfoText';
import ProfileDetailItem from '../../components/ProfileDetailItem';
import BackButton from '../../components/BackButton';

const HEADER_MAX_HEIGHT = 80;
const HEADER_MIN_HEIGHT = 60;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

export default function EpisodeScreen(){
  const [press, setPress] = useState(1);

  const scroll = useRef(new Animated.Value(0)).current;
  const OpacityTitle = scroll.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2,HEADER_SCROLL_DISTANCE],
    outputRange: [-3, 0, 1],
    extrapolate: 'clamp',
  });
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
          <BackButton navigation={()=>{}}/>
          <View style={{flex:1}}/>
          <elses.CircleImg diameter={28} source={require('../../../assets/img.jpg')}/>
        </area.RowArea>

        <Animated.ScrollView
          style={{marginHorizontal:30}}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={1}
          onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scroll } } }],
          { useNativeDriver: true })}>
          <View style={{paddingTop: 20}}/>
          <ProfileDetailItem mini={0}/>

          <View style={{marginTop:30}}>
            <area.RowArea>
              <TouchableOpacity onPress={()=>setPress(1)}>
                <text.Subtitle3 color={press===1 ? colors.black : colors.gray5}>게시글</text.Subtitle3>
              </TouchableOpacity>
              <View style={{marginRight:16}}/>
              <TouchableOpacity onPress={()=>setPress(0)}>
                <text.Subtitle3 color={press===0 ? colors.black : colors.gray5}>에피소드</text.Subtitle3>
              </TouchableOpacity>
            </area.RowArea>
            {press===1 ? <ProfileFeedScreen/> : <ProfileEpisodeScreen/>}
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