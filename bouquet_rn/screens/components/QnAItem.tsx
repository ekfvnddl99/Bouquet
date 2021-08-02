import React from 'react';
import {View, TextInput} from 'react-native';
import {colors} from '../../styles/colors';
import * as area from '../../styles/styled-components/area';
import * as text from '../../styles/styled-components/text';

// props & logic
import * as cal from '../logics/Calculation';

// components
import ProfileButton from './ProfileButton';
import QuestionItem from './QuestionItem';
import SunButton from './SunButton';

export default function QnAItem(){
  return(
    <View style={{paddingHorizontal:10, paddingVertical:10, backgroundColor:colors.white, borderRadius:10, marginBottom:10}}>
      <area.RowArea style={{marginBottom:10}}>
        <View style={{flex:1}}><ProfileButton diameter={30}/></View>
        <text.Caption color={colors.gray5}>{cal.timeName(57)} 전</text.Caption>
      </area.RowArea>
      <QuestionItem/>
      <View style={{borderWidth:1, borderColor:colors.gray5, marginBottom:10, marginHorizontal:10}}/>
      <text.Body2R color={colors.black} style={{marginBottom:10, paddingHorizontal:10, paddingVertical:10}}>이건 답변이야.</text.Body2R>
      <View style={{alignItems:'flex-start'}}><SunButton sun={12}/></View>
    </View>
  );
}