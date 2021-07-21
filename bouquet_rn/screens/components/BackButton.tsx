import React from 'react';
import * as button from '../../styles/styled-components/button';

// icons
import ArrowLeftSvg from '../../assets/ArrowLeft';


export default function BackButton({navigation} : {navigation : any}){
  return(
    <button.BackButton onPress={()=>navigation.goBack()}>
      <ArrowLeftSvg w='24' h='24'/>
    </button.BackButton>
  );
}