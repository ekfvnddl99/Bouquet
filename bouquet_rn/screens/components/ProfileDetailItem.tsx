import React, {Component, useState} from 'react';
import {
    View,
} from 'react-native';
import {colors} from '../../styles/colors';
import * as area from '../../styles/styled-components/area';
import * as text from '../../styles/styled-components/text';
import * as button from '../../styles/styled-components/button';
import * as elses from '../../styles/styled-components/elses';

// components
import ProfileInfoText from '../components/ProfileInfoText';
import ProfileButton from './ProfileButton';
import ProfileInfoTag from './ProfileInfoTag';

export default function ProfileDetailItem({mini, press, id} : {mini:number, press:number, id:number}){
  return(
      <button.ProfileDetailButton activeOpacity={1}>
        <View style={{alignItems:'center', justifyContent:'center'}}>
          <elses.Circle diameter={120}/>
          <View style={{marginTop:8}}/>
          <text.Subtitle2B color={colors.black}>이름</text.Subtitle2B>
          <View style={{marginTop:8}}/>
          <text.Body2R color={colors.gray5}>설명</text.Body2R>
        </View>

        {mini===1 ? <View style={{marginTop:34}}/> :
        <View style={{marginTop:8, alignItems:'center'}}>
          <button.LineButton color={colors.primary} height={22} paddingH={12} paddingV={4}>
            <text.Button3 color={colors.primary}>팔로우</text.Button3>
          </button.LineButton>
          <area.RowArea style={{justifyContent:'center', marginTop:8, marginBottom:24}}>
            <ProfileInfoText bold="321" regular="팔로워" color={colors.primary} center={1}/>
            <View style={{marginRight:32}}/>
            <ProfileInfoText bold="321" regular="게시글" color={colors.primary} center={1}/>
          </area.RowArea>
          <area.RowArea style={{marginBottom:24}}>
            <ProfileButton diameter={20}/>
            <text.Body2R color={colors.black}>의 캐릭터</text.Body2R>
          </area.RowArea>
        </View>
        }

        <area.RowArea style={{justifyContent:'center'}}>
          <ProfileInfoText bold="직업" regular="대학생" color={colors.black} center={1}/>
          <View style={{flex:1}}><ProfileInfoText bold="생년월일" regular="123" color={colors.black} center={1}/></View>
          <ProfileInfoText bold="국적" regular="123" color={colors.black} center={1}/>
        </area.RowArea>
        <View style={{marginTop:16}}/>
        <ProfileInfoTag title="좋아하는 것" tags={['1','2']}/>
        <View style={{marginTop:16}}/>
        <ProfileInfoTag title="싫어하는 것" tags={['1','2']}/>
        <View style={{marginTop:16}}/>
        <ProfileInfoText bold="특이사항" regular="231" color={colors.black} center={0}/>
      </button.ProfileDetailButton>
  );
}