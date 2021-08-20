import React from 'react';
import {View} from 'react-native';
import {colors} from '../../styles/colors';
import * as text from '../../styles/styled-components/text';

export default function QuestionItem({q}:{q:string}){
  return(
    <View style={{paddingHorizontal:10, paddingVertical:10}}>
      <text.Subtitle2B color={colors.primary}>Q.</text.Subtitle2B>
      <text.Subtitle3 color={colors.black}>{q}</text.Subtitle3>
    </View>
  );
}