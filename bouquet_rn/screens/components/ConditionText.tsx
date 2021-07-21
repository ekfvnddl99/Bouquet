import React from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';
import {colors} from '../../styles/colors';
import * as text from '../../styles/styled-components/text';
import * as elses from '../../styles/styled-components/elses';

// icons
import CheckSvg from '../../assets/Check';
import CheckFocusSvg from '../../assets/CheckFocus';

// components
import BackButton from '../components/BackButton';

function CheckStep(step : number){
  if(step===1) return '25%';
  else if(step===2) return '50%';
  else if(step===3) return '75%';
  else return '100%';
}

export default function ProgressArea({condition, active} : {condition : string, active : number}){
  return(
    <View>
      {active===1 ? 
      <View style={styles.condition}>
        <CheckFocusSvg w='15' h='15'/>
        <text.PrimaryText> {condition}</text.PrimaryText>
      </View>
     :
      <View style={styles.condition}>
        <CheckSvg w='15' h='15'/>
        <text.SubGrayText> {condition}</text.SubGrayText>
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