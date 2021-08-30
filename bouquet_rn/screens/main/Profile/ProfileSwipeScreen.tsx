import React, {Component, useEffect, useState} from 'react';
import {
    View,
    FlatList,
    StyleSheet,
    Dimensions
} from 'react-native';
import i18n from 'i18n-js';
import PagerView from 'react-native-pager-view';
import { colors } from '../../../styles/colors';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useRecoilState } from 'recoil';
import * as SecureStore from 'expo-secure-store';

// props & logic
import Carousel from '../../../components/view/Carousel';
import { characterListState } from '../../../logics/atoms';
import useCharacter from '../../../logics/hooks/useCharacter';

// components
import BackgroundButton from '../../../components/button/BackgroundButton';
import { ProfileProps, Character } from '../../../utils/types/types';

const screenWidth = Math.round(Dimensions.get('window').width);
export default function ProfileSwipeScreen({characterList}: {characterList: Character[]}){
  const [page, setPage] = useState(0);
  const [select, setSelect]=useState(-1);
  const [character, setCharacter] = useCharacter();

  const onPress = async() => {
    if (characterList.length > 0) {
      if (characterList[page].name === "폭스") await SecureStore.setItemAsync('tmpPageNum', "1");
      setCharacter(characterList[page]);
      setSelect(page);
    }
  }

  useFocusEffect(() => {
    if (characterList.length > 0) {
      const idx = characterList.findIndex((element: Character) => element.id === character.id);
      if (idx !== -1) setSelect(idx);
    }
  });

  return(
    <View style={{flex:1}}>
      <View style={{flex:1}}/>
      <Carousel
        pages={characterList}
        gap={20}
        offset={(screenWidth-260-20*2) /2}
        pageWidth={260}
        setPage={setPage}
      />
      {characterList.length===0 ? null :
      <View style={{flex:1, alignItems:'center', justifyContent:'flex-end', marginBottom:16, marginTop:41}}>
        <BackgroundButton press={onPress} content={select===page ? i18n.t("선택된 캐릭터") : i18n.t("캐릭터 선택")} 
        height={45} active={select===page ? 0 : 1} paddingH={40} paddingV={14}/>
      </View>}
    </View>
  );
}