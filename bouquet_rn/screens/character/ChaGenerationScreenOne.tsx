import React, {Component, useState, useEffect} from 'react';
import { View, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import {colors} from '../../styles/colors';
import * as area from '../../styles/styled-components/area';
import * as text from '../../styles/styled-components/text';
import * as elses from '../../styles/styled-components/elses';

// props & logic
import type {ChaGenerationProps} from '../../utils/types';

// components
import ProgressArea from '../components/ProgressArea';
import ConditionButton from '../components/ConditionButton';

export default function ChaGenerationScreenOne({modify, onChange, setImage} : {modify : number, onChange:any, setImage: Function}){
  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('이미지를 업로드하려면 권한이 필요해요.');
      }
    })();
  }, []);

  const onPress = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return(
    <area.ContainerBlank20>
      <View style={{alignItems:'center', marginBottom:32}}>
          <TouchableOpacity onPress={onPress}>
            <elses.CircleImg diameter={120} source={require('../../assets/img.jpg')}/>
          </TouchableOpacity>
      </View>
      <area.BottomArea style={{marginBottom:16}}>
        <ConditionButton height={44} active={1} press={onChange} content={modify===1 ? "기본 정보 수정" : "기본 정보 입력"} paddingH={0} paddingV={14}/>
      </area.BottomArea>
    </area.ContainerBlank20>
  );
}