import React from 'react';
import {View} from 'react-native';
import * as text from '../../styles/styled-components/text';

export default function ProfileInfoText({bold, regular, color, center} : {bold : string, regular : string, color:string, center:number}){
  return(
    <View style={center===1 ? {alignItems:'center'} : null}>
      <text.Body2B color={color}>{bold}</text.Body2B>
      <text.Body2R color={color}>{regular}</text.Body2R>
    </View>
  );
}