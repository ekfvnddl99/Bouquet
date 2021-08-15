import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform} from 'react-native';
import {colors} from '../../styles/colors';
import * as area from '../../styles/styled-components/area';
import * as elses from '../../styles/styled-components/elses';

// icons
import SendSvg from '../../assets/Send';


export default function CommentInputBar({selectId, value, onChange}:{selectId:number, value:string, onChange:Function}){
  return(
    <View style={styles.commentLower}>
      <View style={{marginBottom:3}}><elses.CircleImg diameter={30} source={require('../../assets/img.jpg')}/></View>
      <TextInput placeholder="어떤 반응을 남기고 싶나요?" placeholderTextColor={colors.gray5} 
        style={styles.commentInput} 
        value={value}
        onChangeText={(text:string)=>onChange(text)}
        multiline={true}/>
      <TouchableOpacity activeOpacity={1} style={{marginBottom:3}}>
        <SendSvg w='30' h='30'/>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  commentLower:{
    flexDirection:'row',
    alignItems:'flex-end',
    justifyContent:'center',
    backgroundColor:colors.black,
    paddingHorizontal:18,
    paddingVertical:8,
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