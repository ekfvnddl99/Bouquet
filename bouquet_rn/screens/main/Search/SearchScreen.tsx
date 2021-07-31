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
import {colors} from '../../../styles/colors'
import * as area from '../../../styles/styled-components/area';
import * as text from '../../../styles/styled-components/text';

// icons
import SearchViewSvg from '../../../assets/SearchView';
import SearchViewFocusSvg from '../../../assets/SearchViewFocus';

// props & logic
import type {SearchProps} from '../../../utils/types';
import { StatusBarHeight } from '../../logics/StatusbarHeight';

// components
import RecentSearchItem from '../../components/RecentSearchItem';
import CharacterItem from '../../components/CharacterItem';
import PostingItem from '../../components/PostingItem';
import EpisodeMiniItem from '../../components/EpisodeMiniItem';
import { onChange } from 'react-native-reanimated';

const HEADER_MAX_HEIGHT = 95;
const HEADER_MIN_HEIGHT = 60;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

export default function SearchScreen({navigation} : SearchProps){
    // dummy data - 서버에서 불러와야 함.
    let oneData=['김guswlej', '현', '지', '현', '지', '현', '지', '현', '지', '현', '지', '현', '지'];
    let Data=[1,2,3,4,5,6,7,8,9];

    const[focus, setFocus]=useState(0);

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
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <area.Container>
          <Animated.View
            pointerEvents="none"
            style={[styles.header,{ opacity: OpacityHeader }]}>
          </Animated.View>
          <View style={{marginTop:30, marginHorizontal:30}}>
            <Animated.View style={[styles.searchView, searchColor, {transform:[{translateY: TranslateInput}]}]}>
              <View style={{marginLeft: 18, marginRight:10}}>
                {focus===1 ? <SearchViewFocusSvg w='15' h='15'/> : <SearchViewSvg w='15' h='15'/>}
              </View>
              <View style={{flex:1}}>
                <TextInput placeholder="무엇이 궁금한가요?" onFocus={()=>setFocus(1)}/>
              </View>
            </Animated.View>
          </View>
          <Animated.ScrollView 
            style={{marginTop:HEADER_MIN_HEIGHT-30}}
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={1}
            onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scroll } } }],
            { useNativeDriver: false })}>
          <View style={{paddingTop:30+12}}/>
          <View style={{marginLeft : 30}}>

              <View>
                <text.Subtitle3 color={colors.black}>최근 검색어</text.Subtitle3>
                <FlatList
                  style={{marginTop:12}}
                  data={oneData}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  renderItem={(obj)=>{
                    return(
                      <RecentSearchItem content={obj.item}/>
                    ); 
                  }}>
                </FlatList>
              </View>

              <View style={{marginTop:40}}>
                <text.Subtitle3 color={colors.black}>인기 부캐</text.Subtitle3>
                <FlatList
                  style={{marginTop:12}}
                  data={Data}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  renderItem={(obj)=>{
                    return(
                      <CharacterItem/>
                    ); 
                  }}></FlatList>
              </View>

              <Animated.View style={{marginTop:40}}>
                <text.Subtitle3 color={colors.black}>인기 에피소드</text.Subtitle3>
                <FlatList
                  style={{marginTop:12}}
                  data={Data}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  renderItem={(obj)=>{
                    return(
                      <EpisodeMiniItem navigation={navigation}/>
                    ); 
                  }}></FlatList>
              </Animated.View>

          </View>

          <area.ContainerBlank30 style={{marginTop:10}}>
            <text.Subtitle3 color={colors.black}>인기 게시물</text.Subtitle3>
            <FlatList
              style={{marginTop:12}}
              data={Data}
              showsVerticalScrollIndicator={false}
              renderItem={(obj)=>{
                return(
                  <PostingItem navigation={navigation}/>
                ); 
              }}></FlatList>
          </area.ContainerBlank30>
          </Animated.ScrollView>
        </area.Container>
      </TouchableWithoutFeedback>
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