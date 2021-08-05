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
import { useRecoilValueLoadable } from 'recoil';

// props & logic
import Carousel from '../../logics/Carousel';
import { characterListSelector } from '../../logics/atoms';

// components
import BackgroundButton from '../../components/BackgroundButton';
import { ProfileProps } from '../../../utils/types';
import { useEffect } from 'react';

const screenWidth = Math.round(Dimensions.get('window').width);
export default function ProfileSwipeScreen(){
  const characterList = useRecoilValueLoadable(characterListSelector);
  const navigation = useNavigation();
  
  return(
    <View style={{flex:1}}>
      <View style={{flex:1}}/>
      <Carousel pages={characterList.state === 'hasValue' ? characterList.contents : []} gap={20} offset={(screenWidth-260-20*2) /2} pageWidth={260}/>
      <View style={{flex:1, alignItems:'center', justifyContent:'flex-end', marginBottom:16, marginTop:41}}>
        <BackgroundButton press={()=>navigation.navigate('ProfileDetail')} content="캐릭터 선택" height={45} active={1} paddingH={40} paddingV={14}/>
      </View>
    </View>
  );
}