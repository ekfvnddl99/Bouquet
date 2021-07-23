import React from 'react';
import {colors} from '../../styles/colors';
import * as text from '../../styles/styled-components/text';
import * as button from '../../styles/styled-components/button';

export default function PrimaryBgButton({press, content, height} : {press: any, content : string, height:number}){
  return(
    <button.PrimaryBgButton height={height} onPress={press}>
      <text.Button3 color={colors.white}>{content}</text.Button3>
    </button.PrimaryBgButton>
  );
}