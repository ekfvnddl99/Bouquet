import React, {useRef, useState} from 'react';
import {
    View,
    ScrollView,
    FlatList,
    Animated,
    Platform,
    StyleSheet,
    StatusBar,
    RefreshControl
} from 'react-native';
import {colors} from '../../../styles/colors';
import * as area from '../../../styles/styled-components/area';
import * as text from '../../../styles/styled-components/text';
import * as elses from '../../../styles/styled-components/elses';

// components
import PostingItem from '../../components/PostingItem';

export default function NotificationScreen(){
  // dummy data - 서버에서 불러와야 함
  let Data=[{id:1},{id:2},{id:3},{id:4},{id:5},{id:6},{id:7},{id:8},{id:9}];

  const[selectId, setSelectId]=useState(-1);

  return(
      <View style={{marginTop:16}}>
        <area.RowArea style={{marginBottom:12}}>
          <text.Body2R color={colors.black}>총 </text.Body2R>
          <text.Body2B color={colors.black}>{Data.length}</text.Body2B>
          <text.Body2R color={colors.black}>개</text.Body2R>
        </area.RowArea>

        <FlatList
          data={Data}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={(obj)=>{
            return(
              <PostingItem navigation={()=>{}} press={selectId} id={obj.index}/>
            ); 
          }}></FlatList>
      </View>
  );
}