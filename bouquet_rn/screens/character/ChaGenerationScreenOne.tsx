import React, {Component, useState, useEffect} from 'react';
import { View, TouchableOpacity } from 'react-native';
import i18n from 'i18n-js';
import * as ImagePicker from 'expo-image-picker';

import {colors} from '../../styles/colors';
import * as area from '../../styles/styled-components/area';
import * as text from '../../styles/styled-components/text';
import * as elses from '../../styles/styled-components/elses';

// icons
import GallerySvg from '../../assets/Gallery';

// props & logic
import type {ChaGenerationProps, Character} from '../../utils/types';

// components
import ProgressArea from '../components/ProgressArea';
import ConditionButton from '../components/ConditionButton';

export default function ChaGenerationScreenOne({modify, onChange, characterToCreate, setCharacterToCreate} : {modify : number, onChange:any, characterToCreate: Character, setCharacterToCreate: Function}){
  const[IsOK, setIsOK]=useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('이미지를 업로드하려면 권한이 필요해요.');
      }
    })();
  }, []);
  useEffect(()=>{
    if(characterToCreate.profileImg) setIsOK(true);
  })

  const onPress = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setCharacterToCreate({
        ...characterToCreate,
        profileImg: result.uri
      });
    }
  };

  return(
    <area.ContainerBlank20>
      <View style={{alignItems:'center', justifyContent:'center', flex:1}}>
        <TouchableOpacity onPress={()=>onPress()}>
        {characterToCreate.profileImg ? <elses.CircleImg diameter={180} source={{ uri: characterToCreate.profileImg }}/>
          : <elses.Circle diameter={180}><GallerySvg w='24' h='24'/></elses.Circle>}
        </TouchableOpacity>
      </View>
      <area.BottomArea style={{marginBottom:16}}>
      <ConditionButton height={44} active={IsOK} press={IsOK ? onChange : ()=>{}} content={modify===1 ? i18n.t("기본 정보 수정") : i18n.t("기본 정보 입력")} paddingH={0} paddingV={14}/>
      </area.BottomArea>
    </area.ContainerBlank20>
  );
}