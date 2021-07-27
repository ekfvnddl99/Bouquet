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
import EpisodeItem from '../../components/EpisodeItem';
import TagItem from '../../components/TagItem';

export default function NotificationScreen(){
  // dummy data - 서버에서 불러와야 함
  const [name, setName] = useState('단호좌현지');
  let threeData=[{name:'김', title:'배'},{name:'김', title:'고'},{name:'김', title:'파'}];

  return(
      <area.Container>
        <area.RowArea>
          <TagItem content="참여한 에피소드"/>
          <TagItem content="관리하는 에피소드"/>
        </area.RowArea>

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
              <EpisodeItem color={colors.white} mini={1}/>
            ); 
          }}></FlatList>
      </area.Container>
  );
}