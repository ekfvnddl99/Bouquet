import React from 'react';
import {
    View,
} from 'react-native';
import {colors} from '../../styles/colors';
import * as text from '../../styles/styled-components/text';
import * as elses from '../../styles/styled-components/elses';

// components
import BackButton from '../components/BackButton';

function CheckStep(step : number){
  if(step===1) return '25%';
  else if(step===2) return '50%';
  else if(step===3) return '75%';
  else return '100%';
}

export default function ProgressArea({navigation, title, step, intro} : {navigation : any, title : string, step : number, intro:string|null}){
  return(
    <View style={{marginBottom:32}}>
      <BackButton navigation={navigation}/>
      <View style={{marginTop:20, marginBottom:24}}>
        <elses.Bar width='100%' color={colors.alpha20_primary}/>
        <elses.Bar width={CheckStep(step)} color={colors.primary}/>
      </View>
      <text.Subtitle1 color={colors.black}>{title}</text.Subtitle1>
      {intro===null ? null : <View style={{marginTop:8}}><text.Caption color={colors.gray6}>{intro}</text.Caption></View>}
    </View>
  );
}