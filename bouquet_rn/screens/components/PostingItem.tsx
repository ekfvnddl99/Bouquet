import React, {Component, useState} from 'react';
import {
    View,
    Text,
    Button,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import {colors} from '../../styles/colors';
import * as text from '../../styles/styled-components/text';
import * as button from '../../styles/styled-components/button';

// components
import SunButton from './SunButton';
import ProfileAButton from './ProfileAButton';

function timeName(time : number){
  if(time<60) return time+'분';
  else if(time/60 < 24) return ((time/60) | 0) + '시간';
  else return ((time/1440) | 0 )+'일';
}

export default function PostingItem({name, time, content, sun} : {name : string, time : number, content : string, sun : number}){
    return(
        <button.PostButton>
            <View style={styles.aboveArea}>
                <View style={styles.profileArea}>
                    <ProfileAButton name={name}/>
                </View>
                <View style={styles.timeArea}>
                    <text.Caption color={colors.gray5}>{timeName(time)} 전</text.Caption>
                </View>
            </View>
            <View style={styles.contentArea}>
                <Text>{content}</Text>
            </View> 
            <View style={styles.sunArea}>
                <SunButton sun={sun}/>
            </View>
        </button.PostButton>
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
    aboveArea:{
        flexDirection:'row',
        alignItems:'center',
    },
    contentArea:{
        marginVertical:10,
        paddingHorizontal:10,
        paddingVertical:10,
    },
    sunArea:{
        alignItems:'flex-start'
    },

})