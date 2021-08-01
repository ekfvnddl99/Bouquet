import React from 'react';
import { TouchableOpacity, StyleSheet} from 'react-native';
import * as elses from '../../styles/styled-components/elses';
import {colors} from '../../styles/colors';

// icons
import WriteWhiteSvg from '../../assets/WriteWhite';


export default function FloatingButton(){
  return(
    <TouchableOpacity style={styles.floating}>
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