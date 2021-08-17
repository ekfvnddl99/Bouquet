import React, {Component, useState, useEffect} from 'react';
import {
    View,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard,
    BackHandler
} from 'react-native';
import i18n from 'i18n-js';
import { useNavigation, useRoute } from '@react-navigation/native';
import {colors} from '../../styles/colors';
import * as area from '../../styles/styled-components/area';
import * as button from '../../styles/styled-components/button';
import * as text from '../../styles/styled-components/text';
import * as input from '../../styles/styled-components/input';
import * as elses from '../../styles/styled-components/elses';

// components
import ProfileItem from '../components/ProfileItem';
import BackButton from '../components/BackButton';

// props & logic
import { deleteCharacterAsync } from '../logics/Character';
import { characterState } from '../logics/atoms';
import { useRecoilValue } from 'recoil';

// screens
import ChaDeletionScreenOne from './ChaDeletionScreenOne';
import ChaDeletionScreenTwo from './ChaDeletionScreenTwo';

function setTitle(step:number){
  if(step===1) return i18n.t("캐릭터 삭제");
  else return i18n.t("캐릭터 삭제 완료");
}

export default function ChaDeletionScreen(){
  const[step, setStep]=useState(1);
  const navigation = useNavigation();

  const character = useRecoilValue(characterState);

  async function deleteCharacter(){
    const result = await deleteCharacterAsync(character.id);
    if(result===true) setStep(step+1);
    else alert(result);
  }
  return(
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <area.Container>
        <area.RowArea style={{paddingHorizontal:30, paddingVertical:16}}>
          {step===1 ? <BackButton/> : null}
          <View style={{flex:1}}/>
          <ProfileItem diameter={28}/>
        </area.RowArea>
        <area.ContainerBlank20>
          <text.Subtitle1 color={colors.black} style={{marginBottom:32}}>{setTitle(step)}</text.Subtitle1>
          {step===1 ? <ChaDeletionScreenOne profile={character.profileImg} name={character.name} onChange={deleteCharacter}/> :
          <ChaDeletionScreenTwo profile={character.profileImg} name={character.name} navigation={navigation}/>}
        </area.ContainerBlank20>
      </area.Container>
    </TouchableWithoutFeedback>
  );
}
