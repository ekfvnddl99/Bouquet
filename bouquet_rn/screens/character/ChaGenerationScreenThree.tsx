import React, {Component, useState, useEffect} from 'react';
import {
  View, 
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import * as area from '../../styles/styled-components/area';
import * as input from '../../styles/styled-components/input';

// props & logic
import type {ChaGenerationProps} from '../../utils/types';

// components
import ProgressArea from '../components/ProgressArea';
import ConditionButton from '../components/ConditionButton';
import ConditionTextInput from '../components/ConditionTextInput';
import WarningText from '../components/WarningText';
import TagModifyItem from '../components/TagModifyItem';
import { colors } from '../../styles/colors';


export default function ChaGenerationScreenThree({navigation} : ChaGenerationProps, {modify} : {modify : number}){
  const[err,setErr]=useState(1);
  const[likeList, setLikeList] : any=useState([]);
  const[dislikeList, setDisLikeList] : any=useState([]);
  const[likeInput, setLikeInput] = useState('');
  const[dislikeInput, setDisLikeInput] = useState('');

  const goNext=()=>{
    navigation.navigate("ChaGenerationFour");
  }

  useEffect(()=>{
    let tmpLikes = likeInput.slice(0, likeInput.length-1).trim();
    if(likeInput[likeInput.length-1]===' ' && tmpLikes.length>0){
      likeList.unshift(<TagModifyItem content={tmpLikes} press={()=>likeList.pop()} id={-1} search={0}/>)
      setLikeInput('')
      setLikeList(likeList);
    }

    let tmpDisLikes = dislikeInput.slice(0, dislikeInput.length-1).trim();
    if(dislikeInput[dislikeInput.length-1]===' ' && tmpDisLikes.length>0){
      dislikeList.unshift(<TagModifyItem content={tmpDisLikes} press={()=>dislikeList.pop()} id={-1} search={0}/>)
      setDisLikeInput('')
      setDisLikeList(dislikeList);
    }
  })

  return(
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <area.Container>
      <View style={{marginBottom:16, position:'absolute', bottom:0, left:0, right:0, flex:1}}>
        <ConditionButton height={44} active={1} press={goNext} content={modify===1 ? "캐릭터 정보 수정 완료" : "캐릭터 생성 완료"} paddingH={0} paddingV={14}/>
      </View>
      <ScrollView>
        <area.ContainerBlank20>
          <ProgressArea navigation={navigation} title="어떤 캐릭터인가요?" step={3} intro="캐릭터의 특징을 생각해 보아요."/>

          <View style={{marginBottom:16}}>
            <ConditionTextInput height={44} placeholder="한 줄 소개 (필수)" onChange={()=>{}} keyboard={'default'} active={1}/>
            {err===1 ? <WarningText content="무야호" marginTop={8}/> : null}
          </View>

          <area.FormArea height='44' style={{marginBottom:16, paddingHorizontal:0}}>
            <input.FormInput height='44' placeholder={likeList.length===0 ? '좋아하는 것' : ''}
            onChangeText={(input)=>setLikeInput(input)} value={likeInput}/>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{marginRight:16, flex:1}}>
              <area.RowArea>{likeList}</area.RowArea>
            </ScrollView>
          </area.FormArea>

          <area.FormArea height='44' style={{marginBottom:16, paddingHorizontal:0}}>
            <input.FormInput height='44' placeholder={dislikeList.length===0 ? '싫어하는 것' : ''}
            onChangeText={(input)=>setDisLikeInput(input)} value={dislikeInput}/>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{marginRight:16, flex:1}}>
              <area.RowArea>{dislikeList}</area.RowArea>
            </ScrollView>
          </area.FormArea>

          <input.FormInput height='148' placeholder='이외에도 캐릭터에 대해서 자유롭게 알려 주세요!&#13;&#10;예시: 난 고민따위 하지 않는다' onChangeText={()=>{}} multiline={true}
          style={{textAlignVertical: 'top', paddingTop:16}}/>
        </area.ContainerBlank20>
      </ScrollView>
    </area.Container>
    </TouchableWithoutFeedback>
  );
}