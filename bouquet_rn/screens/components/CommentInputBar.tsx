import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, TextInput} from 'react-native';
import {colors} from '../../styles/colors';
import * as area from '../../styles/styled-components/area';
import * as text from '../../styles/styled-components/text';
import * as button from '../../styles/styled-components/button';
import * as elses from '../../styles/styled-components/elses';

// icons
import SendSvg from '../../assets/Send';
import CommetnInputSvg from '../../assets/CommentInput';
import RoundXSvg from '../../assets/RoundX';


export default function CommentInputBar(){
  return(
    <View style={{width:'100%'}}>
      <area.RowArea style={styles.commentUpper}>
        <CommetnInputSvg w='18' h='18'/>
        <View style={{flex:1, marginHorizontal:8}}>
          <text.Body3 color={colors.gray6} numberOfLines={1}>gpgpg asdfoddl guswl</text.Body3>
        </View>
        <RoundXSvg w='18' h='18'/>
      </area.RowArea>
      <area.RowArea style={styles.commentLower}>
      <elses.CircleImg diameter={30} source={require('../../assets/img.jpg')}/>
        <View style={{flex:1}}>
          <TextInput placeholder="어떤 반응을 남기고 싶나요?" placeholderTextColor={colors.gray5} style={styles.commentInput} multiline={true}/>
        </View>
        <SendSvg w='30' h='30'/>
      </area.RowArea>
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
    backgroundColor:colors.white,
    paddingHorizontal:18,
    paddingVertical:8,
    justifyContent:'center',
    alignItems:'flex-end'
  },
  commentInput:{
    backgroundColor:colors.gray0,
    borderRadius:10,
    paddingHorizontal:18,
    marginHorizontal:12
  },
})