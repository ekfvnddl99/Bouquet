import React, {useRef, useState} from 'react';
import {
    ScrollView,
    FlatList,
    View,
    Animated,
    TouchableHighlight,
    Platform,
    StyleSheet
} from 'react-native';
import {colors} from '../../styles/colors';
import * as area from '../../styles/styled-components/area';
import * as text from '../../styles/styled-components/text';
import * as button from '../../styles/styled-components/button';
import * as elses from '../../styles/styled-components/elses';
import * as input from '../../styles/styled-components/input';

// props & logic
import { StatusBarHeight } from '../logics/StatusbarHeight';

// components
import ConditionButton from '../components/ConditionButton';
import ProfileButton from '../components/ProfileButton';
import BackButton from '../components/BackButton';
import BlackLineButton from '../components/BlackLineButton';

export default function PostWritingScreen(){
  const[select, setSelect]=useState(1);
    // dummy data - 서버에서 불러와야 함
    let threeData=[1,2,3,4,5,6,7,8,9];

    return(
        <area.Container>
          <area.RowArea style={{paddingHorizontal:30, paddingVertical:16}}>
            <BackButton navigation={()=>{}}/>
            <elses.CircleImg diameter={28} source={require('../../assets/img.jpg')}/>
          </area.RowArea>

          <ScrollView>
            <area.ContainerBlank30>
              <area.RowArea>
                <View style={{flex:1}}><ProfileButton diameter={30}/></View>
                {select===1 ? 
                <BlackLineButton press={()=>{}} content="템플릿 변경"/> : null}
              </area.RowArea>
              <button.AddTemplate/>
              <input.TextTemplate/>
              <View style={{marginTop:40}}/>
              <ConditionButton active={1} press={()=>{}} content="게시글 올리기" paddingH={0} paddingV={14} height={45}/>
            </area.ContainerBlank30>
          </ScrollView>
        </area.Container>
        
    )
}