import React, {Component, useState} from 'react';
import {colors} from '../../styles/colors';
import * as button from '../../styles/styled-components/button';
import * as text from '../../styles/styled-components/text';
import * as elses from '../../styles/styled-components/elses';

// components
import ProfileBButton from './ProfileBButton';

export default function EpisodeMiniItem({name, title} : {name: string, title : string}){
    let data=['크루 참여', '전체 공개'];
    return(
        <button.EpisodeMiniButton>
          <elses.Rectangle width={118} height={153}/>
          <text.Subtitle3 color={colors.black}>{title}</text.Subtitle3>
          <ProfileBButton name={name}/>
        </button.EpisodeMiniButton>
    );
}