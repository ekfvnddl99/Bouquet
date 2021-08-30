import React, { useState, useRef } from 'react';
import {View, TouchableOpacity, Pressable, Animated, Easing, PanResponder} from 'react-native';
import {colors} from '../../styles/colors';
import * as area from '../../styles/styled-components/area';
import * as text from '../../styles/styled-components/text';
import * as elses from '../../styles/styled-components/elses';

// components
import ProfileButton from '../button/ProfileButton';

const TOGGLE = 20;
export default function SettingToggleItem(){
  const[on, setOn]=useState(-1);

  const drag = useRef(new Animated.Value(0)).current;
  const TranslateXa = drag.interpolate({
    inputRange: [-1, 0],
    outputRange: [0, TOGGLE],
    extrapolate: 'clamp',
  });
  const TranslateXb = drag.interpolate({
    inputRange: [0, 1],
    outputRange: [0, TOGGLE],
    extrapolate: 'clamp',
  });

  function Toggle({on, press} : {on : number, press:any}){
    return(
      <View style={{flexDirection:'row', alignItems:'center'}}>
        <TouchableOpacity onPress={()=>press(on*(-1))}>
          <View style={{backgroundColor:colors.gray0, borderRadius:10, width:40, height:20}}>
            <Animated.View
            style={[{backgroundColor: on===1 ? colors.primary : colors.gray5, width:20, height:20, borderRadius:20/2}, 
            {transform : [{translateX: on===1 ? TranslateXb : TranslateXa}]}]}/>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  return(
    <View style={{paddingVertical:8, paddingHorizontal:8}}>
      <area.RowArea>
        <ProfileButton diameter={20}/>
        <View style={{flex:1}}/>
        <Toggle on={on} press={setOn}/>
      </area.RowArea>
    </View>
  );
}