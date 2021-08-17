import React, {Component, useState} from 'react';
import {
    View,
} from 'react-native';
import i18n from 'i18n-js';
import { useNavigation, useRoute } from '@react-navigation/native';

import {colors} from '../../styles/colors';
import * as area from '../../styles/styled-components/area';
import * as text from '../../styles/styled-components/text';
import * as button from '../../styles/styled-components/button';
import * as elses from '../../styles/styled-components/elses';

// props & logic
import * as cal from '../logics/Calculation';
import { Character } from '../../utils/types';
import useCharacterView from '../logics/useCharacterView';
import { followCharacterAsync } from '../logics/Character';

// components
import ProfileInfoText from '../components/ProfileInfoText';
import ProfileButton from './ProfileButton';
import ProfileInfoTag from './ProfileInfoTag';
import LineButton from './LineButton';

export default function ProfileDetailItem({mini, press, id, character} : {mini:number, press:number, id:number, character: Character}){
  const navigation = useNavigation();
  const [viewCharacter, setViewCharacterId] = useCharacterView();
  const[owner, setOwner]=useState(true);

  const goProfileDetail=()=>{
    setViewCharacterId(character.id);
    navigation.navigate('ProfileItem');
  }
  const goChaModification=()=>{
    navigation.navigate('ProfileModification', {modify : 1});
  }
  const goChaDeletion=()=>{
    navigation.navigate('ProfileDeletion');
  }

async function follow() {
  const result = await followCharacterAsync(character.id, character.id);
  return result;
}

  return(
      <button.ProfileDetailButton activeOpacity={1} onPress={mini===1 ? goProfileDetail : ()=>{}}>
        <View style={{alignItems:'center', justifyContent:'center'}}>
          <elses.CircleImg diameter={120} source={{ uri: character.profileImg }}/>
          <View style={{marginTop:8}}/>
          <text.Subtitle2B color={colors.black}>{character.name}</text.Subtitle2B>
          <View style={{marginTop:8}}/>
          <text.Body2R color={colors.gray5}>{character.intro}</text.Body2R>
        </View>

        {mini===1 ? <View style={{marginTop:34}}/> :
        <View style={{marginTop:8, alignItems:'center'}}>
          {owner ?
          <area.RowArea>
            <LineButton press={goChaModification} content={i18n.t("정보 수정")} color={colors.primary} incolor={colors.alpha20_primary} outcolor={'transparent'}/>
            <View style={{marginLeft:8}}/>
            <LineButton press={goChaDeletion} content={i18n.t("삭제")} color={colors.warning_red} incolor={colors.alpha20_primary} outcolor={'transparent'}/>
          </area.RowArea>:
          <LineButton press={follow} content={i18n.t("팔로우")} color={colors.primary} incolor={colors.alpha20_primary} outcolor={'transparent'}/>}
          <area.RowArea style={{justifyContent:'center', marginTop:8, marginBottom:24}}>
            <ProfileInfoText bold={cal.numName(1200).toString()} regular={i18n.t("팔로워")} color={colors.primary} center={1}/>
            <View style={{marginRight:32}}/> 
            <ProfileInfoText bold="321" regular={i18n.t("팔로우")} color={colors.primary} center={1}/>
          </area.RowArea>
          <area.RowArea style={{marginBottom:24}}>
            <ProfileButton diameter={20} account={1}/>
            <text.Body2R color={colors.black}>{i18n.t('의')} {i18n.t('캐릭터')}</text.Body2R>
          </area.RowArea>
        </View>
        }

        <area.RowArea style={{justifyContent:'center'}}>
          <View style={{flex:1}}><ProfileInfoText bold={i18n.t("직업")} regular={character.job} color={colors.black} center={1}/></View>
          <View style={{flex: mini===1 ? 1.5 :1}}><ProfileInfoText bold={i18n.t("생년월일")} regular={`${character.birth}`} color={colors.black} center={1}/></View>
          <View style={{flex:1}}><ProfileInfoText bold={i18n.t("국적")} regular={character.nationality} color={colors.black} center={1}/></View>
        </area.RowArea>
        <View style={{marginTop:16, flexWrap:'wrap'}}/>
        <ProfileInfoTag title={i18n.t("좋아하는 것")} tags={character.likes}/>
        <View style={{marginTop:16, flexWrap:'wrap'}}/>
        <ProfileInfoTag title={i18n.t("싫어하는 것")} tags={character.hates}/>
        <View style={{marginTop:16}}/>
        <ProfileInfoText bold={i18n.t("특이사항")} regular={character.tmi} color={colors.black} center={0}/>
      </button.ProfileDetailButton>
  );
}