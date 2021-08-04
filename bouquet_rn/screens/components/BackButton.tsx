import React from 'react';
import { TouchableOpacity } from 'react-native';
import {useNavigation} from '@react-navigation/native';
// icons
import ArrowLeftSvg from '../../assets/ArrowLeft';


export default function BackButton(){
  const navigation = useNavigation();
  return(
    <TouchableOpacity onPress={()=>navigation.goBack()}>
      <ArrowLeftSvg w='24' h='24'/>
    </TouchableOpacity>
  );
}