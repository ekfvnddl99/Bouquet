import React, {Component, useState} from 'react';
import {
    ScrollView,
    FlatList,
} from 'react-native';
import {colors} from '../../styles/colors';
import * as area from '../../styles/styled-components/area';
import * as text from '../../styles/styled-components/text';
import * as elses from '../../styles/styled-components/elses';

// components
import PostingItem from '../components/PostingItem';
import PrimaryBgButton from '../components/PrimaryBgButton';
import SunButton from '../components/SunButton';
import CommentButton from '../components/CommentButton';
import EpisodeItem from '../components/EpisodeItem';

export default function EpisodeScreen({sun, comment} : {sun : number, comment:number}){
    // dummy data - 서버에서 불러와야 함
    let threeData=[{name:'김', time:30,content:'배', sun:1400},{name:'현', time:60,content:'고', sun:14000},{name:'지', time:2657,content:'파', sun:400}];

    return(
        <area.Container>
          <area.ContainerBlank30>
            <area.RowArea top={30}>
              {/* <BackButton/> */}
              <elses.Circle radius={40} vertical={0}/>
            </area.RowArea>

            <EpisodeItem name="떡사모" title="떡볶이 전쟁" mini={0}/>
            <text.Caption color={colors.gray6}></text.Caption>
            <area.RowArea top={0}>
              <PrimaryBgButton press={()=>{}} content="추가하기" height={28}/>
              <SunButton sun={sun}/>
              <CommentButton comment={comment}/>
            </area.RowArea>

            <ScrollView style={{marginTop : 30}}>
              <FlatList
                data={threeData}
                showsVerticalScrollIndicator={false}
                renderItem={(obj)=>{
                  return(
                    <PostingItem name={obj.item.name} time={obj.item.time} content={obj.item.content} sun={obj.item.sun}/>
                  ); 
                }}></FlatList>
            </ScrollView>
          </area.ContainerBlank30>
        </area.Container>
    )
}
