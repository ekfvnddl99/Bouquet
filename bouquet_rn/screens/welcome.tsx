import * as React from 'react';
import { SafeAreaView, TouchableOpacity, View, Text, StyleSheet } from 'react-native';

import loginButton from './components/loginButton';
import LogoSvg from '../assets/Logo';
import MailSvg from '../assets/Mail';
import AppleSvg from '../assets/AppleLogo';
import GoogleSvg from '../assets/Google';
import TitleSvg from '../assets/Title';

import {colors} from './colors';

export default function welcome() {
  return(
    <SafeAreaView style={styles.container}>
        <View style={{alignItems:'center', marginTop: 70}}>
            <LogoSvg w='100' h='100'/>
        </View>
        <View style={{alignItems:'center', marginTop: 15}}>
            <TitleSvg w='170' h='54'/>
        </View>
        <View style={styles.buttonArea}>
            <loginButton sentence="메일로 가입하기" tag={<MailSvg w='15' h='15'/>}/>
            <loginButton sentence="Google로 계속하기" tag={<GoogleSvg w='15' h='15'/>} press={googleSignInAsync}/>
            <loginButton sentence="Apple로 계속하기" tag={<AppleSvg w='15' h='15'/>}/>
        </View>
        <View style={styles.textNBtn}>
            <Text>또는 </Text>
            <TouchableOpacity onPress={goLogin}>
                <Text style={{color : colors.primary}}>로그인</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.preview}>
            <Text>우선 알아보고 싶다면? </Text>
            <TouchableOpacity onPress={goTabs}>
                <Text style={{color : colors.primary}}>미리보기</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
);
}

const styles = StyleSheet.create({
  container: {
      flex:1,
      backgroundColor: colors.gray0,
  },
  buttonArea:{
      flex:1,
      justifyContent : 'flex-end',
      paddingHorizontal: 20,
      width: '100%',
  },
  button:{
      backgroundColor:colors.white,
      borderRadius:25,
      height:45,
      marginBottom:10,
      alignItems:'center',
      justifyContent:"center",
      padding:18,
      flexDirection: 'row',
      width: '100%'
  },
  preview:{
      backgroundColor:colors.white,
      alignItems: 'center',
      width:'100%',
      justifyContent:"center",
      paddingVertical:20,
      flexDirection:'row'
  },
  btnTextArea: {
      flex: 1,
      alignItems: 'center',
  },
  textNBtn:{
      justifyContent:'center',
      marginTop:15,
      marginBottom:30,
      flexDirection:'row',
  },
});