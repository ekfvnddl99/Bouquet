import React from 'react';
import {
    View,
    Text
} from 'react-native';
import * as button from '../../styles/styled-components/button';
import * as text from '../../styles/styled-components/text';

export default function LoginButton({sentence, tag, press} : {sentence:string, tag:any, press: any}){
    return(
        <button.SocialButton onPress={()=>press}>
            {tag}
            <View style={{flex:1, alignItems:'center'}}>
              <text.SocialText>{sentence}</text.SocialText>
            </View>
        </button.SocialButton>
    );
}