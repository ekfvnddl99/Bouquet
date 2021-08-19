import React, {useRef, useState, useEffect} from 'react';
import {
    KeyboardAvoidingView,
    FlatList,
    View,
    Animated,
    TouchableOpacity,
    Platform,
    StyleSheet,
    Text,
    Dimensions,
    ScrollView,
    TouchableWithoutFeedback,
    KeyboardEvent,
  Keyboard,
  SafeAreaView
} from 'react-native';
import i18n from 'i18n-js';
import {colors} from '../../styles/colors';
import * as area from '../../styles/styled-components/area';
import * as text from '../../styles/styled-components/text';
import * as button from '../../styles/styled-components/button';
import * as elses from '../../styles/styled-components/elses';

// props & logic
import { StatusBarHeight } from '../logics/StatusbarHeight';
import { userState } from '../logics/atoms';
import { useRecoilValue } from 'recoil';
import * as Post from '../logics/Post';

// components
import ProfileButton from '../components/ProfileButton';
import BackButton from '../components/BackButton';
import SunButton from '../components/SunButton';
import CommentItem from '../components/CommentItem';
import CommentInputBar from '../components/CommentInputBar';
import CommentInputComment from '../components/CommentInputComment';
import LineButton from '../components/LineButton';
import ConditionButton from '../components/ConditionButton';
import ProfileItem from '../components/ProfileItem';

// template
import TextTemplate from '../template/TextTemplate';
import { onChange } from 'react-native-reanimated';
import useCharacter from '../logics/useCharacter';
import { Comment } from '../../utils/types';

const HEADER_MAX_HEIGHT = 90;
const HEADER_MIN_HEIGHT = 60;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const Posting={
  "id": 1,
  "created_at": "2021-08-19T17:37:23",
  "updated_at": "2021-08-19T17:37:23",
  "template": "None",
  "text": "이것이 포스팅이다.",
  "liked": true
}
const Writer={
  "name": "오란지",
  "profile_img": "https://i.pinimg.com/736x/05/79/5a/05795a16b647118ffb6629390e995adb.jpg"
}
const Data=[
  {
    "name": "오란지",
    "profile_img": "https://i.pinimg.com/736x/05/79/5a/05795a16b647118ffb6629390e995adb.jpg",
    "id": 1,
    "created_at": "2021-08-19T17:37:59",
    "updated_at": "2021-08-19T17:37:59",
    "comment": "이 노래를 불러보지만 내 진심이 닿을지 몰라",
    "parent": 0,
    "liked": false,
    "children": [
      {
        "name": "오란지",
        "profile_img": "https://i.pinimg.com/736x/05/79/5a/05795a16b647118ffb6629390e995adb.jpg",
        "id": 2,
        "created_at": "2021-08-19T17:38:50",
        "updated_at": "2021-08-19T17:38:50",
        "comment": "Welcome to my 하늘궁",
        "parent": 1,
        "liked": false
      },
      {
        "name": "오란지",
        "profile_img": "https://i.pinimg.com/736x/05/79/5a/05795a16b647118ffb6629390e995adb.jpg",
        "id": 7,
        "created_at": "2021-08-19T17:39:41",
        "updated_at": "2021-08-19T17:39:41",
        "comment": "합법 전까지 마약해",
        "parent": 1,
        "liked": false
      }
    ]
  },
  {
    "name": "오란지",
    "profile_img": "https://i.pinimg.com/736x/05/79/5a/05795a16b647118ffb6629390e995adb.jpg",
    "id": 3,
    "created_at": "2021-08-19T17:38:59",
    "updated_at": "2021-08-19T17:38:59",
    "comment": "대기권 밖으로",
    "parent": 0,
    "liked": false,
    "children": [
      {
        "name": "오란지",
        "profile_img": "https://i.pinimg.com/736x/05/79/5a/05795a16b647118ffb6629390e995adb.jpg",
        "id": 6,
        "created_at": "2021-08-19T17:39:27",
        "updated_at": "2021-08-19T17:39:27",
        "comment": "아빠 긴장타야해",
        "parent": 3,
        "liked": false
      }
    ]
  },
  {
    "name": "오란지",
    "profile_img": "https://i.pinimg.com/736x/05/79/5a/05795a16b647118ffb6629390e995adb.jpg",
    "id": 4,
    "created_at": "2021-08-19T17:39:09",
    "updated_at": "2021-08-19T17:39:09",
    "comment": "온난화의 주범",
    "parent": 0,
    "liked": false,
    "children": []
  }
]


