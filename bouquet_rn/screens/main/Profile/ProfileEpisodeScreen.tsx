import React, {useRef, useState} from 'react';
import {
    View,
    ScrollView,
    FlatList,
    TouchableOpacity
} from 'react-native';
import {colors} from '../../../styles/colors';
import * as area from '../../../styles/styled-components/area';
import * as text from '../../../styles/styled-components/text';
import * as elses from '../../../styles/styled-components/elses';

// components
import EpisodeItem from '../../components/EpisodeItem';
import TagItem from '../../components/TagItem';

export default function ProfileEpisodeScreen(){
  // dummy data - 서버에서 불러와야 함
  let Data=[{id:1},{id:2},{id:3},{id:4},{id:5},{id:6},{id:7},{id:8},{id:9}];

  const[selectId, setSelectId]=useState(-1);
  const[press1, setPress1]=useState(1);
  const[press2, setPress2]=useState(1);

  return(
      <View style={{marginTop:8}}>
        <area.RowArea style={{marginBottom:16}}>
          <TouchableOpacity onPress={()=>setPress1(press1*(-1))}><TagItem content="참여한 에피소드" active={press1}/></TouchableOpacity>
          <TouchableOpacity onPress={()=>setPress2(press2*(-1))}><TagItem content="관리하는 에피소드" active={press2}/></TouchableOpacity>
        </area.RowArea>

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
              <EpisodeItem color={colors.white} mini={1} press={selectId} id={obj.index}/>
            ); 
          }}></FlatList>
      </View>
  );
}