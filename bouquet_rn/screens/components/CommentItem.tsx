import React, {useState, useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import i18n from 'i18n-js';
import {colors} from '../../styles/colors';
import * as area from '../../styles/styled-components/area';
import * as text from '../../styles/styled-components/text';
import * as button from '../../styles/styled-components/button';

// icons
import CommentSvg from '../../assets/Comment';
import SunSvg from '../../assets/Sun';
import SunFocusPriSvg from '../../assets/SunFocusPri';
import CommentUpArrowSvg from '../../assets/CommentUpArrow';
import CommentDownArrowSvg from '../../assets/CommentDownArrow';
import BinSvg from '../../assets/Bin';

// props & logic
import * as cal from '../logics/Calculation';

// components
import ProfileButton from './ProfileButton';
import { Comment } from '../logics/Post';


interface CommentItemProps{
  info: Comment,
  press:number, 
  owner:boolean, 
  login:boolean,
  setSelect:Function,
  setParentComm:Function,
  IsClick? : Function, 
  AddClicks? : Function, 
  clicks?:number[]
}


export default function CommentItem({info, press, owner, login, setSelect, setParentComm, IsClick, AddClicks, clicks}  : CommentItemProps){
  const[more, setMore]=useState(-1);
  useEffect(()=>{
    if(IsClick){
      if(more===1) {
        IsClick(info.id);
        inClick();
      }
      else {
        IsClick(-1);
        outClick();
      }
    }
  }, [more])

  const inClick=()=>{
    if(clicks && AddClicks){
      let tmp : number[]=clicks;
      if(tmp.includes(info.id)===false) tmp.push(info.id);
      AddClicks(tmp);
    }
  }
  const outClick=()=>{
    if(clicks && AddClicks){
      let tmp : number[]=clicks;
      let idx = tmp.indexOf(info.id);
      tmp.splice(idx,1);
      AddClicks(tmp);
    }
  }

  return(
    <area.NoHeightArea marBottom={8} paddingH={16} paddingV={12} style={{backgroundColor: press===info.id && login ? colors.alpha10_primary : colors.white}}>
      <area.RowArea style={{alignItems:'flex-start', marginBottom:8}}>
        <View style={styles.contentText}>
          <text.Body2R color={colors.black}>{info.comment}</text.Body2R>
        </View>
        <View style={styles.timeText}>
            <text.Caption color={colors.gray5}>{cal.timeName(57)} {i18n.t('전')}</text.Caption>
        </View>
      </area.RowArea>

      <area.RowArea>
        <ProfileButton diameter={20} account={0} name={info.name} profile={info.profileImg}/>
        <View style={{flex:1}}/>
        <area.RowArea>
          {press===info.id && owner ? <TouchableOpacity><BinSvg w='18' h='18'/></TouchableOpacity> : null}
          {info.children ? 
          <View style={{marginLeft:8}}>
            {more===1 ?<TouchableOpacity onPress={()=>setMore(-1)}><CommentDownArrowSvg w='18' h='18'/></TouchableOpacity> 
              : <TouchableOpacity onPress={()=>setMore(1)}><CommentUpArrowSvg w='18' h='18'/></TouchableOpacity>}
          </View>
            : null}

          <View style={{marginLeft:8}}/>
          <TouchableOpacity onPress={()=>setParentComm(info)}>
            <CommentSvg w='18' h='18'/>
          </TouchableOpacity>

          <View style={{marginLeft:8}}/>
          <area.RowArea>
          <TouchableOpacity>
          {info.liked ? <SunFocusPriSvg w='18' h='18'/> : <SunSvg w='18' h='18'/>}
          </TouchableOpacity>
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