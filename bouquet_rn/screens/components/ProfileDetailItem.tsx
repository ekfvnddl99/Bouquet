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


export default function ProfileDetailItem({mini} : {mini:number}){
  return(
    <View>
      <button.ProfileDetailButton>
        <View style={{alignItems:'center', justifyContent:'center'}}>
          <elses.Circle diameter={120}/>
          <text.Subtitle2B color={colors.black}>이름</text.Subtitle2B>
          <text.Body2R color={colors.gray5}>설명</text.Body2R>
        </View>

        {mini===1 ? null :
        <area.RowArea style={{justifyContent:'center'}}>
          <ProfileInfoText bold="321" regular="팔로워" color={colors.primary} center={1}/>
          <ProfileInfoText bold="321" regular="게시글" color={colors.primary} center={1}/>
        </area.RowArea>
        }

        <area.RowArea style={{justifyContent:'center'}}>
          <ProfileInfoText bold="321" regular="직업" color={colors.black} center={1}/>
          <ProfileInfoText bold="321" regular="생년월일" color={colors.black} center={1}/>
          <ProfileInfoText bold="321" regular="국적" color={colors.black} center={1}/>
        </area.RowArea>
        <ProfileInfoText bold="좋아하는 것" regular="231" color={colors.black} center={0}/>
        <ProfileInfoText bold="싫어하는 것" regular="231" color={colors.black} center={0}/>
        <ProfileInfoText bold="특이사항" regular="231" color={colors.black} center={0}/>
      </button.ProfileDetailButton>
    </View>
  );
}