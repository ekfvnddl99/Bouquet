import React, {Component, useState, useEffect} from 'react';
import {
    View,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard,
    BackHandler
} from 'react-native';
import {colors} from '../../styles/colors';
import * as area from '../../styles/styled-components/area';
import * as button from '../../styles/styled-components/button';
import * as text from '../../styles/styled-components/text';
import * as input from '../../styles/styled-components/input';
import * as elses from '../../styles/styled-components/elses';

// components
import ProgressArea from '../components/ProgressArea';
import ConditionButton from '../components/ConditionButton';
import PrimaryTextButton from '../components/PrimaryTextButton';
import WarningText from '../components/WarningText';
import ConditionTextInput from '../components/ConditionTextInput';
import LineButton from '../components/LineButton';
import BackButton from '../components/BackButton';

// screens
import ChaDeletionScreenOne from './ChaDeletionScreenOne';
import ChaDeletionScreenTwo from './ChaDeletionScreenTwo';

function setTitle(step:number){
  if(step===1) return "캐릭터 삭제";
  else return "캐릭터 삭제 완료";
}

export default function ChaDeletionScreen(){
  const[step, setStep]=useState(1);

  return(
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <area.Container>
        <area.RowArea style={{paddingHorizontal:30, paddingVertical:16, marginBottom:20}}>
          <BackButton navigation={()=>{}}/>
          <View style={{flex:1}}/>
          <elses.CircleImg diameter={28} source={require('../../assets/img.jpg')}/>
        </area.RowArea>
        <text.Subtitle1 color={colors.black} style={{marginBottom:32}}>{setTitle(step)}</text.Subtitle1>

        {step===1 ? <ChaDeletionScreenOne onChange={()=>setStep(step+1)}/> :
        <ChaDeletionScreenTwo navigation={navigation}/>}
      </area.Container>
    </TouchableWithoutFeedback>
  );
}
