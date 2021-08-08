import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform} from 'react-native';
import {colors} from '../../styles/colors';
import * as area from '../../styles/styled-components/area';
import * as text from '../../styles/styled-components/text';
import * as button from '../../styles/styled-components/button';
import * as elses from '../../styles/styled-components/elses';

// icons
import SendSvg from '../../assets/Send';
import CommetnInputSvg from '../../assets/CommentInput';
import RoundXSvg from '../../assets/RoundX';


export default function CommentInputBar({selectId}:{selectId:number}){
  return(
    <area.RowArea style={styles.commentLower}>
      <elses.CircleImg diameter={30} source={require('../../assets/img.jpg')}/>
      <TextInput placeholder="어떤 반응을 남기고 싶나요?" placeholderTextColor={colors.gray5} style={styles.commentInput} multiline={true}/>
      <TouchableOpacity activeOpacity={1}>
        <SendSvg w='30' h='30'/>
      </TouchableOpacity>
    </area.RowArea>
  );
}

const styles = StyleSheet.create({
  commentLower:{
    backgroundColor:colors.black,
    paddingHorizontal:18,
    paddingVertical:8,
    justifyContent:'center',
    alignItems:'center',
  },
  commentInput:{
    flex:1,
    backgroundColor:colors.gray0,
    minHeight:33,
    borderRadius:10,
    paddingHorizontal:18,
    paddingTop:(Platform.OS==='ios' ? 8 : 0),
    paddingBottom:(Platform.OS==='ios' ? 8 : 0),
    marginHorizontal:12,
  },
})