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


export default function CommentInputComment({setSelectId, comment}:{setSelectId : Function, comment:string}){
  return(
    <area.RowArea style={styles.commentUpper}>
      <CommetnInputSvg w='18' h='18'/>
      <View style={{flex:1, marginHorizontal:8}}>
        <text.Body3 color={colors.gray6} numberOfLines={1}>{comment}</text.Body3>
      </View>
      <TouchableOpacity onPress={()=>setSelectId(-1)}><RoundXSvg w='18' h='18'/></TouchableOpacity>
    </area.RowArea>
  );
}

const styles = StyleSheet.create({
  commentUpper:{
    backgroundColor:colors.gray1,
    height:32,
    paddingHorizontal:15,
    paddingVertical:7,
    justifyContent:'center'
  },
})