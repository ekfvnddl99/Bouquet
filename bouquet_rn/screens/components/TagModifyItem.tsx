import React from 'react';
import {
    TouchableOpacity,
} from 'react-native';
import {colors} from '../../styles/colors';
import * as button from '../../styles/styled-components/button';
import * as text from '../../styles/styled-components/text';

// icons
import XSvg from '../../assets/X';
import XFocusSvg from '../../assets/XFocus';

export default function TagModifyItem({content, press, id, search} : {content : string, press:any, id:number, search:number}){
    return(
        <button.TagModifyButton color={search===1 ? colors.white : colors.alpha10_primary} activeOpacity={1}>
            <text.Caption color={search===1 ? colors.black : colors.primary}>{content}</text.Caption>
            <TouchableOpacity onPress={press}>{search===1 ? <XSvg w='25' h='25'/> : <XFocusSvg w='25' h='25'/>}</TouchableOpacity>
        </button.TagModifyButton>
    );
}