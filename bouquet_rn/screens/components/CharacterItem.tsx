import React, {Component, useState} from 'react';
import {View, } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {colors} from '../../styles/colors';
import * as button from '../../styles/styled-components/button';
import * as text from '../../styles/styled-components/text';
import * as elses from '../../styles/styled-components/elses';
import { Character } from '../../utils/types';
import useCharacterView from '../logics/useCharacterView';


export default function CharacterItem({press, id, character}  :{press:number, id?:number, character: Character}){
  const navigation = useNavigation();
  const [viewCharacter, setViewCharacter] = useCharacterView();
  const goProfileDetail=()=>{
    if (character.id !== -1) setViewCharacter(character.id);
    else setViewCharacter(character.name);
    navigation.navigate('ProfileItem');
  }
  return(
    <button.MiniListButton isWidth={true} height={200} color={colors.white} paddingH={18} paddingV={18} 
    style={{alignItems:'center', marginRight:10}} activeOpacity={1} onPress={goProfileDetail}>
      <elses.CircleImg diameter={100} source={require('../../assets/img.jpg')}/>
      <View style={{marginVertical:8}}><text.Body2B color={colors.black}>{character.name}</text.Body2B></View>
      <text.Caption color={colors.black} numberOfLines={2}>{character.intro}</text.Caption>
    </button.MiniListButton>
  );
}