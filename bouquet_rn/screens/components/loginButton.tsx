import React, {useState} from 'react';
import {View} from 'react-native';
import { colors } from '../../styles/colors';
import * as button from '../../styles/styled-components/button';
import * as text from '../../styles/styled-components/text';

export default function LoginButton({sentence, tag, press} : {sentence:string, tag:any, press: any}){
  const[color, setColor]=useState(colors.white);
    return(
      <button.SocialButton activeOpacity={1} onPress={press} onPressIn={()=>setColor(colors.gray0)} onPressOut={()=>setColor(colors.white)} style={{backgroundColor:color}}>
        {tag}
        <View style={{flex:1, alignItems:'center'}}>
          <text.Button2B color={colors.black}>{sentence}</text.Button2B>
        </View>
      </button.SocialButton>
    );
}