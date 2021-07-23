import React, {Component, useState} from 'react';
import {
    View,
    ScrollView,
    FlatList,
} from 'react-native';
import {colors} from '../../../styles/colors';
import * as area from '../../../styles/styled-components/area';
import * as text from '../../../styles/styled-components/text';
import * as elses from '../../../styles/styled-components/elses';

// components
import PostingItem from '../../components/PostingItem';
import NameNText from '../../components/NameNText';

export default function NotificationScreen(){
    // dummy data - 서버에서 불러와야 함
    const [name, setName] = useState('단호좌현지');
    let threeData=[{name:'김', time:30,content:'배', sun:1400},{name:'현', time:60,content:'고', sun:14000},{name:'지', time:2657,content:'파', sun:400}];

    return(
        <area.Container>
            <area.ContainerBlank30>

                <area.RowArea top={30}>
                    <View style={{flex:1}}>
                        <NameNText name={name} sub="의"/>
                        <text.Subtitle2R color={colors.black}>피드</text.Subtitle2R>
                    </View>
                    <elses.Circle radius={40} vertical={0}/>
                </area.RowArea>

                <ScrollView style={{marginTop : 30}}>
                  <FlatList
                    data={threeData}
                    showsVerticalScrollIndicator={false}
                    renderItem={(obj)=>{
                      return(
                        <PostingItem name={obj.item.name} time={obj.item.time} content={obj.item.content} sun={obj.item.sun}/>
                      ); 
                    }}></FlatList>
                </ScrollView>
                
            </area.ContainerBlank30>
        </area.Container>
    )
}
