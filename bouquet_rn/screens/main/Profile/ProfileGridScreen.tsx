import React, {Component, useState} from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableWithoutFeedback,
  Animated
} from 'react-native';
import { colors } from '../../../styles/colors';
import * as area from '../../../styles/styled-components/area';

import ProfileChaItem from '../../components/ProfileChaItem';

export default function ProfileGridScreen({scroll}: {scroll:any}){
  // dummy data
  let twoData=[{name:'김', introduction:'b'}, {name:'김', introduction:'b'},{name:'김', introduction:'c'},{name:'김', introduction:'a'},{name:'김', introduction:'a'},{name:'김', introduction:'b'},{name:'김', introduction:'b'},{name:'김', introduction:'b'},{name:'김', introduction:'b'},{name:'김', introduction:'b'},{name:'김', introduction:'b'},{name:'김', introduction:'b'},{name:'김', introduction:'b'},{name:'김', introduction:'b'},{name:'김', introduction:'b'}];
  if(twoData.length%2===1) twoData.push({name:'', introduction:''});

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
        data={twoData}
        keyExtractor={(item) => item.name.toString()}
        numColumns={2}
        showsHorizontalScrollIndicator={false}
        renderItem={(obj)=>{
          return(
            <View style={{ flex:0.5, marginBottom:13, marginHorizontal:8}}>
              {obj.item.name==='' ? <View/> 
              : 
              <TouchableWithoutFeedback onPress={()=>{selectId===obj.index ? setSelectId(-1) : setSelectId(obj.index)}}>
                <ProfileChaItem name={obj.item.name} introduction={obj.item.introduction} idx={obj.index} select={selectId} setSelect={setSelectId}/>
              </TouchableWithoutFeedback>
        }
            </View>
          ); }}/>
    </Animated.ScrollView>
  );
}