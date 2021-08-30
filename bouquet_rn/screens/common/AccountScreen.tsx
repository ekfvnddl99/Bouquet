import React, {Component, useState, useRef, useEffect, useCallback, useMemo} from 'react';
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
import { StatusBarHeight } from '../../logics/non-server/StatusbarHeight';
import * as cal from '../../logics/non-server/Calculation';
import useUser from '../../logics/useUser';
import { characterListState, noCharacter, viewUserState } from '../../logics/atoms';
import useCharacter from '../../logics/hooks/useCharacter';
import { useRecoilState } from 'recoil';
import { Character } from '../../utils/types/types';
import useUserView from '../../logics/useUserView';

// components
import BackButton from '../../components/button/BackButton';
import ProfileChaItem from '../../components/item/ProfileChaItem';
import ProfileInfoText from '../../components/text/ProfileInfoText';

const HEADER_MAX_HEIGHT = 80;
const HEADER_MIN_HEIGHT = 60;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

export default function AccountScreen(){
  const [characterList, setCharacterList] = useRecoilState(characterListState);
  const [character, setCharacter] = useCharacter();
  const[selectId, setSelectId]=useState(-1);
  const[chaList, setChaList]=useState<Character[]>(characterList);
  const[numOfCha, setNumOfCha]=useState(0);
  const [viewUser, setViewUser, isMe] = useUserView();
  const [user, setUser] = useUser();
  useEffect(()=>{
    console.log("qqqqqq", viewUser);
    setNumOfCha(characterList.length)
    if(chaList.length%2===1) setChaList([...chaList, noCharacter]);
  }, []);

  const scroll = useRef(new Animated.Value(0)).current;
  const OpacityHeader=scroll.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE/2, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 0.5, 1],
    extrapolate: 'clamp',
  });

  const getTotalFollowers = useCallback(() => {
    let cnt = 0;
    if (isMe) {
      for (const ch of characterList) {
        cnt += ch.num_followers ? ch.num_followers : 0;
      }
    }
    else {
      for (const ch of viewUser.characters) {
        cnt += ch.num_followers ? ch.num_followers : 0;
      }
    }
    return cnt;
  }, [isMe, characterList, viewUser]);
  const totalFollowers = useMemo(() => getTotalFollowers(), [getTotalFollowers]);
  
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
            <elses.CircleImg diameter={120} source={{uri: isMe ? user.profileImg : viewUser.profileImg}}/>
            <text.Subtitle2B color={colors.black} style={{marginVertical:8}}>{isMe ? user.name : viewUser.name}</text.Subtitle2B>
            <area.RowArea style={{justifyContent:'center'}}>
              <ProfileInfoText bold={cal.numName(totalFollowers).toString()} regular={i18n.t("팔로워")} color={colors.primary} center={1}/>
              <View style={{marginRight:32}}/>
              <ProfileInfoText bold={isMe ? characterList.length.toString() : viewUser.characters.length.toString()} regular={i18n.t("캐릭터")+(i18n.locale==='en' ? 's' : '')} color={colors.primary} center={1}/>
            </area.RowArea>
          </area.NoHeightArea>

          <text.Subtitle3 color={colors.black} style={{marginBottom:16}}>{i18n.t('캐릭터')}</text.Subtitle3>

          <area.RowArea style={{marginBottom:12}}>
            <text.Body2R color={colors.black}>{i18n.t('총')} </text.Body2R>
            <text.Body2B color={colors.black}>{isMe ? characterList.length.toString() : viewUser.characters.length.toString()}</text.Body2B>
            <text.Body2R color={colors.black}>{i18n.t('명')}</text.Body2R>
          </area.RowArea>
          <FlatList
              columnWrapperStyle={{justifyContent:'space-between'}}
              contentContainerStyle={{justifyContent:'center',}}
              data={isMe ? characterList : viewUser.characters}
              keyExtractor={(item) => item.name.toString()}
              numColumns={2}
              showsHorizontalScrollIndicator={false}
              renderItem={(obj)=>{
                return(
                  <View style={{ flex:0.5, marginBottom:13, marginHorizontal:8}}>
                    {obj.item.name==='' ? <View/>
                    : 
                    <TouchableWithoutFeedback onPress={()=>setSelectId(obj.index)}>
                      <ProfileChaItem name={obj.item.name} profile={obj.item.profileImg} introduction={obj.item.intro} idx={obj.index} select={selectId} press={setSelectId} account={true} id={obj.item.id}/>
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