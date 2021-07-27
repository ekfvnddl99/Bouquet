import React from 'react';
import { TouchableOpacity } from 'react-native';

// icons
import ArrowLeftSvg from '../../assets/ArrowLeft';


export default function BackButton({navigation} : {navigation : any}){
  return(
    <TouchableOpacity onPress={()=>navigation.goBack()}>
      <ArrowLeftSvg w='24' h='24'/>
    </TouchableOpacity>
  );
}