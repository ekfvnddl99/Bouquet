import React from 'react';
import { TouchableOpacity } from 'react-native';
import {useNavigation} from '@react-navigation/native';
// icons
import Icon from '../../assets/Icon';


export default function BackButton() : React.ReactElement {
  const navigation = useNavigation();

  return(
    <TouchableOpacity onPress={()=>navigation.goBack()}>
      <Icon icon="arrowLeft" size={24}/>
    </TouchableOpacity>
  );
}