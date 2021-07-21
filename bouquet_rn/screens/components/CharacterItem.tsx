import React, {Component, useState} from 'react';
import {
    View,
    Text,
    Button,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import {colors} from '../../styles/colors'

import HomeSvg from '../../assets/Home';


export default function CharacterItem({name, introduction} : {name: string, introduction : string}){
    return(
        <TouchableOpacity style={styles.button}>
            <HomeSvg w='100' h='100'/>
            <View style={styles.text}><Text>{name}</Text></View>
            <View style={styles.text}><Text>{introduction}</Text></View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button:{
        flex:1,
        alignItems: 'center',
        backgroundColor: colors.white,
        borderRadius: 10,
        marginRight:10,
        paddingHorizontal: 25,
        paddingVertical: 18,
        width:150,
    },
    text:{
        marginTop:8,
    }
})