import React, {useRef, useState} from 'react';
import {
    ScrollView,
    FlatList,
    View,
    Animated,
    TouchableOpacity,
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
import ProfileButton from '../components/ProfileButton';
import BackButton from '../components/BackButton';
import SunButton from '../components/SunButton';
import CommentItem from '../components/CommentItem';
import CommentInputBar from '../components/CommentInputBar';

// template
import TextTemplate from '../template/TextTemplate';

const HEADER_MAX_HEIGHT = 90;
const HEADER_MIN_HEIGHT = 60;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

export default function PostDetailScreen(){
    // dummy data - 서버에서 불러와야 함
    let Data=[1,2,3,4,5,6,7,8,9];

    const[press, setPress]=useState(-1);

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
            <BackButton navigation={()=>{}}/>
            <View style={{flex:1}}/>
            <elses.CircleImg diameter={28} source={require('../../assets/img.jpg')}/>
          </area.RowArea>
          
          <Animated.ScrollView 
            style={{marginHorizontal:30}}
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={1}
            onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scroll } } }],
            { useNativeDriver: true })}>
            <View style={{paddingTop: 20}}/>
            <ProfileButton diameter={30}/>
            <View style={{marginBottom: 12}}/>
            <TextTemplate/>
            <View style={{alignItems:'flex-start'}}><SunButton sun={24} active={0}/></View>
            <View style={{marginTop:36}}>
              <text.Subtitle3 color={colors.black}>반응</text.Subtitle3>
              <View style={{marginBottom: 12}}/>
            </View>
            <FlatList
              data={Data}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              renderItem={(obj)=>{
                return(
                  <TouchableOpacity onPress={()=>{setPress(press*(-1)), console.log(press)}}>
                    <CommentItem press={press}/>
                  </TouchableOpacity>
                ); 
              }}>
            </FlatList>
          </Animated.ScrollView>
          {press===1 ? <CommentInputBar/> : null}
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
  input:{
    position:'absolute',
    bottom:0,
    left:0,
    right:0,
  }
})