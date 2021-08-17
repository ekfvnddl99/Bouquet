import React, {Component, useState, useEffect} from 'react';
import {
    View,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard,
    BackHandler,
    KeyboardAvoidingView
} from 'react-native';
import i18n from 'i18n-js';
import { useNavigation, useRoute, useFocusEffect, RouteProp } from '@react-navigation/native';
import {colors} from '../../styles/colors';
import * as area from '../../styles/styled-components/area';
import * as button from '../../styles/styled-components/button';
import * as text from '../../styles/styled-components/text';
import * as input from '../../styles/styled-components/input';
import { useRecoilState } from 'recoil';

// props & logic
import type {ChaGenerationProps} from '../../utils/types';
import { ChaGenerationStackParam } from '../../utils/types';
import { bottomBarHideState, noCharacter, characterListState } from '../logics/atoms';
import { createCharacterAsync, editCharacterAsync } from '../logics/Character';
import useCharacter, { setCharacterListAsync } from '../logics/useCharacter';
import UploadImageAsync from '../logics/UploadImage';

// components
import ProgressArea from '../components/ProgressArea';
// screens
import ChaGenerationScreenOne from './ChaGenerationScreenOne';
import ChaGenerationScreenTwo from './ChaGenerationScreenTwo';
import ChaGenerationScreenThree from './ChaGenerationScreenThree';
import ChaGenerationScreenFour from './ChaGenerationScreenFour';
import { StackNavigationProp } from '@react-navigation/stack';

function setTitle(step:number){
  if(step===1) return i18n.t("어떤 모습인가요");
  else if(step===2) return i18n.t("이 캐릭터는 누구인가요");
  else if(step===3) return i18n.t("어떤 캐릭터인가요");
  else return i18n.t("캐릭터 생성 완료")+"!";
}

function setIntro(step:number){
  if(step===1) return i18n.t("이 캐릭터의 겉모습을 생각해 보아요");
  else if(step===2) return i18n.t("이름, 직업 등 이 캐릭터의 기본 정보를 정해 보아요");
  else if(step===3) return i18n.t("캐릭터의 특징을 생각해 보아요");
  else return null;
}
type ParamList = {
  ProfileDetail: {
    modify: number;
  };
};
export default function ChaGenerationScreen(){
  const[step, setStep]=useState(1);
  const navigation = useNavigation<StackNavigationProp<ChaGenerationProps>>();
  const route = useRoute<RouteProp<ParamList, 'ProfileDetail'>>();
  const modify = route.params?.modify;
  const [hide, setHide] = useRecoilState(bottomBarHideState);

  const [characterToCreate, setCharacterToCreate] = useState(noCharacter);
  const [character, setCharacter] = useCharacter();
  const [characterList, setCharacterList] = useRecoilState(characterListState);

  useEffect(() => {
    setHide(true);

    return () => {
      setHide(false);
    }
  }, []);

  const pressBack = () => {
    setHide(false);
  }

  const backAction=()=>{
    if(step!==1) setStep(step-1);
    else navigation.goBack();
    return true;
  }
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  });

  const create = async () => {
    let realCharacter = {...characterToCreate};
    if (characterToCreate.profileImg) {
      const img = await UploadImageAsync(characterToCreate.profileImg);
      if (typeof(img) !== "string") {
        realCharacter.profileImg = img.url;
      }
      else {
        alert("이미지 업로드에 실패했어요. 프로필 이미지를 기본 이미지로 설정할게요.");
        realCharacter.profileImg = "https://i.pinimg.com/736x/05/79/5a/05795a16b647118ffb6629390e995adb.jpg";
      }
    }
    else {
      realCharacter.profileImg = "https://i.pinimg.com/736x/05/79/5a/05795a16b647118ffb6629390e995adb.jpg";
    }

    let func = createCharacterAsync;
    if (modify === 1) {
      func = editCharacterAsync;
    }

    const result = await func(realCharacter);

    if (typeof(result) !== "string") {
      setCharacter({
        ...realCharacter,
        id: result.id
      });
      await setCharacterListAsync(setCharacterList);
      setStep(step+1);
    }
    else {
      alert(result);
    }
  }

  return(
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <area.Container> 
        <View style={{paddingHorizontal:20, paddingTop:20}}>
          <ProgressArea back={()=>setStep(step-1)} step={step} title={setTitle(step)} intro={setIntro(step)} navigation={navigation} press={pressBack}/>
        </View>
        {step===1 ? <ChaGenerationScreenOne modify={modify} onChange={()=>setStep(step+1)}
          characterToCreate={characterToCreate}
          setCharacterToCreate={setCharacterToCreate}
        /> :
        step===2 ? <ChaGenerationScreenTwo modify={modify} onChange={()=>setStep(step+1)}
          characterToCreate={characterToCreate}
          setCharacterToCreate={setCharacterToCreate}
        /> :
        step===3 ? <ChaGenerationScreenThree modify={modify} onChange={create}
          characterToCreate={characterToCreate}
          setCharacterToCreate={setCharacterToCreate}
        /> : 
        <ChaGenerationScreenFour modify={modify} navigation={navigation}/>}
      </area.Container>
    </TouchableWithoutFeedback>
  );
}
