import React, {Component, useState, useRef, useEffect} from 'react';
import {
    ScrollView,
    FlatList,
    View,
    TouchableWithoutFeedback,
    StyleSheet,
    Animated,
} from 'react-native';
import i18n from 'i18n-js';
import {colors} from '../../styles/colors';
import * as area from '../../styles/styled-components/area';
import * as text from '../../styles/styled-components/text';
import * as elses from '../../styles/styled-components/elses';
import * as button from '../../styles/styled-components/button';

// props & logic
import { StatusBarHeight } from '../logics/StatusbarHeight';
import * as cal from '../logics/Calculation';
import useUser from '../logics/useUser';
import { characterListSelector, noCharacter } from '../logics/atoms';
import useCharacter from '../logics/useCharacter';
import { useRecoilValueLoadable } from 'recoil';
import { Character } from '../../utils/types';

// components
import BackButton from '../components/BackButton';
import ProfileChaItem from '../components/ProfileChaItem';
import ProfileInfoText from '../components/ProfileInfoText';

const HEADER_MAX_HEIGHT = 80;
const HEADER_MIN_HEIGHT = 60;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

export default function AccountScreen(){
  const [user, setUser] = useUser();
  const characterList = useRecoilValueLoadable(characterListSelector);
  const [character, setCharacter] = useCharacter();
  const[selectId, setSelectId]=useState(-1);
  const[chaList, setChaList]=useState<Character[]>([]);
  useEffect(()=>{
    setChaList(characterList.contents);
    if(chaList.length%2===1) chaList.push(noCharacter);
  }, []);

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
          <elses.CircleImg diameter={28} source={{uri:character.profileImg}}/>
        </area.RowArea>

        <Animated.ScrollView
          contentContainerStyle={{marginHorizontal:30}}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={1}
          onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scroll } } }],
          { useNativeDriver: true })}>
          <View style={{paddingTop: 20}}/>

          <area.NoHeightArea marBottom={30} paddingH={20} paddingV={20} style={{alignItems:'center'}}>
            <elses.CircleImg diameter={120} source={{uri:user.profileImg}}/>
            <text.Subtitle2B color={colors.black} style={{marginVertical:8}}>{user.name}</text.Subtitle2B>
            <area.RowArea style={{justifyContent:'center'}}>
              <ProfileInfoText bold={cal.numName(1200).toString()} regular={i18n.t("팔로워")} color={colors.primary} center={1}/>
              <View style={{marginRight:32}}/>
              <ProfileInfoText bold={chaList.length.toString()} regular={i18n.t("캐릭터")+(i18n.locale==='en' ? 's' : '')} color={colors.primary} center={1}/>
            </area.RowArea>
          </area.NoHeightArea>

          <text.Subtitle3 color={colors.black} style={{marginBottom:16}}>{i18n.t('캐릭터')}</text.Subtitle3>

          <area.RowArea style={{marginBottom:12}}>
            <text.Body2R color={colors.black}>{i18n.t('총')} </text.Body2R>
            <text.Body2B color={colors.black}>{chaList[chaList.length-1] ? chaList.length-1 : chaList.length}</text.Body2B>
            <text.Body2R color={colors.black}>{i18n.t('명')}</text.Body2R>
          </area.RowArea>
          <FlatList
              columnWrapperStyle={{justifyContent:'space-between'}}
              contentContainerStyle={{justifyContent:'center',}}
              data={chaList}
              keyExtractor={(item) => item.name.toString()}
              numColumns={2}
              showsHorizontalScrollIndicator={false}
              renderItem={(obj)=>{
                return(
                  <View style={{ flex:0.5, marginBottom:13, marginHorizontal:8}}>
                    {obj.item.name==='' ? <View/>
                    : 
                    <TouchableWithoutFeedback onPress={()=>{selectId===obj.index ? setSelectId(-1) : setSelectId(obj.index)}}>
                      <ProfileChaItem name={obj.item.name} introduction={obj.item.intro} idx={obj.index} select={selectId} setSelect={setSelectId} account={true}/>
                    </TouchableWithoutFeedback>}
                  </View>
                ); }}/>
        </Animated.ScrollView>
      </area.Container>
  );
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