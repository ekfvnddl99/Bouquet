import React, {useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {colors} from '../../styles/colors';
import * as area from '../../styles/styled-components/area';
import * as text from '../../styles/styled-components/text';
import { HomeProps } from '../../utils/types';

export default function NotLoginPrimaryButton({press} : any){
  const[color, setColor]=useState(colors.primary);
  return(
    <TouchableOpacity activeOpacity={1} onPressIn={()=>setColor(colors.pressed_primary)} onPressOut={()=>setColor(colors.primary)}
    onPress={press}>
      <View style={{backgroundColor:color, height:40, alignItems:'center', justifyContent:'center', flexDirection:'row'}}>
        <text.Button2R color={colors.white}>여기를 눌러 </text.Button2R>
        <text.Button2B color={colors.white}>캐릭터</text.Button2B>
        <text.Button2R color={colors.white}>를 만들어 보세요!</text.Button2R>
      </View>
    </TouchableOpacity>
  );
}