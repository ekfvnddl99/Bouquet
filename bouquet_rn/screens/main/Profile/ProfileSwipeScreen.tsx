import React, {Component, useState} from 'react';
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
import useCharacter from '../../logics/useCharacter';

// components
import BackgroundButton from '../../components/BackgroundButton';
import { ProfileProps } from '../../../utils/types';

const screenWidth = Math.round(Dimensions.get('window').width);
export default function ProfileSwipeScreen(){
  const [page, setPage] = useState(0);
  const characterList = useRecoilValueLoadable(characterListSelector);
  const [character, setCharacter] = useCharacter();
  const navigation = useNavigation();

  const onPress = () => {
    if (characterList.state === 'hasValue' && characterList.contents.length > 0) {
      setCharacter(characterList.contents[page]);
    }
  }

  return(
    <View style={{flex:1}}>
      <View style={{flex:1}}/>
      <Carousel
        pages={characterList.state === 'hasValue' ? characterList.contents : []}
        gap={20}
        offset={(screenWidth-260-20*2) /2}
        pageWidth={260}
        setPage={setPage}
      />
      <View style={{flex:1, alignItems:'center', justifyContent:'flex-end', marginBottom:16, marginTop:41}}>
        <BackgroundButton press={onPress} content="캐릭터 선택" height={45} active={1} paddingH={40} paddingV={14}/>
      </View>
    </View>
  );
}