import React from 'react';
import {TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as elses from '../../styles/styled-components/elses';
import useCharacterView from '../logics/useCharacterView';

export default function ProfileItem({diameter, picUrl, characterId} : {diameter:number, picUrl?: string, characterId?: number}){
  const [viewCharacter, setViewCharacterId] = useCharacterView();
  const navigation=useNavigation();
  const goProfile=()=>{
    if (characterId) setViewCharacterId(characterId);
    navigation.navigate("ProfileItem");
  }
  return(
    <TouchableOpacity activeOpacity={1} onPress={goProfile}>
      <elses.CircleImg diameter={diameter} source={picUrl ? { uri: picUrl } : require('../../assets/img.jpg')}/>
    </TouchableOpacity>
  );
}