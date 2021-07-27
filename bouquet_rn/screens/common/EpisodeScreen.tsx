import React, {useRef} from 'react';
import {
    ScrollView,
    FlatList,
    View,
    Animated,
    TouchableHighlight,
    Platform,
    StyleSheet
} from 'react-native';
import {colors} from '../../styles/colors';
import * as area from '../../styles/styled-components/area';
import * as text from '../../styles/styled-components/text';
import * as elses from '../../styles/styled-components/elses';

// components
import PostingItem from '../components/PostingItem';
import BackgroundButton from '../components/BackgroundButton';
import SunButton from '../components/SunButton';
import CommentButton from '../components/CommentButton';
import EpisodeItem from '../components/EpisodeItem';
import BackButton from '../components/BackButton';

const HEADER_MAX_HEIGHT = 90;
const HEADER_MIN_HEIGHT = 60;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

export default function EpisodeScreen(){
    // dummy data - 서버에서 불러와야 함
    let threeData=[1,2,3,4,5,6,7,8,9];

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
            <View style={{flex:1}}/>
            <Animated.View style={[{opacity: OpacityTitle}]}>
              <text.Subtitle3 color={colors.black}>EjrqhRdl wjswod</text.Subtitle3>
            </Animated.View>
            <elses.CircleImg diameter={28} source={require('../../assets/img.jpg')}/>
          </area.RowArea>
          <Animated.ScrollView 
            style={{paddingTop:30, marginHorizontal:30}}
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={1}
            onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scroll } } }],
            { useNativeDriver: true })}>
            <EpisodeItem color={colors.gray0} mini={0}/>
            <View style={{marginVertical:20}}><text.Caption color={colors.gray6}>이건 설명이얌</text.Caption></View>
            <area.RowArea style={{marginBottom:20}}>
              <BackgroundButton press={()=>{}} content="추가하기" height={28} active={1} paddingH={12} paddingV={7}/>
              <View style={{marginHorizontal:12}}><SunButton sun={1500} active={0}/></View>
              <CommentButton comment={1500}/>
            </area.RowArea>

            <FlatList
                data={threeData}
                showsVerticalScrollIndicator={false}
                renderItem={(obj)=>{
                  return(<PostingItem/>);}}></FlatList>
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
    height: HEADER_MIN_HEIGHT+(Platform.OS === 'ios' ? 38 : 28),
    borderRadius:15
  },
})