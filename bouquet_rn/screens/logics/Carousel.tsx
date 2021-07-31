import React, {Component, useState} from 'react';
import {
    View,
    FlatList,
    StyleSheet
} from 'react-native';
import { colors } from '../../styles/colors';

// components
import ProfileDetailItem from '../components/ProfileDetailItem';

interface carouselProps{
  pages:number[],
  offset:number,
  gap:number,
  pageWidth:number
}

export default function Carousel({pages, offset, gap, pageWidth} : carouselProps){
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
        contentContainerStyle={{paddingHorizontal: offset + gap / 2, backgroundColor:colors.black}}
        data={pages}
        decelerationRate="fast"
        horizontal
        pagingEnabled
        snapToInterval={pageWidth + gap}
        snapToAlignment='center'
        showsHorizontalScrollIndicator={false}
        renderItem={()=>{
          return(
            <View style={{width: pageWidth, marginHorizontal: gap / 2}}><ProfileDetailItem mini={0}/></View>
          );
        }}/>
    </View>
  )
}