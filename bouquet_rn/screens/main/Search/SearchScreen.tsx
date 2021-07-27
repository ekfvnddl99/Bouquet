import React, {Component} from 'react';
import {
    View,
    Text,
    ScrollView, 
    StyleSheet,
    TextInput,
    FlatList,
} from 'react-native';
import {colors} from '../../../styles/colors'
import * as area from '../../../styles/styled-components/area';
import * as text from '../../../styles/styled-components/text';

// props & logic
import type {SearchProps} from '../../../utils/types';

// components
import RecentSearchItem from '../../components/RecentSearchItem';
import CharacterItem from '../../components/CharacterItem';
import PostingItem from '../../components/PostingItem';
import EpisodeMiniItem from '../../components/EpisodeMiniItem';

// icons
import SearchSvg from '../../../assets/Search';

export default function SearchScreen({navigation} : SearchProps){
    // dummy data - 서버에서 불러와야 함.
    let oneData=['김guswlej', '현', '지', '현', '지', '현', '지', '현', '지', '현', '지', '현', '지'];
    let Data=[1,2,3,4,5,6,7,8,9];

    return(
        <area.Container>
          <ScrollView
            showsVerticalScrollIndicator={false}>

          <area.ContainerBlank30>
            <View style={styles.searchView}>
              <View style={{marginLeft: 18, marginRight:10}}><SearchSvg w='15' h='15'/></View>
              <View style={{flex:1}}><TextInput placeholder="무엇이 궁금한가요?"/></View>
            </View>
          </area.ContainerBlank30>

          <View style={{marginLeft : 30}}>

              <View style={{marginTop:30}}>
                <text.Subtitle3 color={colors.black}>최근 검색어</text.Subtitle3>
                <FlatList
                  style={{marginTop:12}}
                  data={oneData}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  renderItem={(obj)=>{
                    return(
                      <RecentSearchItem content={obj.item}/>
                    ); 
                  }}>
                </FlatList>
              </View>

              <View style={{marginTop:40}}>
                <text.Subtitle3 color={colors.black}>인기 부캐</text.Subtitle3>
                <FlatList
                  style={{marginTop:12}}
                  data={Data}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  renderItem={(obj)=>{
                    return(
                      <CharacterItem/>
                    ); 
                  }}></FlatList>
              </View>

              <View style={{marginTop:40}}>
                <text.Subtitle3 color={colors.black}>인기 에피소드</text.Subtitle3>
                <FlatList
                  style={{marginTop:12}}
                  data={Data}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  renderItem={(obj)=>{
                    return(
                      <EpisodeMiniItem navigation={navigation}/>
                    ); 
                  }}></FlatList>
              </View>

          </View>

          <area.ContainerBlank30 style={{marginTop:10}}>
            <text.Subtitle3 color={colors.black}>인기 게시물</text.Subtitle3>
            <FlatList
              style={{marginTop:12}}
              data={Data}
              showsVerticalScrollIndicator={false}
              renderItem={(obj)=>{
                return(
                  <PostingItem/>
                ); 
              }}></FlatList>
          </area.ContainerBlank30>
          </ScrollView>
        </area.Container>
    )
}

const styles = StyleSheet.create({
    searchView: {
        height:40,
        paddingVertical:10,
        backgroundColor: colors.white,
        flexDirection:'row',
        alignItems:'center',
        borderRadius:10,
    },
})
