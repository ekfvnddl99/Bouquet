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
import { useNavigation } from '@react-navigation/native';
import { useRecoilValue } from 'recoil';
import {colors} from '../../styles/colors';
import * as area from '../../styles/styled-components/area';
import * as text from '../../styles/styled-components/text';
import * as button from '../../styles/styled-components/button';
import * as elses from '../../styles/styled-components/elses';
import * as input from '../../styles/styled-components/input';

// props & logic
import { StatusBarHeight } from '../logics/StatusbarHeight';
import { selectTemplate } from '../logics/atoms';

// components
import ConditionButton from '../components/ConditionButton';
import ProfileButton from '../components/ProfileButton';
import BackButton from '../components/BackButton';
import LineButton from '../components/LineButton';
import ProfileItem from '../components/ProfileItem';


export default function PostWritingScreen(){
  // 템플릿을 고른 상태라면 select에 1을 넣어줘야 한다.
  const select=useRecoilValue(selectTemplate);
  const navigation = useNavigation();
  const goSelect=()=>{
    navigation.navigate('SelectTemplate');
  }
    return(
        <area.Container>
          <area.RowArea style={{paddingHorizontal:30, paddingVertical:16}}>
            <BackButton/>
            <View style={{flex:1}}/>
            <ProfileItem diameter={28}/>
          </area.RowArea>

          <ScrollView>
            <area.ContainerBlank30>
              <area.RowArea>
                <View style={{flex:1}}><ProfileButton diameter={30} account={0}/></View>
                {select!==-1 ? 
                <LineButton press={goSelect} content="템플릿 변경" color={colors.black} incolor={colors.gray2} outcolor={'transparent'}/> : null}
              </area.RowArea>
              {select===-1 ? 
              <button.AddTemplate onPress={goSelect}>
                <text.Button2B color={colors.black}>템플릿 선택</text.Button2B>
              </button.AddTemplate> : null}
              <input.TextTemplate placeholder="내용을 입력해 주세요."/>
              <View style={{marginTop:40}}/>
              <ConditionButton active={1} press={()=>{}} content="게시글 올리기" paddingH={0} paddingV={14} height={45}/>
            </area.ContainerBlank30>
          </ScrollView>
        </area.Container>
        
    )
}