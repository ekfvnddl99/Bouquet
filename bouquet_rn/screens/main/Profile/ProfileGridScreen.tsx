import React, {Component} from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet
} from 'react-native';
import * as area from '../../../styles/styled-components/area';

import ProfileChaItem from '../../components/ProfileChaItem';

export default function ProfileGridScreen(){
  let twoData=[{name:'김', introduction:'a'},{name:'김', introduction:'b'},{name:'김', introduction:'c'},{name:'김', introduction:'a'},{name:'김', introduction:'a'}];
  return(
    <View>
      <FlatList
        data={twoData}
        numColumns={2}
        showsHorizontalScrollIndicator={false}
        renderItem={(obj)=>{
          return(
            <ProfileChaItem name={obj.item.name} introduction={obj.item.introduction} idx={obj.index}/>
          ); }}>
      </FlatList>
    </View>
  );
}