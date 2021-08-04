import React, {Component} from 'react';
import {
    View,
    FlatList,
    StyleSheet,
    Dimensions
} from 'react-native';
import PagerView from 'react-native-pager-view';
import { colors } from '../../../styles/colors';
import { useNavigation } from '@react-navigation/native';

// props & logic
import Carousel from '../../logics/Carousel';

// components
import BackgroundButton from '../../components/BackgroundButton';
import { ProfileProps } from '../../../utils/types';

const screenWidth = Math.round(Dimensions.get('window').width);
export default function ProfileSwipeScreen(){
  const navigation = useNavigation();
  let Data=[{id:1},{id:2},{id:3},{id:4},{id:5},{id:6},{id:7},{id:8},{id:9}];
  return(
    <View style={{flex:1}}>
      <View style={{flex:1}}/>
      <Carousel pages={Data} gap={20} offset={(screenWidth-260-20*2) /2} pageWidth={260}/>
      <View style={{flex:1, alignItems:'center', justifyContent:'flex-end', marginBottom:16, marginTop:41}}>
        <BackgroundButton press={()=>navigation.navigate('ProfileDetail')} content="캐릭터 선택" height={45} active={1} paddingH={40} paddingV={14}/>
      </View>
    </View>
  );
}