import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {colors} from '../../styles/colors';
import * as area from '../../styles/styled-components/area';
import * as text from '../../styles/styled-components/text';
import * as button from '../../styles/styled-components/button';

// icons
import CommentSvg from '../../assets/Comment';
import SunSvg from '../../assets/Sun';
import CommentUpArrowSvg from '../../assets/CommentUpArrow';
import CommentDownArrowSvg from '../../assets/CommentDownArrow';
import BinSvg from '../../assets/Bin';

// props & logic
import * as cal from '../logics/Calculation';

// components
import ProfileButton from './ProfileButton';


export default function CommentItem({press, id}  :{press:number, id:number}){
  const[multi, setMulti]=useState(1);
  const[more, setMore]=useState(0);
  return(
    <area.NoHeightArea marBottom={8} paddingH={16} paddingV={12} style={{backgroundColor: press===id ? colors.alpha10_primary : colors.white}}>
      <area.RowArea style={{alignItems:'flex-start', marginBottom:8}}>
        <View style={styles.contentText}>
          <text.Body2R color={colors.black}>qmffkqfmffkwkdskskdlsjfka; jf;asjdfasjficwfmqwe</text.Body2R>
        </View>
        <View style={styles.timeText}>
            <text.Caption color={colors.gray5}>{cal.timeName(57)} 전</text.Caption>
        </View>
      </area.RowArea>

      <area.RowArea>
        <ProfileButton diameter={20} account={0}/>
        <View style={{flex:1}}/>
        <area.RowArea>
          {press===id ? <TouchableOpacity style={{marginRight:8}}><BinSvg w='18' h='18'/></TouchableOpacity> : null}
          {multi===1 ? 
          <View>{more===1 ?<TouchableOpacity onPress={()=>setMore(-1)}><CommentDownArrowSvg w='18' h='18'/></TouchableOpacity> 
          : <TouchableOpacity onPress={()=>setMore(1)}><CommentUpArrowSvg w='18' h='18'/></TouchableOpacity>}</View>
            : null}
          <View style={{marginLeft:8}}/>
          <CommentSvg w='18' h='18'/>
          <View style={{marginLeft:8}}/>
          <area.RowArea>
            <SunSvg w='18' h='18'/>
            <text.Body3 color={colors.primary} style={{marginLeft:4}}>{cal.numName(14)}</text.Body3>
          </area.RowArea>
        </area.RowArea>
      </area.RowArea>
    </area.NoHeightArea>
  );
}

const styles = StyleSheet.create({
  contentText:{
      flex:2,
  },
  timeText:{
      flex:1,
      alignItems:'flex-end',
      justifyContent:'flex-end',
  }
})