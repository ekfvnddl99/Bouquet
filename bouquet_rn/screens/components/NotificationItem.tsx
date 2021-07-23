import React, {Component, useState} from 'react';
import {
    View,
    Text,
    Button,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import {colors} from '../../styles/colors';
import * as elses from '../../styles/styled-components/elses';
import * as text from '../../styles/styled-components/text';
import * as button from '../../styles/styled-components/button';

// components
import NameNText from './NameNText';

function timeName(time : number){
  if(time<60) return time+'분';
  else if(time/60 < 24) return ((time/60) | 0) + '시간';
  else return ((time/1440) | 0 )+'일';
}

export default function NotificationItem({content, time} : {content : string, time : number}){
    return(
        <button.ListButton>
            <elses.Circle radius={20} vertical={0}/>
            <View style={styles.contentText}>
                <NameNText name="" sub={content}/>
            </View>
            <View style={styles.timeText}>
                <text.Caption color={colors.gray5}>{timeName(time)} 전</text.Caption>
            </View>
        </button.ListButton>
    );
}

const styles = StyleSheet.create({
    contentText:{
        flex:2,
        marginLeft: 10,
    },
    timeText:{
        flex:1,
        alignItems:'flex-end',
    }
})