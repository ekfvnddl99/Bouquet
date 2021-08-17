import React from 'react';
import {View, TouchableWithoutFeedback} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {colors} from '../../styles/colors';
import * as area from '../../styles/styled-components/area';
import * as elses from '../../styles/styled-components/elses';
import * as text from '../../styles/styled-components/text';

export default function ProfileButton({diameter, account, name, profile} : {diameter:number, account : number, name:string, profile:string}){
  const navigation = useNavigation();
  const goProfileDetail=()=>{
    navigation.navigate("ProfileItem");
  }
  const goAccount=()=>{
    navigation.navigate('ProfileAccount');
  }
  return(
    <TouchableWithoutFeedback onPress={account===1 ? goAccount : goProfileDetail}>
      <area.RowArea>
        <elses.CircleImg diameter={diameter} source={{uri:profile}}/>
        <View style={{marginLeft:8}}/>
        <text.Body2B color={colors.black}>{name}</text.Body2B>
    </area.RowArea>
    </TouchableWithoutFeedback>
  );
}