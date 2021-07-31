import React from 'react';
import {View} from 'react-native';
import { colors } from '../../styles/colors';
import * as text from '../../styles/styled-components/text';
import * as area from '../../styles/styled-components/area';

export default function SelectTemplateItem(){
  return(
    <View style={{marginBottom:24}}>
      <text.Subtitle3 color={colors.black} style={{marginBottom:12}}></text.Subtitle3>
      <text.Caption color={colors.gray6} style={{marginBottom:12}}></text.Caption>
    </View>
  );
}