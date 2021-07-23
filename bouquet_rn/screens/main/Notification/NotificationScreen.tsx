import React, {Component, useState} from 'react';
import {
    View,
    Text,
    Button,
    StyleSheet,
    FlatList,
} from 'react-native';
import {colors} from '../../../styles/colors';
import * as area from '../../../styles/styled-components/area';
import * as text from '../../../styles/styled-components/text';
import * as elses from '../../../styles/styled-components/elses';

// components
import NotificationItem from '../../components/NotificationItem';
import NameNText from '../../components/NameNText';

export default function NotificationScreen(){
    // dummy data - 서버에서 불러와야 함
    const [name, setName] = useState('단호좌현지');
    let data=['고광서','김현지','오태진'];

    return(
      <area.Container>
        <area.ContainerBlank30>
          <area.RowArea top={30}>
            <View style={{flex:1}}>
              <NameNText name={name} sub="의"/>
              <text.Subtitle2R color={colors.black}>알림</text.Subtitle2R>
            </View>
            <elses.Circle radius={40} vertical={0}/>
          </area.RowArea>
            <View>
              {data.length===0 ? 
              <area.RowArea top={10}><text.Caption color={colors.gray6}>이제 확인할 알림이 없어요!</text.Caption></area.RowArea> : 
              <View style={{marginTop: 30}}><FlatList data={data} renderItem={(obj)=>{
                  return(<NotificationItem content={obj.item} time={2780}/>);}}>
              </FlatList></View>}
            </View>
        </area.ContainerBlank30>
      </area.Container>
    )
}
