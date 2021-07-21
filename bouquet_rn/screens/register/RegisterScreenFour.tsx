import React, {Component, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import * as area from '../../styles/styled-components/area';
import * as button from '../../styles/styled-components/button';
import * as text from '../../styles/styled-components/text';
import * as elses from '../../styles/styled-components/elses';

// props & logic
import type {RegisterProps} from '../../utils/types';

// components
import ProgressArea from '../components/ProgressArea';

export default function RegisterScreenFour({navigation} : RegisterProps){
  const[name,setName]=useState('undefined');

  const goNext=()=>{
    navigation.navigate("RegisterFour");
  }

  return(
    <area.Container>
      <area.ContainerBlank>
        <ProgressArea navigation={navigation} title="회원가입 완료!" step={4}/>
      </area.ContainerBlank>

      <View style={styles.middleArea}>
        <elses.Circle/>
        <text.NameText>{name}님,</text.NameText>
        <Text>환영합니다!</Text>
      </View>

      <area.ContainerBlank>
        <area.BottomArea>
          <button.PrimaryButton onPress={goNext}>
            <text.PrimaryText>시작</text.PrimaryText>
          </button.PrimaryButton>
        </area.BottomArea>
      </area.ContainerBlank>
    </area.Container>
  );
}

const styles = StyleSheet.create({
  middleArea:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
})