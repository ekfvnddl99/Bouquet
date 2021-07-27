import React, {Component, useState} from 'react';
import {View} from 'react-native';
import {colors} from '../../styles/colors';
import * as button from '../../styles/styled-components/button';
import * as text from '../../styles/styled-components/text';
import * as elses from '../../styles/styled-components/elses';


export default function CharacterItem(){
    return(
      <button.MiniListButton color={colors.white} paddingH={18} paddingV={18} style={{alignItems:'center', marginRight:10}} activeOpacity={1}>
          <elses.CircleImg diameter={100} source={require('../../assets/img.jpg')}/>
          <View style={{marginVertical:8}}><text.Body2B color={colors.black}>eksghgo</text.Body2B></View>
          <text.Caption color={colors.black}>ws</text.Caption>
      </button.MiniListButton>
    );
}