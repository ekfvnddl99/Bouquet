import React from 'react';
import { TouchableOpacity, StyleSheet} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as elses from '../../styles/styled-components/elses';
import {colors} from '../../styles/colors';

// icons
import WriteWhiteSvg from '../../assets/WriteWhite';

// props & logic
import type {WritingProps} from '../../utils/types';

export default function FloatingButton(){
  const navigation = useNavigation();
  const goPostWriting=()=>{
    navigation.navigate("Floating");
  }
  return(
    <TouchableOpacity style={styles.floating} onPress={goPostWriting}>
      <elses.Circle diameter={50} style={{backgroundColor:colors.primary}}>
        <WriteWhiteSvg w='24' h='24'/>
      </elses.Circle>
    </TouchableOpacity>
  );
}

const styles=StyleSheet.create({
  floating:{
    position:'absolute',
    bottom:20,
    right:20,
  }
})