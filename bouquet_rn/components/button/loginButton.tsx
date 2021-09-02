import React from 'react';
import {View} from 'react-native';
import styled from 'styled-components/native';
import { colors } from '../../styles/colors';
import * as text from '../../styles/styled-components/text';
import * as type from '../type';

type LoginButtonProps={
  sentence:string, 
  tag:JSX.Element, 
  press: Function,
}
export default function LoginButton({sentence, tag, press} : LoginButtonProps): React.ReactElement {
  return(
    <SocialButton 
      activeOpacity={1} 
      onPress={press}>
      {tag}
      <View style={{flex:1, alignItems:'center'}}>
        <text.Button2B color={colors.black}>{sentence}</text.Button2B>
      </View>
    </SocialButton>
  );
}

const SocialButton =styled.TouchableOpacity`
  background-color:${colors.white};
  height:45;
  border-radius:25;
  align-items:center;
  justify-content:center;
  padding-horizontal:18;
  margin-top:10;
  flex-direction: row;
  width: 100%;
`