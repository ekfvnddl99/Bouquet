import React, {useState} from 'react';
import {
  View,
    TouchableOpacity,
} from 'react-native';
import {colors} from '../../styles/colors';
import * as button from '../../styles/styled-components/button';
import * as text from '../../styles/styled-components/text';

// icons
import XSvg from '../../assets/X';
import XFocusSvg from '../../assets/XFocus';

type TagModifyItemProps={
  content : string,
  press?:number,
  setSearch?:Function,
  index:number, 
  search:number,
  array:any[],
  setArray:Function
}
export default function TagModifyItem({content, press, setSearch, index, search, array, setArray} : TagModifyItemProps){
  const deleteTag=()=>{
    let tmp=[...array];
    tmp.splice(index, 1); 
    setArray(tmp);
  }
  return(
      <button.TagModifyButton color={search===1 ? colors.white : colors.alpha10_primary} activeOpacity={1}
        onPress={()=> {press  && setSearch && press===index ? setSearch(content) : {}}}>
        <text.Caption color={search===1 ? colors.black : colors.primary} style={{flexShrink:1}}>{content}</text.Caption>
        <TouchableOpacity onPress={deleteTag} style={{flexGrow:1}}>{search===1 ? <XSvg w='25' h='25'/> : <XFocusSvg w='25' h='25'/>}</TouchableOpacity>
      </button.TagModifyButton>
  );
}