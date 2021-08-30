import React from 'react';
import {View} from 'react-native';
import {colors} from '../../styles/colors';
import * as text from '../../styles/styled-components/text';

export default function WarningText({content, marginTop} : {content:string | undefined, marginTop:number}){
  return(
    <View style={{marginTop: marginTop}}><text.Caption color={colors.warning_red}>{content}</text.Caption></View>
  );
}