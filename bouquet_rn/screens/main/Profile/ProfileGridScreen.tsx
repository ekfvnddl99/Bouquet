import React, {Component, useState, useEffect} from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableWithoutFeedback,
  Animated
} from 'react-native';
import { Character } from '../../../utils/types';

// components
import ProfileChaItem from '../../components/ProfileChaItem';

export default function ProfileGridScreen({scroll, characterList}: {scroll:any, characterList:Character[]}){

  const[selectId, setSelectId]=useState(-1);

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
        keyExtractor={(item) => item.name.toString()}
        numColumns={2}
        showsHorizontalScrollIndicator={false}
        renderItem={(obj)=>{
          return(
            <View style={{ flex:0.5, marginBottom:13, marginHorizontal:8}}>
              {obj.item.name==='' ? <View/> 
              : 
              <TouchableWithoutFeedback onPress={()=>{selectId===obj.index ? setSelectId(-1) : setSelectId(obj.index)}}>
                <ProfileChaItem name={obj.item.name} introduction={obj.item.intro} idx={obj.index} select={selectId} setSelect={setSelectId}/>
              </TouchableWithoutFeedback>
        }
            </View>
          ); }}/>
    </Animated.ScrollView>
  );
}