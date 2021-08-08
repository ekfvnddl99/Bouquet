import React, {Component, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import i18n from 'i18n-js';
import { useNavigation } from '@react-navigation/native';
import {colors} from '../../styles/colors';
import * as button from '../../styles/styled-components/button';
import * as text from '../../styles/styled-components/text';
import * as elses from '../../styles/styled-components/elses';
import {useSetRecoilState, useRecoilValue} from 'recoil';

// components
import ConditionButton from './ConditionButton';

interface ProfileChaItemProps{
  name: string, 
  introduction : string, 
  idx:number,
  select:number,
  setSelect : Function,
  account? : boolean,
}

export default function ProfileChaItem({name, introduction, idx, select, setSelect, account} : ProfileChaItemProps){
  const navigation = useNavigation();
  const goProfileDetail=()=>{
    navigation.navigate('ProfileItem');
  }
  return(
    <button.MiniListButton isWidth={false} height={account ? 200 : 238} color={colors.white} paddingH={25} paddingV={18} 
    style={styles.button} activeOpacity={1} onPress={goProfileDetail}>
        <elses.Circle diameter={100}/>
        <View style={{marginBottom:8}}/>
        <text.Body2B color={colors.black}>{name}</text.Body2B>
        <View style={{marginBottom:8}}/>
        <text.Caption color={colors.black} numberOfLines={2}>{introduction}</text.Caption>
        {account ? null :
        <View style={{marginTop: 21}}>
        <ConditionButton active={!(select===idx)} press={()=>setSelect(idx)} content={select===idx ? i18n.t("선택된 캐릭터") :i18n.t("캐릭터 선택")} paddingH={12} paddingV={4} height={22}/>
        </View>}
    </button.MiniListButton>
  );
}

const styles = StyleSheet.create({
  button:{
    alignItems:'center',
    paddingTop:18,
    paddingBottom:16,
  }
})