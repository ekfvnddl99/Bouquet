import React, {Component} from 'react';
import {
    View,
    FlatList,
    StyleSheet,
    Dimensions
} from 'react-native';
import PagerView from 'react-native-pager-view';
import { colors } from '../../../styles/colors';

// props & logic
import Carousel from '../../logics/Carousel';

// components
import BackgroundButton from '../../components/BackgroundButton';

const screenWidth = Math.round(Dimensions.get('window').width);
export default function ProfileSwipeScreen(){
  let Data=[{id:1},{id:2},{id:3},{id:4},{id:5},{id:6},{id:7},{id:8},{id:9}];
  return(
    <View style={{flex:1}}>
      <View style={{flex:1}}/>
      <Carousel pages={Data} gap={20} offset={38} pageWidth={screenWidth - (20+38)*2}/>
      <View style={{flex:1, alignItems:'center', justifyContent:'flex-end', marginBottom:16, marginTop:41}}>
        <BackgroundButton press={()=>{}} content="캐릭터 선택" height={45} active={1} paddingH={40} paddingV={14}/>
      </View>
    </View>
  );
}