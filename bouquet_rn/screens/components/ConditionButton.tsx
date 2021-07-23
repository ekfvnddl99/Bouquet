import React from 'react';
import {
    View,
} from 'react-native';
import { colors } from '../../styles/colors';
import * as text from '../../styles/styled-components/text';
import * as button from '../../styles/styled-components/button';

export default function ConditionButton({active, press, content} : {active : number, press: any, content : string}){
  return(
    <View>
      {active===1 ? 
      <button.PrimaryButton onPress={press} height={45}>
        <text.Button2B color={colors.primary}>{content}</text.Button2B>
      </button.PrimaryButton>
     :
      <button.GrayBtnButton>
        <text.Button2B color={colors.gray5}>{content}</text.Button2B>
      </button.GrayBtnButton>
    }
    </View>
  );
}