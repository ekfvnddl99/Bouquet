import React, {useRef, useEffect, useState} from 'react';
import {
    View, Animated, TouchableOpacity
} from 'react-native';
import {colors} from '../../styles/colors';
import * as text from '../../styles/styled-components/text';
import * as elses from '../../styles/styled-components/elses';

// icons
import ArrowLeftSvg from '../../assets/ArrowLeft';

export default function ProgressArea({back, step, title, intro, navigation, press} : {back : any, step:number, title : string, intro:string|null, navigation : any, press?: Function}){
  const[curr, setCurr]=useState(step*25);
  const progress = useRef(new Animated.Value(0)).current;
  const TranslateX = progress.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
    extrapolate: 'clamp',
  });
  useEffect(() => {
    setCurr(25*step);
    Animated.timing(progress, {
      duration: 1000,
      toValue: curr,
      useNativeDriver: false
    }).start();
  })
  const pressBack = () => {
    if (press) {
      press();
    }
    navigation.goBack();
  }
  return(
    <View style={{marginBottom:12}}>
      {step===4 ? <View style={{marginBottom:24}}/> :
      <TouchableOpacity onPress={step===1 ? pressBack : back}>
        <ArrowLeftSvg w='24' h='24'/>
      </TouchableOpacity>}
      <View style={{marginTop:20, marginBottom:24}}>
        <elses.Bar width='100%' color={colors.alpha20_primary}/>
        <Animated.View style={[{width :TranslateX ,height:8, borderRadius:10, position:'absolute', backgroundColor:colors.primary},]}/>
      </View>
      <text.Subtitle1 color={colors.black}>{title}</text.Subtitle1>
      {intro===null ? null : <View style={{marginTop:8}}><text.Caption color={colors.gray6}>{intro}</text.Caption></View>}
    </View>
  );
}1