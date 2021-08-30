import React, {Component, useState, useRef} from 'react';
import {
    View,
    Text,
    Button,
    StyleSheet,
    TouchableOpacity,
    Animated,
    PanResponder,
    Dimensions,
    GestureResponderHandlers
} from 'react-native';
import i18n from 'i18n-js';
import { Swipeable } from 'react-native-gesture-handler';
import {colors} from '../../styles/colors';
import * as area from '../../styles/styled-components/area';
import * as elses from '../../styles/styled-components/elses';
import * as text from '../../styles/styled-components/text';
import * as button from '../../styles/styled-components/button';

// icons
import BinWhiteSvg from '../../assets/BinWhite';

// props & logic
import * as cal from '../logics/Calculation';
import { useEffect } from 'react';

const SWIPE = 50
export default function NotificationItem({press, id, name, content}  :{press:number, id:number, name:string, content:string}){
  const drag = useRef(new Animated.Value(0)).current;
  const TranslateX = drag.interpolate({
    inputRange: [-SWIPE, 0],
    outputRange: [-SWIPE, 0],
    extrapolate: 'clamp',
  });

  const _panResponder = useRef(PanResponder.create({
    onMoveShouldSetPanResponderCapture: () => true,
    onPanResponderMove: Animated.event([null, {dx: drag}]),
    onPanResponderRelease: (e, {vx, dx}) => {
      if(dx>0){
        Animated.spring(drag, {
          toValue: 0,
          useNativeDriver: false
        }).start();
      }
    }
  })).current;

    return(
      <View style={{flexDirection:'row', alignItems:'center', flex:1, marginHorizontal:30}}>
        <View style={styles.bin}>
          <View style={{alignItems:'center'}}><BinWhiteSvg w='24' h='24'/></View>
        </View>
        <Animated.View style={[{width: '100%'}, 
        {transform : [{translateX: TranslateX}]}]} {..._panResponder.panHandlers}>
          <button.NotificationButton activeOpacity={1}>
            <elses.CircleImg diameter={20} source={require('../../assets/img.jpg')}/>
            <View style={styles.contentText}>
              <area.RowArea>
                <text.Body2B color={colors.black}>{name}
                  <text.Body2R color={colors.black}>{content}</text.Body2R>
                </text.Body2B>
              </area.RowArea>
            </View>
            <View style={styles.timeText}>
                <text.Caption color={colors.gray5}>{cal.timeName(57)} {i18n.t('전')}</text.Caption>
            </View>
          </button.NotificationButton>
        </Animated.View>
      </View>
    );
}

const styles = StyleSheet.create({
  contentText:{
      flex:2,
      marginLeft: 10,
  },
  timeText:{
      flex:1,
      alignItems:'flex-end',
  },
  bin:{
    alignItems:'center',
    paddingLeft:20,
    marginBottom:10,
    justifyContent:'center',
    backgroundColor:colors.warning_red,
    width:70,
    borderRadius: 11,
    position:'absolute',
    right:0,
    bottom:0,
    top:0
  }
})