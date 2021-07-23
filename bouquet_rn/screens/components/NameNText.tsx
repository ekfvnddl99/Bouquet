import React from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';
import { colors } from '../../styles/colors';
import * as text from '../../styles/styled-components/text';

export default function NameNText({name, sub} : {name : string, sub : string}){
  return(
    <View style={styles.view}>
      <text.Subtitle2B color={colors.black}>{name}</text.Subtitle2B>
      <text.Subtitle2R color={colors.black}>{sub}</text.Subtitle2R>
    </View>
  );
}

const styles = StyleSheet.create({
  view:{
    flexDirection:'row',
    alignItems:'center',
  }
})