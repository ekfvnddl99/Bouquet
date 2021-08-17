import React, {useState} from 'react';
import {View, TextInput} from 'react-native';
import {colors} from '../../styles/colors';
import * as area from '../../styles/styled-components/area';
import * as text from '../../styles/styled-components/text';

import useCharacter from '../logics/useCharacter';

// components
import ProfileButton from './ProfileButton';
import LineButton from './LineButton';
import QuestionItem from './QuestionItem';
import ConditionButton from './ConditionButton';
import QnAItem from './QnAItem';

export default function QnATextInput(){
  const[upload, setUpload]=useState(false);
  const[answer, setAnswer]=useState('');
  const [character, setCharacter] = useCharacter();

  if(!upload){
    return(
      <area.NoHeightArea paddingH={10} paddingV={10} marBottom={10}>
        <area.RowArea style={{marginBottom:10}}>
          <View style={{flex:1}}><ProfileButton diameter={30} account={0} name={character.name} profile={character.profileImg}/></View>
          <LineButton press={()=>{}} content="질문 바꾸기" color={colors.black} incolor={colors.gray2} outcolor={'transparent'}/>
        </area.RowArea>
        <QuestionItem/>
        <View style={{borderWidth:1, borderColor:colors.gray5, marginBottom:10, marginHorizontal:10}}/>
        <TextInput placeholder="답변을 입력해 보세요." multiline={true} onChangeText={(input)=>setAnswer(input)}
        style={{marginBottom:10, paddingHorizontal:10, paddingVertical:10}}/>
        <View style={{alignItems:'flex-end'}}>
          <LineButton press={()=>setUpload(true)} content="올리기" color={colors.primary} incolor={colors.alpha20_primary} outcolor={'transparent'}/>
        </View>
      </area.NoHeightArea>
    );
  }
  else{
    return(
      // 여기로 질문이랑 답변 넘겨줘야 함!
      <QnAItem/>
    )
  }
}