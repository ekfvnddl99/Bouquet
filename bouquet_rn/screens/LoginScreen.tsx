import React, {Component, useState} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Button,
    KeyboardAvoidingView
} from 'react-native';
import {colors} from '../styles/colors'
import { SafeAreaView } from 'react-native-safe-area-context';

// social login
import GoogleSignInAsync from './logics/GoogleLogin';
import LoginButton from './components/LoginButton';
import GoogleSvg from '../assets/Google';
import AppleSvg from '../assets/Apple';

import ArrowLeftSvg from '../assets/ArrowLeft';
import EyeSvg from '../assets/Eye';
import EyeFocusSvg from '../assets/EyeFocus';

import type {WelcomeProps} from '../utils/types'

function EyeSelect(eye : number){
    if(eye===1){
        return(
            <EyeSvg w='18' h='18'/>
        );
    }
    else{
        return(
            <EyeFocusSvg w='20' h='20'/>
        );
    }
}

export default function LoginScreen({navigation} : WelcomeProps){
    const[mail, setMail]=useState('456');
    const[eye, setEye]=useState(1);

    const goTabs =()=>{
        navigation.replace("Tab");
    };

    return(
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={{marginTop:20, marginLeft:20}} onPress={()=>navigation.goBack()}>
                <ArrowLeftSvg w='24' h='24'/>
            </TouchableOpacity>
            <View style={styles.loginArea}>
                <Text style={{marginTop: 30}}>로그인</Text>
                <TextInput style={styles.loginForm} placeholder='메일' onChangeText={(mail)=>setMail(mail)}/>
                <View style={styles.loginForm}>
                    <TextInput style={{flex: 1}} placeholder='비밀번호'/>
                    <TouchableOpacity style={styles.eye} onPress={()=>{setEye(eye*(-1))}}>
                        {EyeSelect(eye)}
                    </TouchableOpacity>
                </View>
                {mail!=='456' ? 
                <View style={{alignItems:'center'}}>
                    <Text style={styles.loginErrTxt}>메일이나 비밀번호가 틀렸나 봐요.</Text>
                </View> : null}
                <View style={styles.loginButtonArea}>
                    <TouchableOpacity style={styles.loginButton}>
                        <Text style={{color : colors.primary}}>로그인</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.textNBtn}>
                    <Text>로그인에 문제가 있나요? </Text>
                    <TouchableOpacity>
                        <Text style={{color : colors.primary}}>계정 찾기</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.ex}>
                <LoginButton sentence="Google로 계속하기" tag={<GoogleSvg w='15' h='15'/>} press={GoogleSignInAsync}/>
                <LoginButton sentence="Apple로 계속하기" tag={<AppleSvg w='15' h='15'/>} press={GoogleSignInAsync}/>
            </View>
            <View style={styles.textNBtn}>
                <Text>계정이 없다면? </Text>
                <TouchableOpacity>
                    <Text style={{color : colors.primary}}>회원가입</Text>
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
    container:{
        flex:1,
        backgroundColor: colors.gray0,
    },
    ex:{
        flex:1,
        justifyContent:'flex-end',
    },
    textNBtn:{
        justifyContent:'center',
        marginTop:15,
        marginBottom:30,
        flexDirection:'row',
    },
    pwArea:{
        flexDirection:'row',
    },
    loginArea:{
        paddingHorizontal: 20
    },
    loginForm:{
        backgroundColor:colors.white,
        borderRadius: 10,
        height:44,
        alignItems: 'center',
        marginTop:16,
        paddingLeft: 16,
        flexDirection: 'row',
    },
    loginButtonArea:{
        alignItems:'center'
    },
    loginButton:{
        height:45,
        borderRadius:25,
        borderWidth:1,
        borderColor:colors.primary,
        alignItems:'center',
        justifyContent:'center',
        marginTop:16,
        paddingHorizontal: 40,
    },
    loginErrTxt:{
        marginTop:16,
        color: colors.primary
    },
    preview:{
        backgroundColor:colors.white,
        alignItems: 'center',
        width:'100%',
        justifyContent:"center",
        paddingVertical:20,
        flexDirection:'row'
    },
    eye:{
        marginHorizontal: 16,
    }
  });