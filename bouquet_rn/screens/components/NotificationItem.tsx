import React, {Component, useState} from 'react';
import {
    View,
    Text,
    Button,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import {colors} from '../../styles/colors'

import HomeSvg from '../../assets/Home';

function timeName(time : number){
  if(time<60) return time+'분';
  else if(time/60 < 24) return ((time/60) | 0) + '시간';
  else return ((time/1440) | 0 )+'일';
}

export default function NotificationItem({content, time} : {content : string, time : number}){
    return(
        <TouchableOpacity style={styles.button}>
            <HomeSvg w='15' h='15'/>
            <View style={styles.contentText}>
                <Text>{content}</Text>
            </View>
            <View style={styles.timeText}>
                <Text style={{color: colors.gray5}}>{timeName(time)} 전</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button:{
        flex:1,
        flexDirection:'row',
        alignItems: 'center',
        backgroundColor: colors.white,
        borderRadius: 10,
        marginTop: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    contentText:{
        flex:2,
        marginLeft: 10,
    },
    timeText:{
        flex:1,
        alignItems:'flex-end',
    }
})