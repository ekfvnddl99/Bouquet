import React, {Component, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableWithoutFeedback
} from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import {colors} from '../../styles/colors';
import * as area from '../../styles/styled-components/area';
import * as text from '../../styles/styled-components/text';
import * as elses from '../../styles/styled-components/elses';

// props & logic
import type {ChaGenerationProps, SettingProps} from '../../utils/types/types';

// components
import SettingItem from '../../components/item/SettingItem';
import BackButton from '../../components/button/BackButton';
import SettingToggleItem from '../../components/item/SettingToggleItem';
import ProfileItem from '../../components/item/ProfileItem';

type ParamList = {
  SettingAlarm: {
    title: string;
  };
};
export default function SettingAlarmCustomScreen({props}: {props : SettingProps}){
  let Data=[{id:1},{id:2},{id:3},{id:4},{id:5},{id:6},{id:7},{id:8},{id:9}];

  const[selectId, setSelectId]=useState(-1);
  const route=useRoute<RouteProp<ParamList, 'SettingAlarm'>>();
  const title : string = route.params?.title;

  return(
    <area.Container>
      <area.RowArea style={{paddingHorizontal:30, paddingVertical:16, marginBottom:20}}>
        <BackButton/>
        <View style={{flex:1}}/>
        <ProfileItem diameter={28}/>
      </area.RowArea>
      
      <View style={{paddingHorizontal:30}}>
        <text.Subtitle2B color={colors.black} style={{marginBottom:11}}>{title}</text.Subtitle2B>
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