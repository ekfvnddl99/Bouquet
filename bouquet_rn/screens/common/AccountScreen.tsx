import React, {Component, useState, useRef} from 'react';
import {
    ScrollView,
    FlatList,
    View,
    TouchableWithoutFeedback,
    StyleSheet,
    Animated,
} from 'react-native';
import {colors} from '../../styles/colors';
import * as area from '../../styles/styled-components/area';
import * as text from '../../styles/styled-components/text';
import * as elses from '../../styles/styled-components/elses';
import * as button from '../../styles/styled-components/button';

// props & logic
import { StatusBarHeight } from '../logics/StatusbarHeight';
import * as cal from '../logics/Calculation';

// components
import BackButton from '../components/BackButton';
import CharacterItem from '../components/CharacterItem';
import ProfileInfoText from '../components/ProfileInfoText';

const HEADER_MAX_HEIGHT = 80;
const HEADER_MIN_HEIGHT = 60;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

export default function AccountScreen(){
  // dummy data - 서버에서 불러와야 함
  let Data=[{id:1},{id:2},{id:3},{id:4},{id:5},{id:6},{id:7},{id:8},{id:9}];
  if(Data.length%2===1) Data.push({id:-1});

  const [press, setPress] = useState(0);
  const[selectId, setSelectId]=useState(-1);

  const scroll = useRef(new Animated.Value(0)).current;
  const OpacityHeader=scroll.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE/2, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 0.5, 1],
    extrapolate: 'clamp',
  });
  
  return(
      <area.Container>
        <Animated.View
          pointerEvents="none"
          style={[styles.header,{ opacity: OpacityHeader }]}>
        </Animated.View>

        <area.RowArea style={{paddingHorizontal:30, paddingVertical:16}}>
          <BackButton navigation={()=>{}}/>
          <View style={{flex:1}}/>
          <elses.CircleImg diameter={28} source={require('../../assets/img.jpg')}/>
        </area.RowArea>

        <Animated.ScrollView
          style={{marginHorizontal:30}}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={1}
          onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scroll } } }],
          { useNativeDriver: true })}>
          <View style={{paddingTop: 20}}/>

          <area.NoHeightArea marBottom={30} paddingH={20} paddingV={20} style={{alignItems:'center'}}>
            <elses.CircleImg diameter={120} source={require('../../assets/img.jpg')}/>
            <text.Subtitle2B color={colors.black} style={{marginVertical:8}}>현지</text.Subtitle2B>
            <area.RowArea style={{justifyContent:'center'}}>
              <ProfileInfoText bold={cal.numName(1200).toString()} regular="팔로워" color={colors.primary} center={1}/>
              <View style={{marginRight:32}}/>
              <ProfileInfoText bold={Data.length.toString()} regular="캐릭터" color={colors.primary} center={1}/>
            </area.RowArea>
          </area.NoHeightArea>

          <View>
            <text.Subtitle3 color={colors.black} style={{marginBottom:16}}>캐릭터</text.Subtitle3>

            <area.RowArea style={{marginBottom:12}}>
              <text.Body2R color={colors.black}>총 </text.Body2R>
              <text.Body2B color={colors.black}>{Data[Data.length-1].id===-1 ? Data.length-1 : Data.length}</text.Body2B>
              <text.Body2R color={colors.black}>명</text.Body2R>
            </area.RowArea>

            <FlatList
              columnWrapperStyle={{justifyContent:'space-between'}}
              contentContainerStyle={{justifyContent:'center'}}
              data={Data}
              keyExtractor={(item) => item.id.toString()}
              numColumns={2}
              showsHorizontalScrollIndicator={false}
              renderItem={(obj)=>{
                return(
                  <View style={{ flex:0.5, marginBottom:13, marginHorizontal:8}}>
                    {obj.item.id===-1 ? <View/>
                    : 
                    <TouchableWithoutFeedback onPress={()=>{selectId===obj.index ? setSelectId(-1) : setSelectId(obj.index)}}>
                      <CharacterItem press={selectId} id={obj.index}/>
                    </TouchableWithoutFeedback>
              }
                  </View>
                ); }}/>
          </View>
        </Animated.ScrollView>
      </area.Container>
  );
}

const styles=StyleSheet.create({
  header: {
    position: 'absolute',
    left: 0,
    right: 0,
    top:0,
    backgroundColor: colors.white,
    overflow: 'hidden',
    height: HEADER_MIN_HEIGHT+StatusBarHeight,
    borderRadius:15
  },
})