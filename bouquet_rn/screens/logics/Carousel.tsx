import React, {Component, useState} from 'react';
import {
    View,
    FlatList,
    StyleSheet,
    TouchableWithoutFeedback
} from 'react-native';
import { colors } from '../../styles/colors';

// components
import ProfileDetailItem from '../components/ProfileDetailItem';

interface carouselProps{
  pages:any[],
  offset:number,
  gap:number,
  pageWidth:number
}

export default function  Carousel({pages, offset, gap, pageWidth} : carouselProps){
  const[selectId, setSelectId]=useState(-1);
  const[page, setPage]=useState(0);
  const onScroll = (e: any) => {
    const newPage = Math.round(
      e.nativeEvent.contentOffset.x / (pageWidth + gap),
    );
    setPage(newPage);
  };
  return(
    <View style={{justifyContent:'center', alignItems:'center'}}>
      <FlatList
        contentContainerStyle={{paddingHorizontal: offset + gap / 2}}
        data={pages}
        onScroll={onScroll}
        decelerationRate="fast" 
        horizontal
        pagingEnabled
        snapToInterval={pageWidth + gap}
        snapToAlignment='center'
        showsHorizontalScrollIndicator={false}
        renderItem={(obj)=>{
          return(
            <TouchableWithoutFeedback onPress={()=>{selectId===obj.index ? setSelectId(-1) : setSelectId(obj.index)}}>
              <View style={{width: pageWidth, marginHorizontal: gap / 2}}>
                <ProfileDetailItem mini={0} press={selectId} id={obj.index}/>
              </View>
            </TouchableWithoutFeedback>
          );
        }}/>
    </View>
  )
}