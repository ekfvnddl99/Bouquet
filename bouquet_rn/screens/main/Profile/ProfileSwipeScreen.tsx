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
  let data=[1,2,3,4,5,6,7,8,9];
  return(
    <View>
      <Carousel pages={data} gap={20} offset={38} pageWidth={screenWidth- (20+38)*2}/>
      <View style={{alignItems:'center', marginBottom:16, marginTop:41}}>
        <BackgroundButton press={()=>{}} content="캐릭터 선택" height={45} active={1} paddingH={40} paddingV={14}/>
      </View>
    </View>
  );
}