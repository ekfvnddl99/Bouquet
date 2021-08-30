import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform} from 'react-native';
import {colors} from '../../styles/colors';
import * as area from '../../styles/styled-components/area';
import * as elses from '../../styles/styled-components/elses';

// icons
import SendSvg from '../../assets/Send';
import useCharacter from '../logics/useCharacter';

type CommInputProps={
  selectId:number, 
  value:string, 
  onChange:Function, 
  onUpload:Function
}


export default function CommentInputBar({selectId, value, onChange, onUpload}: CommInputProps){
  const [character, setCharacter] = useCharacter();
  return(
    <View style={styles.commentLower}>
      <View style={{marginBottom:3}}><elses.CircleImg diameter={30} source={{uri: character.profileImg}}/></View>
      <TextInput placeholder="어떤 반응을 남기고 싶나요?" placeholderTextColor={colors.gray5} 
        style={styles.commentInput} 
        value={value}
        onChangeText={(text:string)=>onChange(text)}
        multiline={true}/>
      <TouchableOpacity style={{marginBottom:3}} onPress={()=>onUpload(value)}>
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