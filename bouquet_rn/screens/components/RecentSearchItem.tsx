import React from 'react';
import {
    TouchableOpacity,
} from 'react-native';
import {colors} from '../../styles/colors';
import * as button from '../../styles/styled-components/button';
import * as text from '../../styles/styled-components/text';

// icons
import XSvg from '../../assets/X'

export default function RecentSearchItem({content} : {content : string}){
    return(
        <button.RecentSearchButton>
            <text.Caption color={colors.black}>{content}</text.Caption>
            <TouchableOpacity><XSvg w='25' h='25'/></TouchableOpacity>
        </button.RecentSearchButton>
    );
}