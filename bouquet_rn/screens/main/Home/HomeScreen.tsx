import React, {useRef, useState} from 'react';
import {
    View,
    FlatList,
    Animated,
    Platform,
    StyleSheet,
    StatusBar
} from 'react-native';
import Constants from 'expo-constants';
import {colors} from '../../../styles/colors';
import * as area from '../../../styles/styled-components/area';
import * as text from '../../../styles/styled-components/text';
import * as elses from '../../../styles/styled-components/elses';

// props & logic
import { StatusBarHeight } from '../../logics/StatusbarHeight';

// components
import PostingItem from '../../components/PostingItem';
import NameNText from '../../components/NameNText';

const HEADER_MAX_HEIGHT = 94;
const HEADER_MIN_HEIGHT = 60;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

export default function NotificationScreen(){
    // dummy data - 서버에서 불러와야 함
    let threeData=[1,2,3,4,5,6,7,8,9];
    const scroll = useRef(new Animated.Value(0)).current;
    const ScaleImg = scroll.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      // 40->28 비율 계산
      outputRange: [1, 0.7],
      extrapolate: 'clamp',
    });
    const TranslateImgX = scroll.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 14],
      extrapolate: 'clamp',
    });
    const TranslateImgY = scroll.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      // 왜 -14-16이 되는 건지 잘 설명을 못하겠음...
      outputRange: [0, -14-16],
      extrapolate: 'clamp',
    });
    const OpacityTitle = scroll.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2,HEADER_SCROLL_DISTANCE],
      // 투명도 속도 맞춰서 설정함!
      outputRange: [1, 0, -3],
      extrapolate: 'clamp',
    });
    const OpacityHeader=scroll.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE/2, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 0, 1],
      extrapolate: 'clamp',
    });

    return(
      <area.Container>
        <Animated.View
          pointerEvents="none"
          style={[styles.header,{ opacity: OpacityHeader }]}>
        </Animated.View>

        <area.RowArea style={{marginHorizontal:30, marginTop:30}}>
          <Animated.View style={[styles.a, {opacity : OpacityTitle}, {transform:[{translateY: TranslateImgY}]}]}>
            <NameNText name="eksghwhk" sub="의"/>
            <text.Subtitle2R color={colors.black}>피드</text.Subtitle2R>
          </Animated.View>
          <Animated.View style={[styles.b, {transform:[{scale: ScaleImg},{translateY: TranslateImgY}, {translateX:TranslateImgX}]}]}>
            <elses.CircleImg diameter={40} source={require('../../../assets/img.jpg')}/>
          </Animated.View>
        </area.RowArea>

        <Animated.ScrollView 
        // >>marginTop에 왜 30를 빼는가?
        // 위에 있는 RowArea에서 marginTop을 30만큼 줬으니까, 이 ScrollView의 marginTop에도 영향을 준다.
        // 따라서 스크롤 했을 때 HEADER_MIN 바로 아래까지 오려면 영향 받은 marginTop만큼 빼줘야 한다. 
        // paddingTop은 HEADER에 영향을 주지 않는다. 그저 RowArea와의 간격에만 영향을 준다.
        // >>paddingTop에 왜 14를 더하는가?
        // header의 position이 absolute라서 스크롤뷰가 이를 무시한다.
        // 그래서 header가 스크롤 전엔, 스크롤 올렸을 때 header가 있어야 할 곳에서 14만큼 내려와있다.
        // 따라서 내려온만큼을 스크롤이 위치를 존중해줘야 하기 때문에 padding에 14만큼 더한다.
        // >>paddingTop은 왜 FlatList 바로 위에다 해주는가?
        // 스크롤뷰에 padding을 건다면 스크롤에 제한이 생겨서 아래가 잘리지만, FlatList에 padding을 건다면
        // 아래로 조금씩 밀리되, 스크롤에 영향을 주지 않아서 다 볼 수 있다. 십년감수ㅠ
          style={{marginTop: HEADER_MIN_HEIGHT-30, marginHorizontal:30}}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scroll } } }],
            { useNativeDriver: true })}>
          <View style={{paddingTop: 20+14}}/>
          <FlatList
            data={threeData}
            showsVerticalScrollIndicator={false}
            renderItem={(obj)=>{
              return(
                <PostingItem/>
              ); 
            }}></FlatList>
        </Animated.ScrollView>
      </area.Container>
              
    )
}

const styles=StyleSheet.create({
  a:{
    position:'absolute',
    resizeMode:'cover',
    backgroundColor:'transparent',
    borderRadius:15,
    alignItems:'flex-start',
    justifyContent:'flex-start',
    top:0,
    left:0,
  },
  b:{
    position:'absolute',
    resizeMode:'cover',
    backgroundColor:'transparent',
    borderRadius:15,
    alignItems:'center',
    justifyContent:'flex-start',
    right:0,
    top:0,
  },
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