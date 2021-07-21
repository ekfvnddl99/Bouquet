import React, {Component, useState} from 'react';
import {
    View,
    Text,
    Button,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import {colors} from '../../styles/colors'

import SunSvg from '../../assets/Sun';

import HomeSvg from '../../assets/Home';

function timeName(time : number){
  if(time<60) return time+'분';
  else if(time/60 < 24) return ((time/60) | 0) + '시간';
  else return ((time/1440) | 0 )+'일';
}

function sunName(sun : number){
  let ans;
  if(sun>=1000){
      sun=sun/1000;
      ans = sun + 'K';
  }
  return ans;
}

export default function PostingItem({name, time, content, sun} : {name : string, time : number, content : string, sun : number}){
    return(
        <TouchableOpacity style={styles.button}>
            <View style={styles.aboveArea}>
                <View style={styles.profileArea}>
                    <HomeSvg w='15' h='15'/>
                    <Text>{name}</Text>
                </View>
                <View style={styles.timeText}>
                    <Text style={{color: colors.gray5}}>{timeName(time)} 전</Text>
                </View>
            </View>
            <View style={styles.contentArea}>
                <Text>{content}</Text>
            </View>
            <View style={styles.sunArea}>
                <TouchableOpacity style={styles.sunButton}>
                    <SunSvg w='15' h='15'/>
                    <Text>{sunName(sun)}</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button:{
        flex:1,
        width:'100%',
        backgroundColor: colors.white,
        borderRadius: 10,
        marginBottom: 10,
        paddingHorizontal:10,
        paddingVertical: 10,
    },
    profileArea:{
        flex:2,
        flexDirection:'row',
        alignItems:'center',
    },
    timeText:{
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
    sunButton:{
        flexDirection:'row',
        borderWidth:1,
        borderColor:colors.primary,
        borderRadius:10,
        alignItems:'center',
        paddingVertical:7,
        paddingHorizontal:8,
    }
})