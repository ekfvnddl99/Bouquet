import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform} from 'react-native';
import {colors} from '../../styles/colors';
import * as area from '../../styles/styled-components/area';
import * as elses from '../../styles/styled-components/elses';
import * as text from '../../styles/styled-components/text';

// icons
import SendSvg from '../assets/Send';
import useCharacter from '../../logics/hooks/useCharacter';
import CommetnInputSvg from '../assets/CommentInput';
import RoundXSvg from '../assets/RoundX';
import { Comment } from '../logics/Post';

type CommInputProps={
  selectId:number, 
  value:string, 
  onChange:Function, 
  onUpload:Function,
  isChild:boolean,
  setParentComm? : Function, 
  info?: Comment
}


export default function CommentInputBar({selectId, value, onChange, onUpload, isChild, setParentComm, info}: CommInputProps){
  const [character, setCharacter] = useCharacter();
  return(
    <View>
      {isChild ? 
      <area.RowArea style={styles.commentUpper}>
        <CommetnInputSvg w='18' h='18'/>
        <View style={{flex:1, marginHorizontal:8}}>
          <text.Body3 color={colors.gray6} numberOfLines={1}>{info.comment}</text.Body3>
        </View>
        <TouchableOpacity onPress={()=>setParentComm()}><RoundXSvg w='18' h='18'/></TouchableOpacity>
      </area.RowArea>
      : null}
    <View style={styles.commentLower}>
      <View style={{marginBottom:3}}><elses.CircleImg diameter={30} source={{uri: character.profileImg}}/></View>
      <TextInput placeholder="어떤 반응을 남기고 싶나요?" placeholderTextColor={colors.gray5} 
        style={styles.commentInput} 
        value={value}
        onChangeText={(input:string)=>onChange(input)}
        multiline={true}/>
      <TouchableOpacity style={{marginBottom:3}} onPress={()=>onUpload(value)}>
        <SendSvg w='30' h='30'/>
      </TouchableOpacity>
    </View>
    </View>
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
  commentLower:{
    flexDirection:'row',
    alignItems:'flex-end',
    justifyContent:'center',
    backgroundColor:colors.white,
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