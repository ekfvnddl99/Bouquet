import React from 'react';
import {View} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../styles/colors';
import * as text from '../../styles/styled-components/text';
import * as area from '../../styles/styled-components/area';


// components
import ConditionButton from './ConditionButton';

interface SelectTemplateProps{
  name:string,
  explain:string,
  svg:any,
  select:number,
  setSelect:Function,
  id:number
}
export default function SelectTemplateItem({name, explain, svg, select, setSelect, id} : SelectTemplateProps){
  const navigation = useNavigation();
  const goBack=()=>{
    navigation.goBack();
  }
  return(
    <View style={{marginBottom:24}}>
      <area.RowArea style={{marginBottom:12}}>
        <text.Subtitle3 color={colors.black}>{name}</text.Subtitle3>
        <View style={{flex:1}}/>
        <ConditionButton active={select===id ? 0 : 1} press={()=>[setSelect(id), goBack()]} height={22} paddingH={12} paddingV={4} 
        content={select===id ? "선택한 템플릿" : "선택"}/>
      </area.RowArea>
      <text.Caption color={colors.gray6} style={{marginBottom:12}}>{explain}</text.Caption>
      {svg}
    </View>
  );
}