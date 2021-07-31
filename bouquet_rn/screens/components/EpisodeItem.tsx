import React, {Component, useState} from 'react';
import {View, FlatList} from 'react-native';
import {colors} from '../../styles/colors';
import * as area from '../../styles/styled-components/area';
import * as button from '../../styles/styled-components/button';
import * as text from '../../styles/styled-components/text';
import * as elses from '../../styles/styled-components/elses';

// components
import ProfileButton from './ProfileButton';
import TagItem from './TagItem';

function Inner(mini:number,){
  return(
    <View style={{flexDirection:'row'}}>
      {mini===1 ? <elses.RectangleImg width={90} height={117} source={require('../../assets/img.jpg')}/>
      : <elses.RectangleImg width={110} height={143} source={require('../../assets/img.jpg')}/>}
      <View style={{marginLeft:16}}>
        <text.Subtitle3 color={colors.black}>EjrqhRdl wjswod</text.Subtitle3>
        <area.RowArea style={{marginVertical:8}}>
          <TagItem content="크루참여" active={1}/>
          <TagItem content="전체공개" active={1}/>
        </area.RowArea>
        <ProfileButton diameter={30}/>
      </View>
    </View>
  );
}

export default function EpisodeItem({color, mini, press, id} : {color:string, mini:number, press:number, id:number}){
  return(
    <View>
      {color===colors.white 
      ? <button.BigListButton color={color} paddingH={16} paddingV={16}>{Inner(mini)}</button.BigListButton>
      : <View>{Inner(mini)}</View>}
    </View>
  );
}