import React from 'react';
import {View} from 'react-native';
import {colors} from '../../styles/colors';
import * as area from '../../styles/styled-components/area';
import * as text from '../../styles/styled-components/text';

// components
import TagItem from './TagItem';

export default function ProfileInfoTag({title, tags} : {title : string, tags : string[]}){
  const list = tags.map((tag)=><TagItem content={tag} active={1}/>)
  return(
    <View>
      <text.Body2B color={colors.black}>{title}</text.Body2B>
      <area.RowArea>{list}</area.RowArea>
    </View>
  );
}