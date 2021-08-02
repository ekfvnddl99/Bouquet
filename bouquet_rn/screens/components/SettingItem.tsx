import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {colors} from '../../styles/colors';
import * as area from '../../styles/styled-components/area';
import * as text from '../../styles/styled-components/text';

// icons
import ArrowRight from '../../assets/ArrowRight';

export default function SettingItem({content, press} : {content:string, press:any}){
  return(
    <TouchableOpacity onPress={press} style={{paddingVertical:8, paddingHorizontal:8}}>
      <area.RowArea>
        <text.Body2B color={colors.black} style={{flex:1}}>{content}</text.Body2B>
        <ArrowRight w='16' h='16'/>
      </area.RowArea>
    </TouchableOpacity>
  );
}