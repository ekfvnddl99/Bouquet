import React from 'react';
import {View, TextInput, TouchableWithoutFeedback} from 'react-native';
import i18n from 'i18n-js';
import { useNavigation } from '@react-navigation/native';
import {colors} from '../../styles/colors';
import * as area from '../../styles/styled-components/area';
import * as text from '../../styles/styled-components/text';

// props & logic
import * as cal from '../logics/Calculation';

// components
import ProfileButton from './ProfileButton';
import QuestionItem from './QuestionItem';
import SunButton from './SunButton';
import useCharacter from '../logics/useCharacter';

export default function QnAItem({q,a}:{q:string, a:string}){
  const navigation = useNavigation();
  const [character, setCharacter]=useCharacter();
  const goPosting=()=>{
    navigation.navigate('Posting');
  }
  return(
    <TouchableWithoutFeedback onPress={goPosting}>
    <View style={{paddingHorizontal:10, paddingVertical:10, backgroundColor:colors.white, borderRadius:10, marginBottom:10}}>
      <area.RowArea style={{marginBottom:10}}>
        <View style={{flex:1}}><ProfileButton diameter={30} account={0} name={character.name} profile={character.profileImg}/></View>
        <text.Caption color={colors.gray5}>{cal.timeName(57)} {i18n.t('전')}</text.Caption>
      </area.RowArea>
      <QuestionItem q={q}/>
      <View style={{borderWidth:1, borderColor:colors.gray5, marginBottom:10, marginHorizontal:10}}/>
      <text.Body2R color={colors.black} style={{marginBottom:10, paddingHorizontal:10, paddingVertical:10}}>{a}</text.Body2R>
      <View style={{alignItems:'flex-start'}}><SunButton sun={0} active={false}/></View>
    </View>
    </TouchableWithoutFeedback>
  );
}