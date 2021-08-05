import React, {Component, useState} from 'react';
import {
    View,
    Text,
    Button,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {colors} from '../../styles/colors';
import * as area from '../../styles/styled-components/area';
import * as text from '../../styles/styled-components/text';
import * as button from '../../styles/styled-components/button';

// props & logic
import * as cal from '../logics/Calculation';

// components
import SunButton from './SunButton';
import ProfileButton from './ProfileButton';

export default function PostingItem({press, id}  :{press:number, id:number}){
  const[isPress, setIsPress]=useState(-1);
  const navigation=useNavigation();
  const goPosting=()=>{
    navigation.navigate("PostItem");
  }
    return(
      <button.BigListButton color={colors.white} paddingH={10} paddingV={10} onPress={goPosting} activeOpacity={1}>
        <area.RowArea>
          <View style={styles.profileArea}>
              <ProfileButton diameter={30} account={0}/>
          </View>
          <View style={styles.timeArea}>
              <text.Caption color={colors.gray5}>{cal.timeName(57)} 전</text.Caption>
          </View>
        </area.RowArea>
        <View style={{marginVertical:10}}>
            <Text>Nothing</Text>
        </View> 
        <View style={styles.sunArea}>
          <SunButton sun={100}/>
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