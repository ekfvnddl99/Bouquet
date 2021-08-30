import React, {Component, useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView
} from 'react-native';
import i18n from 'i18n-js';
import * as ImagePicker from 'expo-image-picker';
import {colors} from '../../styles/colors';
import * as area from '../../styles/styled-components/area';
import * as text from '../../styles/styled-components/text';
import * as input from '../../styles/styled-components/input';
import * as elses from '../../styles/styled-components/elses';

// icons
import GallerySvg from '../../assets/Gallery';

// props & logic
import {getByte} from '../../logics/non-server/Calculation';
import { UserDupAsync } from '../../logics/server/Auth';
import { editUserAsync } from '../../logics/User';

// components
import ProgressArea from '../../components/item/ProgressArea';
import ConditionText from '../../components/text/ConditionText';
import ConditionButton from '../../components/button/ConditionButton';
import PrimaryTextButton from '../../components/button/PrimaryTextButton';
import ConditionTextInput from '../../components/input/ConditionTextInput';
import WarningText from '../../components/text/WarningText';
import BackButton from '../../components/button/BackButton';
import { SettingProps } from '../../utils/types/types';
import ProfileItem from '../../components/item/ProfileItem';
import useUser from '../../logics/useUser';

export default function SettingProfileScreen({navigation} : SettingProps){
  const[name, setName]=useState('');
  const[profile, setProfile]=useState('');

  const[IsOK, setIsOK]=useState(false);
  const[conArray, setConArray]=useState([false, false, false]);
  const errText=["별명을 입력해 주세요.", "별명 규칙을 지켜야 해요."];

  const[dupResult, setDupResult]=useState(false);

  useEffect(()=> {
    const IsDupName=async()=>{
      const result = await UserDupAsync(name);
      if(typeof(result)!=='string') setDupResult(!result);
      else alert(result);
    }
    let tmpArray=[...conArray];
    if(name.length>0) tmpArray[0]=true;
    else tmpArray[0]=false;
    if(getByte(name)<=20 && getByte(name)>0) tmpArray[1]=true;
    else tmpArray[1]=false;
    // 중복 조건
    IsDupName();
    if(name.length>0 && dupResult) tmpArray[2]=true;
    else tmpArray[2]=false;
    setConArray(tmpArray);
  }, [name])
  useEffect(()=>{
    if(conArray.includes(false)) setIsOK(false);
    else setIsOK(true);
  })

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('이미지를 업로드하려면 권한이 필요해요.');
      }
    })();
  }, []);
  const onPress = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setProfile(result.uri);
    }
  };

  const changeNgoProfile=async()=>{
    const result=await editUserAsync(name, profile);
    console.log(result)
    navigation.popToTop();
  }

  const goDeletion=()=>{
    navigation.navigate('SettingAccountDeletionOne');
  }

  return(
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <area.Container>
        <area.RowArea style={{paddingHorizontal:30, paddingVertical:16}}>
          <BackButton/>
          <View style={{flex:1}}/>
          <ProfileItem diameter={28}/>
        </area.RowArea>

        <KeyboardAvoidingView style={{flex:1}} behavior={'height'}>
          <area.ContainerBlank20>
            <ScrollView contentContainerStyle={{flexGrow:1}} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'always'}>
              <text.Subtitle1 color={colors.black} style={{marginBottom:32}}>{i18n.t('계정 프로필 수정')}</text.Subtitle1>

              <View style={{alignItems:'center', marginBottom:32}}>
                <TouchableOpacity onPress={onPress}>
                {profile ? <elses.CircleImg diameter={180} source={{ uri: profile }}/>
                  : <elses.Circle diameter={180}><GallerySvg w='24' h='24'/></elses.Circle>}
                </TouchableOpacity>
              </View>

              <ConditionTextInput height={44} placeholder={i18n.t("별명")}
                onChange={(text: string) => setName(text)}
                keyboard={'default'}
                active={!(conArray[0]&&conArray[1]&&conArray[2])}
                value={name}
                warnText={!conArray[0] ? errText[0] : errText[1]}
                conditions={
                  <View>
                    <ConditionText content={i18n.t("20 byte 이하")} active={conArray[1]}/>
                    <ConditionText content={i18n.t("중복되지 않는 이름")} active={conArray[2]}/>
                  </View>
                }
                byte={20}
              />

              <area.BottomArea style={{marginBottom:16}}>
                <TouchableOpacity style={{alignItems:'center'}} onPress={goDeletion}>
                  <text.Button3 color={colors.warning_red} style={{marginBottom:16}}>{i18n.t('계정 삭제')}</text.Button3>
                </TouchableOpacity>
                <ConditionButton active={IsOK} press={IsOK ? changeNgoProfile : ()=>{}} content={i18n.t("계정 프로필 수정 완료")} paddingH={0} paddingV={14} height={45}/>
              </area.BottomArea>
            </ScrollView>
          </area.ContainerBlank20>
        </KeyboardAvoidingView>
      </area.Container>
    </TouchableWithoutFeedback>
  );
}