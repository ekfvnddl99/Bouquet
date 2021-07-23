import React, {Component, useState} from 'react';
import {View, FlatList} from 'react-native';
import {colors} from '../../styles/colors';
import * as area from '../../styles/styled-components/area';
import * as button from '../../styles/styled-components/button';
import * as text from '../../styles/styled-components/text';
import * as elses from '../../styles/styled-components/elses';

// components
import ProfileAButton from './ProfileAButton';
import TagItem from './TagItem';

export default function EpisodeItem({name, title, mini} : {name: string, title : string, mini: number}){
    let data=['크루 참여', '전체 공개'];
    return(
        <button.EpisodeButton color={mini===1 ? colors.white : colors.gray0}>
          <area.RowArea top={0}>
            {mini===1 ? <elses.Rectangle width={90} height={117}/>
            : <elses.Rectangle width={110} height={143}/>}
            <View>
              <text.Subtitle3 color={colors.black}>{title}</text.Subtitle3>
              <area.RowArea top={0}>
                <TagItem content={data[0]}/>
                <TagItem content={data[1]}/>
              </area.RowArea>
              <ProfileAButton name={name}/>
            </View>
          </area.RowArea>
        </button.EpisodeButton>
    );
}