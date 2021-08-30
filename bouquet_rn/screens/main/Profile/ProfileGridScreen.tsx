import React, {Component, useState, useEffect} from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableWithoutFeedback,
  Animated
} from 'react-native';

// props && logic
import { Character } from '../../../utils/types/types';
import useCharacter from '../../../logics/hooks/useCharacter';

// components
import ProfileChaItem from '../../../components/item/ProfileChaItem';

export default function ProfileGridScreen({scroll, characterList}: {scroll:any, characterList:Character[]}){
  const [character, setCharacter] = useCharacter();
  const[selectId, setSelectId]=useState(character.id);

  const press=(idx:number, id:number)=>{
    setCharacter(characterList[idx]);
    setSelectId(id);
  }

  return(
    <Animated.ScrollView 
      contentContainerStyle={{marginHorizontal:30}}
      showsVerticalScrollIndicator={false}
      scrollEventThrottle={1}
      onScroll={Animated.event(
      [{ nativeEvent: { contentOffset: { y: scroll } } }],
      { useNativeDriver: true })}>
      <View style={{paddingTop: 30}}/>
      <FlatList
        columnWrapperStyle={{justifyContent:'space-between'}}
        contentContainerStyle={{justifyContent:'center'}}
        data={characterList}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        showsHorizontalScrollIndicator={false}
        renderItem={(obj)=>{
          return(
            <View style={{ flex:0.5, marginBottom:13, marginHorizontal:8}}>
              {obj.item.name==='' ? <View/> 
              : 
              <ProfileChaItem name={obj.item.name} profile={obj.item.profileImg} introduction={obj.item.intro} id={obj.item.id} 
                select={selectId} press={press} idx={obj.index}/>}
            </View>
          ); }}/>
    </Animated.ScrollView>
  );
}