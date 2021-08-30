import React, {useRef, useState, useEffect, useMemo, useCallback} from 'react';
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
import { StatusBarHeight } from '../../logics/non-server/StatusbarHeight';
import { userState, viewPostState } from '../../logics/atoms';
import { useRecoilValue, useRecoilState } from 'recoil';
import * as Post from '../../logics/Post';
import useCharacter from '../../logics/hooks/useCharacter';

// components
import ProfileButton from '../../components/button/ProfileButton';
import BackButton from '../../components/button/BackButton';
import SunButton from '../../components/button/SunButton';
import CommentItem from '../../components/item/CommentItem';
import CommentInputBar from '../../components/CommentInputBar';
import CommentInputComment from '../../components/CommentInputComment';
import LineButton from '../../components/button/LineButton';
import ConditionButton from '../../components/button/ConditionButton';
import ProfileItem from '../../components/item/ProfileItem';

import TextTemplate from '../template/TextTemplate';
import ImageTemplate from '../template/ImageTemplate';
import AlbumTemplate from '../template/AlbumTemplate';
import DiaryTemplate from '../template/DiaryTemplate';
import ListTemplate from '../template/ListTemplate';

const dummy_c : Post.Comment[]=[
    {name: "오란지",
  createdAt: "120",
  updatedAt: "3",
  profileImg: "https://i.pinimg.com/736x/05/79/5a/05795a16b647118ffb6629390e995adb.jpg",
  id: 2,
  comment: "뭐야 두리안씨 냄새나염",
  liked: false,
  parent: 1,}, 
  {name: "두리안",
  createdAt: "60",
  updatedAt: "3",
  profileImg: "https://img3.daumcdn.net/thumb/R658x0.q70/?fname=https://t1.daumcdn.net/news/202105/21/dailylife/20210521214351768duii.jpg",
  id: 3,
  comment: "무엄하다. 감히 A+ 주제에 과일들이 뽑은 최고의 향을 가진 나에게 냄새라니.",
  liked: false,
  parent: 1,},
  {name: "오란지",
  createdAt: "60",
  updatedAt: "3",
  profileImg: "https://i.pinimg.com/736x/05/79/5a/05795a16b647118ffb6629390e995adb.jpg",
  id: 4,
  comment: "안쓰러워서 못봐주겠어용ㅠㅠ",
  liked: false,
  parent: 1,}
  ]
  const dummy_a : Post.Comment[]=[{
    name: "두리안",
    createdAt: "120",
    "updatedAt": "3",
    "profileImg": "https://img3.daumcdn.net/thumb/R658x0.q70/?fname=https://t1.daumcdn.net/news/202105/21/dailylife/20210521214351768duii.jpg",
    "id": 1,
    "comment": "나약한 녀석. A+ 밖에 안되다니. 난 S급이라서 우습고 유치하군.",
    "liked": false,
    "parent": 0,
    children:[],
  },
  {name: "사과",
  createdAt: "60",
  updatedAt: "3",
  profileImg: "https://lh3.googleusercontent.com/proxy/23GhlGE_ZlNQvAiMj-2kBTOxNlmVDx4y7cXRCcSYW3UiFm1DqbaQ5UW-BOFvLCLohq0v6uqQ-6og6PqWuHYXwyeG3v0p2U40gZa6665zYoMeB5Mf5dnDdMcxGFQvuPXRENvZ",
  id: 5,
  comment: "우와 둘이 싸운다",
  liked: false,
  parent: 0,},
  {name: "블루베리",
  createdAt: "45",
  updatedAt: "3",
  profileImg: "https://imagescdn.gettyimagesbank.com/500/19/328/458/0/1161802142.jpg",
  id: 6,
  comment: "이기는 편 우리 편~~",
  liked: false,
  parent: 0,},
  {name: "자몽",
  createdAt: "39",
  updatedAt: "3",
  profileImg: "https://t1.daumcdn.net/cfile/blog/99DE2C4F5BC8432617",
  id: 7,
  comment: "두리안이랑 둘이안 싸우면 안돼?",
  liked: false,
  parent: 0,}]

  
const HEADER_MAX_HEIGHT = 90;
const HEADER_MIN_HEIGHT = 60;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

