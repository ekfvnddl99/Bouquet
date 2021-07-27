import React, {Component} from 'react';
import {
    View,
    FlatList,
    StyleSheet
} from 'react-native';
import BackgroundButton from '../../components/BackgroundButton';

import ProfileDetailItem from '../../components/ProfileDetailItem';

export default function ProfileSwipeScreen(){
  let data=[1,2,3,4,5,6,7,8,9];
  return(
    <View>
      <FlatList
        data={data}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={(obj)=>{
          return(
            <View>
              <ProfileDetailItem mini={0}/>
              <BackgroundButton press={()=>{}} content="캐릭터 선택" height={45} active={1} paddingH={40} paddingV={14}/>
            </View>
          ); 
        }}></FlatList>
    </View>
  );
}