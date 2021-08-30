import React, {Component, useRef,useState, useCallback} from 'react';
import {
    View,
    Animated,
    ScrollView, 
    StyleSheet,
    TextInput,
    FlatList,
    TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import i18n from 'i18n-js';
import {colors} from '../../../styles/colors'
import * as area from '../../../styles/styled-components/area';
import * as text from '../../../styles/styled-components/text';

// icons
import SearchViewSvg from '../../../assets/SearchView';
import SearchViewFocusSvg from '../../../assets/SearchViewFocus';

// props & logic
import type {SearchProps, MiniCharacter} from '../../../utils/types/types';
import { StatusBarHeight } from '../../../logics/non-server/StatusbarHeight';
import { responseToCharacter, CharacterResponseType } from '../../../logics/server/Character';
import { SearchTopPost, SearchTopCharacter } from '../../../logics/Search';
import { PostInterface, AllPostRequestType, PostListResponseToPost } from '../../../logics/Post';

// components
import TagModifyItem from '../../../components/item/TagModifyItem';
import CharacterItem from '../../../components/item/CharacterItem';
import PostingItem from '../../../components/item/PostingItem';
import EpisodeMiniItem from '../../../components/item/EpisodeMiniItem';
import FloatingButton from '../../../components/button/FloatingButton';
import { useEffect } from 'react';
import useCharacter from '../../../logics/hooks/useCharacter';
import SearchChaItem from '../../../components/item/SearchChaItem';

const HEADER_MAX_HEIGHT = 95;
const HEADER_MIN_HEIGHT = 60;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

export default function SearchScreen({navigation} : SearchProps){
    const[recentList, setRecentList]=useState(["단호", "귀여움", "아이돌", "파란색", "먹방", "유튜버"]);
    const[chaList, setChaList]=useState<MiniCharacter[]>([]);
    const[postList, setPostList]=useState< Array< PostInterface<AllPostRequestType> > >([]);
    const[character, setCharacter]=useCharacter();

    const[selectIdCha, setSelectIdCha]=useState(-1);
    const[selectIdEpi, setSelectIdEpi]=useState(-1);
    const[selectIdPost, setSelectIdPost]=useState(-1);
    const[selectIdRecent, setSelectIdRecent]=useState(-1);
    const[focus, setFocus]=useState(0);
    const[searchText, setSearchText]=useState('');

    useEffect(()=>{
      async function getPosts() {
        const result = await SearchTopPost(character.id);
        if(typeof(result)!=="string"){
          setPostList(PostListResponseToPost(result));
        }
        else alert(result);
      }
      getPosts();
    }, [])

    useEffect(()=>{
      async function getChas() {
        const result = await SearchTopCharacter();
        if(typeof(result)!=="string"){
          setChaList(result.characters)
        }
        else alert(result);
      }
      getChas();
    }, [])

    const scroll = useRef(new Animated.Value(0)).current;
    const OpacityHeader=scroll.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE/2, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 0.5, 1],
      extrapolate: 'clamp',
    });
    const TranslateInput=scroll.interpolate({
      inputRange:[0, HEADER_SCROLL_DISTANCE],
      outputRange:[0, -18],
      extrapolate:'clamp',
    });
    const ColorInput=scroll.interpolate({
      inputRange:[0, HEADER_SCROLL_DISTANCE],
      outputRange:[colors.white, colors.gray0],
      extrapolate:'clamp',
    });
    const searchColor={
      backgroundColor : ColorInput
    }

    return(
        <area.Container>
          <Animated.View
            pointerEvents="none"
            style={[styles.header,{ opacity: OpacityHeader }]}>
          </Animated.View>

          <View style={{marginTop:30, marginHorizontal:30}}>
            <Animated.View style={[styles.searchView, searchColor, {transform:[{translateY: TranslateInput}]}]}>
              <View style={{marginLeft: 18, marginRight:10}}>
                {focus===1 || searchText.length>0 ? <SearchViewFocusSvg w='15' h='15'/> : <SearchViewSvg w='15' h='15'/>}
              </View>
              <View style={{flex:1}}>
                <TextInput placeholder={i18n.t("무엇이 궁금한가요")} 
                  onFocus={()=>setFocus(1)} onBlur={()=>setFocus(0)} onChangeText={(str)=>setSearchText(str)} value={searchText}/>
              </View>
            </Animated.View>
          </View>

          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView 
            style={{marginTop:HEADER_MIN_HEIGHT-30, flex:1}}
            showsVerticalScrollIndicator={false}
            onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scroll } } }],
            { useNativeDriver: false })}>
            <View style={{paddingTop:30+12}}/>
            <Animated.View style={{marginLeft : 30}}>

              <Animated.View>
                <text.Subtitle3 color={colors.black}>{i18n.t('최근 검색어')}</text.Subtitle3>
                <FlatList
                  style={{marginTop:12}}
                  data={recentList}
                  keyExtractor={(item) => item}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  renderItem={(obj)=>{
                    return(
                      <TouchableWithoutFeedback onPress={()=>{selectIdRecent===obj.index ? setSelectIdRecent(-1) : setSelectIdRecent(obj.index)}}>
                        <TagModifyItem content={obj.item} press={selectIdRecent} setSearch={setSearchText} index={obj.index} search={1} 
                          array={recentList} setArray={setRecentList}/>
                      </TouchableWithoutFeedback>
                    ); 
                  }}>
                </FlatList>
              </Animated.View>

              <Animated.View style={{marginTop:40}}>
                <text.Subtitle3 color={colors.black}>{i18n.t('인기 부캐')}</text.Subtitle3>
                <FlatList
                  style={{marginTop:12}}
                  data={chaList}
                  keyExtractor={(item, index) => index.toString()}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  renderItem={(obj)=>{
                    return(
                    <TouchableWithoutFeedback onPress={()=>{selectIdCha===obj.index ? setSelectIdCha(-1) : setSelectIdCha(obj.index)}}>
                      <SearchChaItem press={selectIdCha} id={obj.index} character={obj.item}/>
                    </TouchableWithoutFeedback>
                    ); 
                  }}></FlatList>
              </Animated.View>

              {/* <Animated.View style={{marginTop:40}}>
                <text.Subtitle3 color={colors.black}>인기 에피소드</text.Subtitle3>
                <FlatList
                  style={{marginTop:12}}
                  data={Data}
                  keyExtractor={(item) => item.id.toString()}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  renderItem={(obj)=>{
                    return(
                      <TouchableWithoutFeedback onPress={()=>{selectIdEpi===obj.index ? setSelectIdEpi(-1) : setSelectIdEpi(obj.index)}}>
                        <EpisodeMiniItem navigation={navigation} press={selectIdEpi} id={obj.index}/>
                      </TouchableWithoutFeedback>
                    ); 
                  }}></FlatList>
              </Animated.View> */}

          </Animated.View>

          <area.ContainerBlank30 style={{marginTop:10}}>
            <text.Subtitle3 color={colors.black}>{i18n.t('인기 게시물')}</text.Subtitle3>
            <FlatList
              style={{marginTop:12}}
              data={postList}
              keyExtractor={(item, idx) => idx.toString()}
              showsVerticalScrollIndicator={false}
              renderItem={(obj)=>{
                return(
                  <TouchableWithoutFeedback onPress={()=>{selectIdPost===obj.index ? setSelectIdPost(-1) : setSelectIdPost(obj.index)}}>
                    <PostingItem press={selectIdPost} id={obj.index} info={obj.item}/>
                  </TouchableWithoutFeedback>
                ); 
              }}/>
          </area.ContainerBlank30>
          </ScrollView>
          </TouchableWithoutFeedback>
          <FloatingButton/>
        </area.Container>
    )
}

const styles = StyleSheet.create({
    searchView: {
        height:40,
        paddingVertical:10,
        backgroundColor: colors.white,
        flexDirection:'row',
        alignItems:'center',
        borderRadius:10,
        position:'absolute',
        // 0을 해주니까 상태바 길이만큼 위치가 내려간다!
        top:0,
        left:0,
        right:0,
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