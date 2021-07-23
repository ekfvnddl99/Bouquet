import React from 'react';
import {
    TouchableOpacity
} from 'react-native';
import {colors} from '../../styles/colors';
import * as text from '../../styles/styled-components/text';

function conditionCase(level : number, content : string){
  if(level===1) return <text.Button2B color={colors.primary}>{content}</text.Button2B>;
  else if(level===2) return <text.Caption color={colors.primary}>{content}</text.Caption>;
  else return <text.Body2R color={colors.primary}>{content}</text.Body2R>;
}

export default function PrimaryTextButton({press, content, level} : {press: any, content : string, level: number}){
  return(
    <TouchableOpacity onPress={press}>
      {conditionCase(level, content)}
    </TouchableOpacity>
  );
}