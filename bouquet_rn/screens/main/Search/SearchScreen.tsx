import React, {Component} from 'react';
import {
    View,
    Text,
    ScrollView, 
    StyleSheet,
    TextInput,
    FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {colors} from '../../../styles/colors'

// components
import RecentSearchItem from '../../components/RecentSearchItem';
import CharacterItem from '../../components/CharacterItem';
import PostingItem from '../../components/PostingItem';

// icons
import SearchSvg from '../../../assets/Search';

export default function SearchScreen(){
    // dummy data - 서버에서 불러와야 함.
    let oneData=['김', '현', '지'];
    let twoData=[{name:'김', introduction:'a'},{name:'김', introduction:'b'},{name:'김', introduction:'c'}];
    let threeData=[{name:'김', time:30,content:'배', sun:1400},{name:'현', time:60,content:'고', sun:14000},{name:'지', time:2657,content:'파', sun:400}];

    return(
        <SafeAreaView style={styles.container}>
          <ScrollView>
          <View style={{marginLeft : 30}}>
            <View style={styles.searchView}>
              <View style={{marginLeft: 10}}><SearchSvg w='15' h='15'/></View>
              <View style={styles.searchBar}>
                <TextInput placeholder="무엇이 궁금한가요?"/>
              </View>
            </View>
              <View style={styles.view}>
                <View style={styles.titleText}><Text>최근 검색어</Text></View>
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
              <View style={styles.view}>
                <View style={styles.titleText}><Text>인기 부캐</Text></View>
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
              <View style={styles.postView}>
                <View style={styles.titleText}><Text>인기 게시물</Text></View>
                <FlatList
                  data={threeData}
                  showsVerticalScrollIndicator={false}
                  renderItem={(obj)=>{
                    return(
                      <PostingItem name={obj.item.name} time={obj.item.time} content={obj.item.content} sun={obj.item.sun}/>
                    ); 
                  }}></FlatList>
              </View>
          </View>
          </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: colors.gray0,
    },
    searchView: {
        height:50,
        backgroundColor: colors.white,
        flexDirection:'row',
        alignItems:'center',
        marginTop: 30,
        marginBottom:10,
        borderRadius:10,
        marginRight:30,
    },
    searchBar: {
        flex:1,
        marginLeft: 10,
    },
    view: {
        marginVertical:20,
    },
    postView:{
        marginVertical:20,
        marginRight:30,
    },
    titleText:{
        marginBottom:12,
    }
})