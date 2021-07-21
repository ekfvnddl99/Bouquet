import React from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet,
    Image,
    Text
} from 'react-native';
import {colors} from '../../styles/colors'
import XSvg from '../../assets/X'

export default function RecentSearchItem({content} : {content : string}){
    return(
        <TouchableOpacity style={styles.button}>
            <Text>{content}</Text>
            <TouchableOpacity><XSvg w='25' h='25'/></TouchableOpacity>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button:{
        height: 28,
        backgroundColor: colors.white,
        borderRadius: 10,
        marginRight: 5,
        flexDirection:'row',
        alignItems:'center',
        paddingLeft: 10,
    },
})