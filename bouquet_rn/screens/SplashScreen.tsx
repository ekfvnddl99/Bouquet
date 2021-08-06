import React from 'react';
import {View, StyleSheet} from 'react-native';

// icons
import LogoSvg from '../assets/Logo';

export default function SplashScreen(){
  return(
    <View style={styles.bg}>
      <LogoSvg w='150' h='150'/>
    </View>
  );
}

const styles=StyleSheet.create({
  bg:{
    flex:1,
    justifyContent:'center',
    alignItems:"center",
  }
})