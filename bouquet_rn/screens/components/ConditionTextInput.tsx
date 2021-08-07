import React from 'react';
import {colors} from '../../styles/colors';
import * as input from '../../styles/styled-components/input';
import * as text from '../../styles/styled-components/text';

export default function ConditionTextInput({height, placeholder, onChange, keyboard, active, value} : {height: number,placeholder : string, onChange:any, keyboard:any, active : number, value?: string}){
  return(
    <input.FormInput height={height} placeholder={placeholder} onChangeText={(input)=>onChange(input)} keyboardType={keyboard}
    style={active===0 ? null : {borderWidth:1, borderColor:colors.warning_red}}
    value={value ? value : undefined}/>
  );
}