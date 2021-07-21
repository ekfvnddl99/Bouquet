import React, {Component, useState} from 'react';
import {
    View,
    Text,
    Button,
    StyleSheet,
    FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {colors} from '../../../styles/colors'
import NotificationItem from '../../components/NotificationItem';


import HomeSvg from '../../../assets/Home';


export default function NotificationScreen(){
    // dummy data - 서버에서 불러와야 함
    const [name, setName] = useState('단호좌현지');
    let data=['고광서','김현지','오태진'];

    return(
        <SafeAreaView style={styles.container}>
            <View style={{marginHorizontal: 30}}>
                <View style={styles.title}>
                    <View style={styles.titleText}>
                        <Text>{name}의</Text>
                        <Text>알림</Text>
                    </View>
                    <HomeSvg w='20' h='20'/>
                </View>
                <View>
                    {data.length===0 ? <View style={styles.content}><Text style={styles.blankText}>이제 확인할 알림이 없어요!</Text></View> : 
                    <FlatList data={data} renderItem={(obj)=>{
                        return(<NotificationItem content={obj.item} time={2780}/>);}}>
                    </FlatList>}
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.gray0,
    },
    title:{
        flexDirection : 'row',
        marginTop:30,
        alignItems:'center',
    },
    titleText:{
        flex:1,
    },
    content:{
        alignItems:'center',
        marginTop:10,
    },
    blankText:{
        color: colors.gray6,
    }
})