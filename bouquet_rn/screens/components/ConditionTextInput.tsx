import React, {useState} from 'react';
import { View } from 'react-native';
import {colors} from '../../styles/colors';
import * as input from '../../styles/styled-components/input';
import * as text from '../../styles/styled-components/text';

import {getByte} from '../logics/Calculation';
import WarningText from '../components/WarningText';

interface ConditionTextInputProps{
  height: number,
  placeholder : string, 
  onChange:any, 
  keyboard:any, 
  active : boolean,
  value : string,
  warnText : string,
  conditions? : any,
  byte? : number
}
export default function ConditionTextInput({height, placeholder, onChange, keyboard, active, value, warnText, conditions, byte} : ConditionTextInputProps){
  const[IsFocus, setFocus]=useState(false);
  return(
    <View style={{marginBottom:16}}>
      <input.FormInput height={height} placeholder={placeholder} onChangeText={(input)=>onChange(input)} keyboardType={keyboard} value={value}
      onFocus={()=>setFocus(true)}
      style={ active && IsFocus ? {borderWidth:1, borderColor:colors.warning_red} : null}/>
      <View style={{alignItems:'flex-start', flexDirection:'row'}}>
        <View style={{flex:1}}>
          {active && IsFocus? <WarningText content={warnText} marginTop={8}/> : null}
          {conditions ? conditions : null}
        </View>
        {byte ? <text.Caption color={colors.gray6} style={{marginTop:8}}>{getByte(value)} / {byte} byte</text.Caption> : null}
      </View>
    </View>
  )
}