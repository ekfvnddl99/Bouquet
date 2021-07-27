import React, {Component, useState} from 'react';
import {
    ScrollView,
    FlatList,
    View,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import {colors} from '../../../styles/colors';
import * as area from '../../../styles/styled-components/area';
import * as text from '../../../styles/styled-components/text';
import * as elses from '../../../styles/styled-components/elses';
import * as button from '../../../styles/styled-components/button';

import ProfileFeedScreen from './ProfileFeedScreen';
import ProfileEpisodeScreen from './ProfileEpisodeScreen';

// components
import ProfileInfoText from '../../components/ProfileInfoText';
import ProfileDetailItem from '../../components/ProfileDetailItem';

function customTab(press : number){
  
}


export default function EpisodeScreen(){
  const [press, setPress] = useState(1);
  // dummy data - 서버에서 불러와야 함
  let threeData=[{name:'김', time:30,content:'배', sun:1400},{name:'현', time:60,content:'고', sun:14000},{name:'지', time:2657,content:'파', sun:400}];

  return(
      <area.Container>
        <area.ContainerBlank30>
          <ScrollView showsVerticalScrollIndicator={false}>
            <area.RowArea>
              <View style={{flex:1}}>
              </View>
              <elses.Circle diameter={28}/>
            </area.RowArea>

            <ProfileDetailItem mini={0}/>

            <View>
              <area.RowArea>
                <TouchableOpacity onPress={()=>setPress(1)}>
                  <text.Subtitle3 color={press===1 ? colors.black : colors.gray5}>게시글</text.Subtitle3>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>setPress(0)}>
                <text.Subtitle3 color={press===0 ? colors.black : colors.gray5}>에피소드</text.Subtitle3>
                </TouchableOpacity>
              </area.RowArea>
              {press===1 ? <ProfileFeedScreen/> : <ProfileEpisodeScreen/>}
            </View>
          </ScrollView>
        </area.ContainerBlank30>
      </area.Container>
  );
}