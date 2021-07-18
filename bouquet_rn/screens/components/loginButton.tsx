import React, {Component, useState} from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet,
    Image,
    Text
} from 'react-native';
import {colors} from '../colors'
export default function loginButton(sentence: string, tag: any, press: Function){
    return(
        <TouchableOpacity style={styles.button} onPress={()=>press}>
            {tag}
            <View style={styles.btnTextArea}><Text>{sentence}</Text></View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button:{
        backgroundColor:colors.white,
        borderRadius:25,
        height:45,
        marginTop:10,
        alignItems:'center',
        justifyContent:"center",
        padding:18,
        flexDirection: 'row',
        width: '100%'
    },
    btnTextArea: {
        flex: 1,
        alignItems: 'center',
    },
  });