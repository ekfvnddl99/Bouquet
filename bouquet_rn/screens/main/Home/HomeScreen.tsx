import React, {useRef, useState} from 'react';
import {
    View,
    ScrollView,
    StatusBar,
    FlatList,
    Animated,
    Platform,
    StyleSheet,
    SafeAreaView
} from 'react-native';
import {colors} from '../../../styles/colors';
import * as area from '../../../styles/styled-components/area';
import * as text from '../../../styles/styled-components/text';
import * as elses from '../../../styles/styled-components/elses';

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
      outputRange: [1, 0.8],
      extrapolate: 'clamp',
    });
    const TranslateImg = scroll.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, -10],
      extrapolate: 'clamp',
    });
    const OpacityTitle = scroll.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2,HEADER_SCROLL_DISTANCE],
      outputRange: [1, 0, -3],
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
        <area.RowArea style={{marginHorizontal:30, marginTop:30}}>
          <Animated.View style={[styles.a, {opacity : OpacityTitle}]}>
            <NameNText name="eksghwhk" sub="의"/>
            <text.Subtitle2R color={colors.black}>피드</text.Subtitle2R>
          </Animated.View>
          <Animated.View style={[styles.b, {transform:[{scale:ScaleImg}, {translateY: TranslateImg}]}]}>
            <elses.CircleImg diameter={40} source={require('../../../assets/img.jpg')}/>
          </Animated.View>
        </area.RowArea>
        <Animated.ScrollView 
          style={{marginTop: HEADER_MIN_HEIGHT, marginHorizontal:30}}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scroll } } }],
            { useNativeDriver: true })}>
          <View style={{paddingTop:20}}/>
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
  c: {
    position:'absolute',
    resizeMode:'cover',
    backgroundColor:colors.gray0,
    borderRadius:15,
    alignItems:'center',
    justifyContent:'flex-start',
    right:0,
    top:0,
    left: 0,
    height: HEADER_MAX_HEIGHT,
  },
  header: {
    position: 'absolute',
    left: 0,
    right: 0,
    top:0,
    backgroundColor: colors.white,
    overflow: 'hidden',
    height: HEADER_MIN_HEIGHT+(Platform.OS === 'ios' ? 38 : 28)+30,
    borderRadius:15
  },
})