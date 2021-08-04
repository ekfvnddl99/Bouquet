import React from 'react';
import {TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as elses from '../../styles/styled-components/elses';

export default function ProfileItem({diameter} : {diameter:number}){
  const navigation=useNavigation();
  const goProfile=()=>{
    navigation.navigate("ProfileItem");
  }
  return(
    <TouchableOpacity activeOpacity={1} onPress={goProfile}>
      <elses.CircleImg diameter={diameter} source={require('../../assets/img.jpg')}/>
    </TouchableOpacity>
  );
}