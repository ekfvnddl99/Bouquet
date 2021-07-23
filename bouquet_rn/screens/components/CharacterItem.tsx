import React, {Component, useState} from 'react';
import {colors} from '../../styles/colors';
import * as button from '../../styles/styled-components/button';
import * as text from '../../styles/styled-components/text';
import * as elses from '../../styles/styled-components/elses';


export default function CharacterItem({name, introduction} : {name: string, introduction : string}){
    return(
        <button.CharacterButton>
            <elses.Circle radius={100} vertical={8}/>
            <text.Body2B color={colors.black}>{name}</text.Body2B>
            <text.Caption color={colors.black}>{introduction}</text.Caption>
        </button.CharacterButton>
    );
}