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

// props & logic
import { StatusBarHeight } from '../logics/StatusbarHeight';

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
            <BackButton navigation={()=>{}}/>
            <Animated.View style={[{flex:1, alignItems:'center'}, {opacity: OpacityTitle}]}>
              <text.Subtitle3 color={colors.black}>EjrqhRdl wjswod</text.Subtitle3>
            </Animated.View>
            <elses.CircleImg diameter={28} source={require('../../assets/img.jpg')}/>
          </area.RowArea>
          
          <Animated.ScrollView 
          // 여기선 홈탭처럼 paddingTop에 신경 안 써도 되는 이유는, header에서 animated 된 게 가운데 나타나는 문구만 있고 나머진 고정되어 있으니까
          // position이 absolute가 아니라 고정되어 있으니까 따로 신경쓰지 않아도 된다!
          // 그리고 marginTop을 안 쓴 이유는, 위의 RowArea 안에 고정되어 있는 BackButton, CircleImg에 RowArea의 padding이 적용되기 때문이다.
          // 홈탭의 CircleImg는 Animated.View로, RowArea로 묶어도 padding이 적용되지 않는다. 왤까...?
          // 암튼 그래서 marginTop, paddingTop에 신경 안 써도 된다.
            style={{marginHorizontal:30}}
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={1}
            onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scroll } } }],
            { useNativeDriver: true })}>
            <View style={{paddingTop: 30}}/>
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
    height: HEADER_MIN_HEIGHT+StatusBarHeight,
    borderRadius:15
  },
})