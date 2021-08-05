import React, {useRef, useState, useEffect} from 'react';
import {
    ScrollView,
    FlatList,
    View,
    Animated,
    TouchableOpacity,
    Platform,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import {colors} from '../../styles/colors';
import * as area from '../../styles/styled-components/area';
import * as text from '../../styles/styled-components/text';
import * as button from '../../styles/styled-components/button';
import * as elses from '../../styles/styled-components/elses';

// props & logic
import { StatusBarHeight } from '../logics/StatusbarHeight';

// components
import ProfileButton from '../components/ProfileButton';
import BackButton from '../components/BackButton';
import SunButton from '../components/SunButton';
import CommentItem from '../components/CommentItem';
import CommentInputBar from '../components/CommentInputBar';
import LineButton from '../components/LineButton';
import ConditionButton from '../components/ConditionButton';
import ProfileItem from '../components/ProfileItem';

// template
import TextTemplate from '../template/TextTemplate';

const HEADER_MAX_HEIGHT = 90;
const HEADER_MIN_HEIGHT = 60;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

export default function PostDetailScreen(){
    // dummy data - 서버에서 불러와야 함
    let Data=[{id:1},{id:2},{id:3},{id:4},{id:5},{id:6},{id:7},{id:8},{id:9}];
    let data=[{id:1},{id:2}];

    const[selectId, setSelectId]=useState(-1);
    const[clickedLowerId, setClickedLowerId]=useState<number[]>([]);
    const[owner, setOwner]=useState(1);
    const[click, setClick]=useState(1);

    const scroll = useRef(new Animated.Value(0)).current;
    const OpacityHeader=scroll.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE/2, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 0.5, 1],
      extrapolate: 'clamp',
    });

    return(
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
            <area.RowArea>
              <View style={{flex:1}}><ProfileButton diameter={30} account={0}/></View>
              {owner===1 ? 
              <area.RowArea>
                <LineButton press={()=>{}} content="수정" color={colors.black} incolor={colors.gray2} outcolor={'transparent'}/>
                <View style={{marginLeft:4}}/>
                <LineButton press={()=>{}} content="삭제" color={colors.warning_red} incolor={colors.alpha20_primary} outcolor={'transparent'}/>
              </area.RowArea> : null}
            </area.RowArea>
            <View style={{marginBottom: 12}}/>
            <TextTemplate/>
            <View style={{alignItems:'flex-start'}}><SunButton sun={24}/></View>

            
            <View style={{marginTop:36}}>
              <text.Subtitle3 color={colors.black}>반응</text.Subtitle3>
              <View style={{marginBottom: 12}}/>
            </View>
            <FlatList
              data={Data}
              keyExtractor={(item) => item.id.toString()}
              renderItem={(obj)=>{
                return(
                  <>
                  <TouchableOpacity activeOpacity={1} onPress={()=>{selectId===obj.index ? setSelectId(-1) : setSelectId(obj.index)}}>
                    <CommentItem press={selectId} id={obj.index} owner={1} IsMore={1} IsClick={setClick} AddClicks={setClickedLowerId} clicks={clickedLowerId}/>
                  </TouchableOpacity>
                  {clickedLowerId.includes(obj.index) ?
                  <FlatList
                    style={{marginLeft:16}}
                    data={data}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={(lowerobj)=>{
                      return(
                        <TouchableOpacity activeOpacity={1} onPress={()=>{selectId===((obj.index+1)*10)+lowerobj.index ? setSelectId(-1) : setSelectId(((obj.index+1)*10)+lowerobj.index)}}>
                          <CommentItem press={selectId} id={((obj.index+1)*10)+lowerobj.index} owner={1}/>
                        </TouchableOpacity>
                      );}}/>: null}
                  </>
                ); 
              }}/>
          </Animated.ScrollView>
          {selectId!==-1 ? <CommentInputBar/> : null}
        </area.Container>
      </TouchableWithoutFeedback>
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