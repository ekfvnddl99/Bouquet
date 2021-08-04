import React, {Component, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableWithoutFeedback
} from 'react-native';
import {colors} from '../../styles/colors';
import * as area from '../../styles/styled-components/area';
import * as text from '../../styles/styled-components/text';
import * as elses from '../../styles/styled-components/elses';

// props & logic
import type {ChaGenerationProps, SettingProps} from '../../utils/types';

// components
import SettingItem from '../components/SettingItem';
import BackButton from '../components/BackButton';
import SettingToggleItem from '../components/SettingToggleItem';
import ProfileItem from '../components/ProfileItem';

function setTitle(idx:number){
  let title="";
  if(idx===0) title="팔로우하는 캐릭터의 새 글";
  else if(idx===1) title="내 글이 받은 햇빛";
  else if(idx===2) title="내 글에 달린 댓글";
  else title="다른 캐릭터가 나를 팔로우";
  return title;
}

export default function SettingAlarmCustomScreen({props}: {props : SettingProps}){
  let Data=[{id:1},{id:2},{id:3},{id:4},{id:5},{id:6},{id:7},{id:8},{id:9}];

  const[selectId, setSelectId]=useState(-1);

  return(
    <area.Container>
      <area.RowArea style={{paddingHorizontal:30, paddingVertical:16, marginBottom:20}}>
        <BackButton/>
        <View style={{flex:1}}/>
        <ProfileItem diameter={28}/>
      </area.RowArea>
      
      <View style={{paddingHorizontal:30}}>
        <text.Subtitle2B color={colors.black} style={{marginBottom:11}}>{setTitle(1)}</text.Subtitle2B>
        <area.NoHeightArea marBottom={0} paddingH={8} paddingV={8}>
          <FlatList
            data={Data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={(obj)=>{
              return(
                <TouchableWithoutFeedback onPress={()=>{selectId===obj.index ? setSelectId(-1) : setSelectId(obj.index)}}>
                  <SettingToggleItem/>
                </TouchableWithoutFeedback>
              ); 
            }}/>
        </area.NoHeightArea>
      </View>
    </area.Container>
  );
}