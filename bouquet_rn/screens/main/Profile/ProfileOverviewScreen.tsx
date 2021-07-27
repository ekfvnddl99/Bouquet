import React, {Component, useState} from 'react';
import {
    TouchableOpacity,
    View
} from 'react-native';
import {colors} from '../../../styles/colors';
import * as area from '../../../styles/styled-components/area';
import * as text from '../../../styles/styled-components/text';
import * as elses from '../../../styles/styled-components/elses';
import * as button from '../../../styles/styled-components/button';
import {atom, useRecoilState} from 'recoil';

// icons
import PlusSvg from '../../../assets/Plus';
import GridSvg from '../../../assets/Grid';
import SwipeSvg from '../../../assets/Swipe';

// components
import BgButton from '../../components/BackgroundButton';
import ProfileSwipeScreen from './ProfileSwipeScreen';
import ProfileGridScreen from './ProfileGridScreen';

export const pickCharacter=atom({
  key: 'character',
  default: -1
});


export default function ProfileOverviewScreen(){
  const[swipe, setSwipe] = useState(1);
  return(
    <area.Container>
      <area.RowArea>
        <View style={{flex:1}}><elses.Circle diameter={24}/></View>
        <PlusSvg w='24' h='24'/>
        {swipe===1 ? 
        <TouchableOpacity onPress={()=>setSwipe(0)}>
          <GridSvg w='24' h='24'/>
        </TouchableOpacity> :
        <TouchableOpacity onPress={()=>setSwipe(1)}>
          <SwipeSvg w='24' h='24'/>
        </TouchableOpacity>}
      </area.RowArea>

      <View style={{marginTop:50}}>
        {swipe===1 ? <ProfileSwipeScreen/> : <ProfileGridScreen/>}
      </View>
    </area.Container>
  )
}