export default function PostDetailScreen(){
    const[secComm, setSecComm]=useState<Post.Comment[]>([]);

    const user = useRecoilValue(userState);
    const [character, setCharacter] = useCharacter();
    const[selectId, setSelectId]=useState(-1);
    const[clickedLowerId, setClickedLowerId]=useState<number[]>([]);
    const[click, setClick]=useState(1);
    const[comment, setComment]=useState('');
    const[parentComm, setParentComm]=useState<Post.Comment>();

    const [viewPost, setViewPost] = useRecoilState(viewPostState);

    const onUpload=(newComm:string)=>{
      let one : Post.Comment= {comment : newComm, createdAt:"1", id:5, liked:false, name:"두리안",parent:1, profileImg : "https://img3.daumcdn.net/thumb/R658x0.q70/?fname=https://t1.daumcdn.net/news/202105/21/dailylife/20210521214351768duii.jpg", updatedAt:"2021-08-19T17:39:41"}
      // setSecComm([...secComm, one]);
      dummy_c.push(one)
      setComment('')
      console.log(secComm)
    }

    const getIsPostOwner = useCallback(() => {
      return character.name === viewPost.characterName;
    }, [character, viewPost]);
    const postOwner = useMemo(() => getIsPostOwner(), [getIsPostOwner]);



    const scroll = useRef(new Animated.Value(0)).current;
    const OpacityHeader=scroll.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE/2, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 0.5, 1],
      extrapolate: 'clamp',
    });

    const getSelectedComment = useCallback(() => {
      if(viewPost.comments){
        for (const comment of viewPost.comments) {
          if (comment.id === selectId) {
            return comment.comment;
          }
        }
      }
      return '';
    }, [viewPost, selectId]);
    const selectedComment = useMemo(() => getSelectedComment(), [getSelectedComment]);

    const getTemplate = useCallback(() => {
      console.log("ppppp", viewPost);
      if (viewPost.template) {
        switch (viewPost.template.template) {
          case "Image":
            return <ImageTemplate mode="detail" post={viewPost} />;
          case "Diary":
            return <DiaryTemplate mode="detail" post={viewPost} />;
          case "Album":
            return <AlbumTemplate mode="detail" post={viewPost} />;
          case "List":
            return <ListTemplate mode="detail" post={viewPost} />;
          default:
            return null;
        }
      }
      
    }, [viewPost]);
    const template = useMemo(() => getTemplate(), [getTemplate]);

    return(
        <area.Container>
          <Animated.View
            pointerEvents="none"
            style={[styles.header,{ opacity: OpacityHeader }]}>
          </Animated.View>

          <area.RowArea style={{paddingHorizontal:30, paddingVertical:16}}>
            <BackButton/>
            <View style={{flex:1}}/>
            <ProfileItem diameter={28} picUrl={character.profileImg} characterId={character.id}/>
          </area.RowArea>
       
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
                  <View style={{flex:1}}><ProfileButton diameter={30} account={0} name={viewPost.characterName} profile={viewPost.characterImg}/></View>
                  {postOwner ? 
                  <area.RowArea style={{paddingRight:1}}>
                    <LineButton press={()=>{}} content={i18n.t("수정")} color={colors.black} incolor={colors.gray2} outcolor={'transparent'}/>
                    <View style={{marginRight:4}}/>
                    <LineButton press={()=>{}} content={i18n.t("삭제")} color={colors.warning_red} incolor={colors.alpha20_primary} outcolor={'transparent'}/>
                  </area.RowArea> : null}
                </area.RowArea>
                <View style={{marginBottom: 12}}/>
                {template}
                {viewPost.template && viewPost.template.text ?
                <TextTemplate mode="detail" content={viewPost.template.text} />
                :
                null
                }
                <View style={{alignItems:'flex-start'}}><SunButton sun={viewPost.numSunshines} active={viewPost.liked}/></View>
                <text.Subtitle3 color={colors.black} style={{marginTop:36}}>{i18n.t('반응')}</text.Subtitle3>

                <View style={{paddingTop: 12}}/>
                <FlatList
                  data={dummy_a}
                  keyboardShouldPersistTaps={'always'}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={(obj)=>{
                    return(
                      <>
                      <TouchableOpacity activeOpacity={1} onPress={()=>{selectId===obj.item.id ? setSelectId(-1) : setSelectId(obj.item.id)}}>
                        <CommentItem info={obj.item} press={selectId} owner={character.name===obj.item.name} login={user.isLogined} IsClick={setClick} AddClicks={setClickedLowerId} clicks={clickedLowerId} setSelect={setSelectId} setParentComm={setParentComm}/>
                      </TouchableOpacity>
                      {clickedLowerId.includes(obj.item.id) && obj.item.children?
                      <FlatList
                        style={{marginLeft:16}}
                        data={dummy_c}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={(lowerobj)=>{
                          return(
                            <TouchableOpacity activeOpacity={1} onPress={()=>{selectId===lowerobj.item.id ? setSelectId(-1) : setSelectId(lowerobj.item.id)}}>
                              <CommentItem info={lowerobj.item} press={selectId} owner={character.name===lowerobj.item.name} login={user.isLogined} setSelect={setSelectId} setParentComm={setParentComm}/>
                            </TouchableOpacity>
                          );}}/>: null}</>
                    ); 
                  }}/>
              </Animated.ScrollView>
            {user.isLogined ?
              <View style={{justifyContent:'flex-end'}}>

                {parentComm ? <CommentInputComment setParentComm={setParentComm} info={parentComm}/> : null}
                <CommentInputBar selectId={selectId} value={comment} onChange={setComment} onUpload={onUpload}/>
              </View> : null}
            </KeyboardAvoidingView>
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