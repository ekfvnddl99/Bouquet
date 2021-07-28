import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {colors} from '../../styles/colors';
import * as area from '../../styles/styled-components/area';
import * as text from '../../styles/styled-components/text';

export default function NotLoginPrimaryButton(){
  return(
    <TouchableOpacity>
      <View style={{backgroundColor:colors.primary, height:40, alignItems:'center', justifyContent:'center', flexDirection:'row'}}>
        <text.Button2R color={colors.white}>여기를 눌러 </text.Button2R>
        <text.Button2B color={colors.white}>캐릭터</text.Button2B>
        <text.Button2R color={colors.white}>를 만들어 보세요!</text.Button2R>
      </View>
    </TouchableOpacity>
  );
}