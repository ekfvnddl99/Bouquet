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
  const [name, setName] = useState('단호좌현지');
  let threeData=[{name:'김', time:30,content:'배', sun:1400},{name:'현', time:60,content:'고', sun:14000},{name:'지', time:2657,content:'파', sun:400},{name:'김', time:30,content:'배', sun:1400},{name:'현', time:60,content:'고', sun:14000},{name:'지', time:2657,content:'파', sun:400},{name:'김', time:30,content:'배', sun:1400},{name:'현', time:60,content:'고', sun:14000},{name:'지', time:2657,content:'파', sun:400},{name:'김', time:30,content:'배', sun:1400},{name:'현', time:60,content:'고', sun:14000},{name:'지', time:2657,content:'파', sun:400}];

  return(
      <area.Container>
        <area.RowArea>
          <text.Body2R color={colors.black}>총</text.Body2R>
          <text.Body2B color={colors.black}>{threeData.length}</text.Body2B>
          <text.Body2R color={colors.black}>개</text.Body2R>
        </area.RowArea>

        <FlatList
          data={threeData}
          showsVerticalScrollIndicator={false}
          renderItem={(obj)=>{
            return(
              <PostingItem/>
            ); 
          }}></FlatList>
      </area.Container>
  );
}