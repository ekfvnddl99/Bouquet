import React, {Component, useState} from 'react';
import {
    View,
    Text,
    Button,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import {colors} from '../../styles/colors';
import * as area from '../../styles/styled-components/area';
import * as text from '../../styles/styled-components/text';
import * as button from '../../styles/styled-components/button';

// components
import SunButton from './SunButton';
import ProfileButton from './ProfileButton';

function timeName(time : number){
  if(time<60) return time+'분';
  else if(time/60 < 24) return ((time/60) | 0) + '시간';
  else return ((time/1440) | 0 )+'일';
}

export default function PostingItem(){
    return(
      <button.BigListButton color={colors.white} paddingH={10} paddingV={10} activeOpacity={1}>
        <area.RowArea>
          <View style={styles.profileArea}>
              <ProfileButton diameter={30}/>
          </View>
          <View style={styles.timeArea}>
              <text.Caption color={colors.gray5}>{timeName(57)} 전</text.Caption>
          </View>
        </area.RowArea>
        <View style={{marginVertical:10}}>
            <Text>Nothing</Text>
        </View> 
        <View style={styles.sunArea}>
            <SunButton sun={100} active={0}/>
        </View>
      </button.BigListButton>
    );
}

const styles = StyleSheet.create({
    profileArea:{
        flex:2,
        flexDirection:'row',
        alignItems:'center',
    },
    timeArea:{
        flex:1,
        alignItems:'flex-end',
    },
    sunArea:{
        alignItems:'flex-start'
    },
})