import React from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';
import {colors} from '../../styles/colors';
import * as text from '../../styles/styled-components/text';

// icons
import CheckSvg from '../../assets/Check';
import CheckFocusSvg from '../../assets/CheckFocus';

export default function ConditionText({condition, active} : {condition : string, active : number}){
  return(
    <View>
      {active===1 ? 
      <View style={styles.condition}>
        <CheckFocusSvg w='15' h='15'/>
        <text.Caption color={colors.primary}> {condition}</text.Caption>
      </View>
     :
      <View style={styles.condition}>
        <CheckSvg w='15' h='15'/>
        <text.Caption color={colors.gray6}> {condition}</text.Caption>
      </View>
    }
    </View>
  );
}

const styles = StyleSheet.create({
  condition:{
    flexDirection:'row',
    alignItems:'center',
    marginTop:8,
  }
})