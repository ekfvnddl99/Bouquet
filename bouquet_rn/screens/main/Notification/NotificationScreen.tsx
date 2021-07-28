import React, {useRef, useState} from 'react';
import {
    View,
    Animated,
    FlatList,
    ScrollView,
    Platform,
    StyleSheet
} from 'react-native';
import {colors} from '../../../styles/colors';
import * as area from '../../../styles/styled-components/area';
import * as text from '../../../styles/styled-components/text';
import * as elses from '../../../styles/styled-components/elses';

// props & logic
import { StatusBarHeight } from '../../logics/StatusbarHeight';

// components
import NotificationItem from '../../components/NotificationItem';
import NameNText from '../../components/NameNText';
import NotLoginPrimaryButton from '../../components/NotLoginPrimaryButton';

const HEADER_MAX_HEIGHT = 94;
const HEADER_MIN_HEIGHT = 60;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

export default function NotificationScreen(){
    // dummy data - 서버에서 불러와야 함
    const [login, setLogin]=useState(1);
    let data=[1,2,3,4,5,6,7,8,9, 10];

    const scroll = useRef(new Animated.Value(0)).current;
    const ScaleImg = scroll.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
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
            < NameNText name="eksghwhk" sub="의"/>
            <text.Subtitle2R color={colors.black}>알림</text.Subtitle2R>
          </Animated.View>
          <Animated.View style={[styles.b, {transform:[{scale: ScaleImg},{translateY: TranslateImgY}, {translateX:TranslateImgX}]}]}>
            <elses.CircleImg diameter={40} source={require('../../../assets/img.jpg')}/>
          </Animated.View>
        </area.RowArea>
        <Animated.ScrollView
          style={{marginTop: HEADER_MIN_HEIGHT-30, marginHorizontal:30}}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scroll } } }],
            { useNativeDriver: true })}>
          <View style={{paddingTop: 30+14}}/>
          {data.length===0 ? 
            <View style={{alignItems:'center'}}><text.Caption color={colors.gray6}>이제 확인할 알림이 없어요!</text.Caption></View> : 
            <FlatList data={data} renderItem={(obj)=>{
              return(<NotificationItem/>);}}>
            </FlatList>}
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