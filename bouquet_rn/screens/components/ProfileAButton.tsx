import React from 'react';
import {View} from 'react-native';
import {colors} from '../../styles/colors';
import * as area from '../../styles/styled-components/area';
import * as elses from '../../styles/styled-components/elses';
import * as text from '../../styles/styled-components/text';

export default function ProfileAButton({name} : {name : string}){
  return(
    <area.RowArea top={0}>
      <elses.Circle radius={30} vertical={0}/>
      <View style={{marginLeft:8}}/>
      <text.Body2B color={colors.black}>{name}</text.Body2B>
    </area.RowArea>
  );
}