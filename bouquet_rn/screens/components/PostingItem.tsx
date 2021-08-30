import React, {Component, useState, useCallback,useMemo} from 'react';
import {
    View,
    Text,
    Button,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import i18n from 'i18n-js';
import { useNavigation } from '@react-navigation/native';
import {colors} from '../../styles/colors';
import * as area from '../../styles/styled-components/area';
import * as text from '../../styles/styled-components/text';
import * as button from '../../styles/styled-components/button';
import { useRecoilState } from 'recoil';

// props & logic
import * as cal from '../logics/Calculation';
import { PostInterface, AllPostRequestType, RequestToPostAsync } from '../logics/Post';
import { viewPostState } from '../logics/atoms';

// components
import SunButton from './SunButton';
import ProfileButton from './ProfileButton';

import TextTemplate from '../template/TextTemplate';
import ImageTemplate from '../template/ImageTemplate';
import AlbumTemplate from '../template/AlbumTemplate';
import DiaryTemplate from '../template/DiaryTemplate';
import ListTemplate from '../template/ListTemplate';
import { useEffect } from 'react';

export default function PostingItem({press, id, info}  :{press:number, id:number, info?:PostInterface<AllPostRequestType>}){
  const navigation=useNavigation();
  const [viewPost, setViewPost] = useRecoilState(viewPostState);
  const goPosting= ()=>{
    if (info) {
      setViewPost(info);
      navigation.navigate("PostItem");
    }
  }

  const getTemplate = useCallback(() => {
    if (info) {
      switch (info.template.template) {
        case "None":
          return <TextTemplate mode="mini" content={info.template.text} />;
        case "Image":
          return <ImageTemplate mode="mini" post={info} />;
        case "Diary":
          return <DiaryTemplate mode="mini" post={info} />;
        case "Album":
          return <AlbumTemplate mode="mini" post={info} />;
        case "List":
          return <ListTemplate mode="mini" post={info} />;
        default:
          return null;
    }
  }
  else return null;
  }, [info]);
  const template = useMemo(() => getTemplate(), [getTemplate]);


    return(
      <button.BigListButton color={colors.white} paddingH={10} paddingV={10} onPress={goPosting} activeOpacity={1}>
        <area.RowArea>
          <View style={styles.profileArea}>
              <ProfileButton diameter={30} account={0} name={info ? info.characterName : ''} profile={info ? info.characterImg : ''}/>
          </View>
          <View style={styles.timeArea}>
              <text.Caption color={colors.gray5}>{cal.timeName(1)} {i18n.t('전')}</text.Caption>
          </View>
        </area.RowArea>
        <View style={{marginVertical:10}}>
            {template}
        </View> 
        <View style={styles.sunArea}>
          <SunButton active={info ? info.liked : false} sun={info? info.numSunshines : 0}/>
        </View>
      </button.BigListButton>
    );
}

const styles = StyleSheet.create({
    profileArea:{
        flex:2,
        flexDirection:'row',
        alignItems:'center',
    },
    timeArea:{
        flex:1,
        alignItems:'flex-end',
    },
    sunArea:{
        alignItems:'flex-start'
    },
})