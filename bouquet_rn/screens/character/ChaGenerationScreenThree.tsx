import React, {Component, useState, useEffect} from 'react';
import {
  View, 
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  BackHandler,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import i18n from 'i18n-js';
import {colors} from '../../styles/colors';
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


export default function ChaGenerationScreenThree({modify, onChange, characterToCreate, setCharacterToCreate} : {modify : number, onChange:any, characterToCreate: Character, setCharacterToCreate: Function}){
  const[IsOK, setIsOK]=useState(false);
  const[conArray, setConArray]=useState([false, false, false]);
  const errText=["필수 입력 항목이에요.", "한 개 이상 입력해주세요."];

  const[likeFocus, setLikeFocus]=useState(false);
  const[dislikeFocus, setDislikeFocus]=useState(false);

  const[likeList, setLikeList] : any=useState(characterToCreate.likes);
  const[dislikeList, setDisLikeList] : any=useState(characterToCreate.hates);
  const[likeInput, setLikeInput] = useState('');
  const[dislikeInput, setDisLikeInput] = useState('');

  function likeTags(blur: number){
    let tmpLikes = likeInput.slice(0, likeInput.length).trim();
    if((likeInput[likeInput.length-1]===' ' || blur===1) && tmpLikes.length>0){
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
    if((dislikeInput[dislikeInput.length-1]===' ' || blur===1) && tmpDisLikes.length>0){
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
  useEffect(()=>{
    let tmpArray=[...conArray];
    if(characterToCreate.intro.length>0) tmpArray[0]=true;
    else tmpArray[0]=false;
    if(characterToCreate.likes.length>0) tmpArray[1]=true;
    else tmpArray[1]=false;
    if(characterToCreate.hates.length>0) tmpArray[2]=true;
    else tmpArray[2]=false;
    setConArray(tmpArray);
  }, [characterToCreate])
  useEffect(()=>{
    if(conArray.includes(false)) setIsOK(false);
    else setIsOK(true);
  })

  return(
    <area.ContainerBlank20>
      <ScrollView>
        <ConditionTextInput height={44} placeholder={i18n.t("한 줄 소개")}
            onChange={(text: string) => {setCharacterToCreate({...characterToCreate, intro: text})}}
            keyboard={'default'}
            active={!(conArray[0])}
            value={characterToCreate.intro}
            warnText={errText[0]}
          />

        <area.NoHeightArea marBottom={0} paddingH={16} paddingV={8}
        style={ likeFocus && likeList.length===0  ? {borderWidth:1, borderColor: colors.warning_red} : null}>
          <View style={{flexDirection:'row', flexWrap:'wrap'}}>
            {likeList.map((data : string, index:number)=>{return(
            <View>
              <TagModifyItem content={data} index={index} search={0} array={likeList} setArray={setLikeList}/>
            </View>
            )})}
            <TextInput placeholder={likeList.length===0 ? i18n.t('좋아하는 것') : ''} onChangeText={(input)=>setLikeInput(input)} value={likeInput} 
            onFocus={()=>setLikeFocus(true)} onBlur={()=>likeTags(1)} style={{flex:1}}/>
          </View>
        </area.NoHeightArea>
        <View style={{marginBottom:16}}>
          {likeFocus && likeList.length===0 ? <WarningText content={errText[1]} marginTop={8}/> : null}
        </View>

        <area.NoHeightArea marBottom={0} paddingH={16} paddingV={8}
        style={ dislikeFocus && dislikeList.length===0  ? {borderWidth:1, borderColor: colors.warning_red} : null}>
          <View style={{flexDirection:'row', flexWrap:'wrap'}}>
            {dislikeList.map((data : string, index:number)=>{return(
            <View>
              <TagModifyItem content={data} index={index} search={0} array={dislikeList} setArray={setDisLikeList}/>
            </View>
            )})}
            <TextInput placeholder={dislikeList.length===0 ? i18n.t('싫어하는 것') : ''} onChangeText={(input)=>setDisLikeInput(input)} value={dislikeInput}
            onFocus={()=>setDislikeFocus(true)} onBlur={()=>dislikeTags(1)} style={{flex:1}}/>
          </View>
        </area.NoHeightArea>
        <View style={{marginBottom:16}}>
          {dislikeFocus && dislikeList.length===0 ? <WarningText content={errText[1]} marginTop={8}/> : null}
        </View>

        <input.FormInput height='148' placeholder={i18n.t('이외에도 캐릭터에 대해서 자유롭게 알려 주세요') + i18n.t('예시: 난 고민따위 하지 않는다')}
          onChangeText={(text: string)=>{setCharacterToCreate({...characterToCreate, tmi: text})}}
          multiline={true}
          style={{textAlignVertical: 'top', paddingTop:16}}
          value={characterToCreate.tmi}
        />
      </ScrollView>
      <area.BottomArea style={{marginBottom:16}}>
        <ConditionButton height={44} active={IsOK} press={IsOK ? onChange : ()=>{}} content={modify===1 ? i18n.t("캐릭터 정보 수정 완료") : i18n.t("캐릭터 생성 완료")} paddingH={0} paddingV={14}/>
      </area.BottomArea>
    </area.ContainerBlank20>
  );
}
