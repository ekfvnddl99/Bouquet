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

// components
import RecentSearchItem from '../../components/RecentSearchItem';
import CharacterItem from '../../components/CharacterItem';
import PostingItem from '../../components/PostingItem';
import EpisodeMiniItem from '../../components/EpisodeMiniItem';

// icons
import SearchSvg from '../../../assets/Search';

export default function SearchScreen(){
    // dummy data - 서버에서 불러와야 함.
    let oneData=['김', '현', '지'];
    let twoData=[{name:'김', introduction:'a'},{name:'김', introduction:'b'},{name:'김', introduction:'c'}];
    let threeData=[{name:'김', time:30,content:'배', sun:1400},{name:'현', time:60,content:'고', sun:14000},{name:'지', time:2657,content:'파', sun:400}];
    let fourData=[{name:'김', title:'배'},{name:'현', title:'고'},{name:'지', title:'파'}]

    return(
        <area.Container>
          <ScrollView
            showsVerticalScrollIndicator={false}>

          <area.ContainerBlank30>
            <View style={styles.searchView}>
              <View style={{marginHorizontal: 10}}><SearchSvg w='15' h='15'/></View>
              <View style={{flex:1}}>
                <TextInput placeholder="무엇이 궁금한가요?"/>
              </View>
            </View>
          </area.ContainerBlank30>

          <View style={{marginLeft : 30}}>

              <View style={{marginVertical:20}}>
                <text.Subtitle3 color={colors.black}>최근 검색어</text.Subtitle3>
                <FlatList
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

              <View style={{marginVertical:20}}>
                <text.Subtitle3 color={colors.black}>인기 부캐</text.Subtitle3>
                <FlatList
                  data={twoData}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  renderItem={(obj)=>{
                    return(
                      <CharacterItem name={obj.item.name} introduction={obj.item.introduction}/>
                    ); 
                  }}></FlatList>
              </View>

              <View style={{marginVertical:20}}>
                <text.Subtitle3 color={colors.black}>인기 에피소드</text.Subtitle3>
                <FlatList
                  data={fourData}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  renderItem={(obj)=>{
                    return(
                      <EpisodeMiniItem name={obj.item.name} title={obj.item.title}/>
                    ); 
                  }}></FlatList>
              </View>

          </View>

          <area.ContainerBlank30>
            <text.Subtitle3 color={colors.black}>인기 게시물</text.Subtitle3>
            <FlatList
              data={threeData}
              showsVerticalScrollIndicator={false}
              renderItem={(obj)=>{
                return(
                  <PostingItem name={obj.item.name} time={obj.item.time} content={obj.item.content} sun={obj.item.sun}/>
                ); 
              }}></FlatList>
          </area.ContainerBlank30>
          </ScrollView>
        </area.Container>
    )
}

const styles = StyleSheet.create({
    searchView: {
        height:50,
        backgroundColor: colors.white,
        flexDirection:'row',
        alignItems:'center',
        borderRadius:10,
    },
})
