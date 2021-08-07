import React, {Component, useState, useEffect} from 'react';
import {
  View, 
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  BackHandler
} from 'react-native';
import i18n from 'i18n-js';
import * as area from '../../styles/styled-components/area';
import * as input from '../../styles/styled-components/input';

// props & logic
import type {ChaGenerationProps, Character} from '../../utils/types';

// components
import ProgressArea from '../components/ProgressArea';
import ConditionButton from '../components/ConditionButton';
import ConditionTextInput from '../components/ConditionTextInput';
import WarningText from '../components/WarningText';
import TagModifyItem from '../components/TagModifyItem';
import { colors } from '../../styles/colors';
import { template } from 'lodash';


export default function ChaGenerationScreenThree({modify, onChange, characterToCreate, setCharacterToCreate} : {modify : number, onChange:any, characterToCreate: Character, setCharacterToCreate: Function}){
  const[err,setErr]=useState(1);
  const[likeList, setLikeList] : any=useState(characterToCreate.likes);
  const[dislikeList, setDisLikeList] : any=useState(characterToCreate.hates);
  const[likeInput, setLikeInput] = useState('');
  const[dislikeInput, setDisLikeInput] = useState('');

  function likeTags(blur: number){
    let tmpLikes = likeInput.slice(0, likeInput.length).trim();
    if((likeInput[likeInput.length-1]===' ' && tmpLikes.length>0) || blur===1){
      setLikeInput('');
      setLikeList([...likeList, tmpLikes]);
      setCharacterToCreate({
        ...characterToCreate,
        likes: [...likeList, tmpLikes]
      });
    }
  }
  function dislikeTags(blur: number){
    let tmpDisLikes = dislikeInput.slice(0, dislikeInput.length).trim();
    if((dislikeInput[dislikeInput.length-1]===' ' && tmpDisLikes.length>0) || blur===1){
      setDisLikeInput('');
      setDisLikeList([...dislikeList, tmpDisLikes]);
      setCharacterToCreate({
        ...characterToCreate,
        hates: [...dislikeList, tmpDisLikes]
      });
    }
  }

  useEffect(()=>{
    likeTags(0);
    dislikeTags(0);
  });

  return(
    <area.ContainerBlank20>
      <ScrollView>
        <View style={{marginBottom:16}}>
          <ConditionTextInput height={44} placeholder={i18n.t("한 줄 소개 (필수)")}
            onChange={(text: string)=>{setCharacterToCreate({...characterToCreate, intro: text})}}
            keyboard={'default'}
            active={1}
            value={characterToCreate.intro}
          />
          {err===1 ? <WarningText content="무야호" marginTop={8}/> : null}
        </View>

        <area.NoHeightArea marBottom={16} paddingH={16} paddingV={8}>
          <View style={{flexDirection:'row', flexWrap:'wrap'}}>
            {likeList.map((data : string)=>{return(
            <View>
              <TagModifyItem content={data} press={()=>{}} id={-1} search={0}/>
            </View>
            )})}
            <TextInput placeholder={likeList.length===0 ? i18n.t('좋아하는 것') : ''} onChangeText={(input)=>setLikeInput(input)} value={likeInput} onBlur={()=>likeTags(1)}/>
          </View>
        </area.NoHeightArea>

        <area.NoHeightArea marBottom={16} paddingH={16} paddingV={8}>
          <View style={{flexDirection:'row', flexWrap:'wrap'}}>
            {dislikeList.map((data : string)=>{return(
            <View>
              <TagModifyItem content={data} press={()=>{}} id={-1} search={0}/>
            </View>
            )})}
            <TextInput placeholder={dislikeList.length===0 ? i18n.t('싫어하는 것') : ''} onChangeText={(input)=>setDisLikeInput(input)} value={dislikeInput} onBlur={()=>dislikeTags(1)}/>
          </View>
        </area.NoHeightArea>

        <input.FormInput height='148' placeholder={i18n.t('이외에도 캐릭터에 대해서 자유롭게 알려 주세요') + i18n.t('예시: 난 고민따위 하지 않는다')}
          onChangeText={(text: string)=>{setCharacterToCreate({...characterToCreate, tmi: text})}}
          multiline={true}
          style={{textAlignVertical: 'top', paddingTop:16}}
          value={characterToCreate.tmi}
        />
      </ScrollView>
      <area.BottomArea style={{marginBottom:16, overflow:'hidden'}}>
        <ConditionButton height={44} active={1} press={onChange} content={modify===1 ? i18n.t("캐릭터 정보 수정 완료") : i18n.t("캐릭터 생성 완료")} paddingH={0} paddingV={14}/>
      </area.BottomArea>
    </area.ContainerBlank20>
  );
}