export default function PostDetailScreen(){
    const[secComm, setSecComm]=useState([{comm:"1"},{comm:"2"}]);

    const user = useRecoilValue(userState);
    const [character, setCharacter] = useCharacter();
    const[selectId, setSelectId]=useState(-1);
    const[clickedLowerId, setClickedLowerId]=useState<number[]>([]);
    const[postOwner, setPostOwner]=useState(false);
    const[click, setClick]=useState(1);
    const[comment, setComment]=useState('');
    const[parentComm, setParentComm]=useState<Comment>();

    const onUpload=(comment:string)=>{
      setSecComm([...secComm, {comm : comment}]);
      setComment('')
    }
    useEffect(()=>{
      if(character.name===Writer.name) setPostOwner(true)
    }, [])

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
            <BackButton/>
            <View style={{flex:1}}/>
            <ProfileItem diameter={28}/>
          </area.RowArea>
       
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView style={{flex:1, flexDirection:'column', justifyContent:"center"}} behavior={'padding'} enabled>
              <Animated.ScrollView
                contentContainerStyle={{marginHorizontal:30, flexGrow:1, flexDirection:'column'}}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps={'always'}
                onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { y: scroll } } }],
                { useNativeDriver: true })}>
                <View style={{paddingTop: 20}}/>

                <area.RowArea>
                  <View style={{flex:1}}><ProfileButton diameter={30} account={0} name={Writer.name} profile={Writer.profile_img}/></View>
                  {postOwner ? 
                  <area.RowArea style={{paddingRight:1}}>
                    <LineButton press={()=>{}} content={i18n.t("수정")} color={colors.black} incolor={colors.gray2} outcolor={'transparent'}/>
                    <View style={{marginRight:4}}/>
                    <LineButton press={()=>{}} content={i18n.t("삭제")} color={colors.warning_red} incolor={colors.alpha20_primary} outcolor={'transparent'}/>
                  </area.RowArea> : null}
                </area.RowArea>
                <View style={{marginBottom: 12}}/>

                <View style={{alignItems:'flex-start'}}>
                  <SunButton sun={24} active={Posting.liked}/>
                </View>
                <text.Subtitle3 color={colors.black} style={{marginTop:36}}>{i18n.t('반응')}</text.Subtitle3>

                <View style={{paddingTop: 12}}/>
                <FlatList
                  data={Data}
                  keyboardShouldPersistTaps={'always'}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={(obj)=>{
                    return(
                      <>
                      <TouchableOpacity activeOpacity={1} onPress={()=>{selectId===obj.item.id ? setSelectId(-1) : setSelectId(obj.item.id)}}>
                        <CommentItem info={obj.item} press={selectId} owner={character.name===obj.item.name} login={user.isLogined} IsClick={setClick} AddClicks={setClickedLowerId} clicks={clickedLowerId} setSelect={setSelectId} setParentComm={setParentComm}/>
                      </TouchableOpacity>
                      {clickedLowerId.includes(obj.item.id) ?
                      <FlatList
                        style={{marginLeft:16}}
                        data={obj.item.children}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={(lowerobj)=>{
                          return(
                            <TouchableOpacity activeOpacity={1} onPress={()=>{selectId===lowerobj.item.id ? setSelectId(-1) : setSelectId(lowerobj.item.id)}}>
                              <CommentItem info={lowerobj.item} press={selectId} owner={character.name===lowerobj.item.name} login={user.isLogined} setSelect={setSelectId} setParentComm={setParentComm}/>
                            </TouchableOpacity>
                          );}}/>: null}
                      </>
                    ); 
                  }}/>
              </Animated.ScrollView>
            {user.isLogined ?
              <View style={{justifyContent:'flex-end'}}>
                {parentComm ? <CommentInputComment setParentComm={setParentComm} info={parentComm}/> : null}
                <CommentInputBar selectId={selectId} value={comment} onChange={setComment} onUpload={onUpload}/>
              </View> : null}
            </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
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