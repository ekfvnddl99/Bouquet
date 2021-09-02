import React from 'react';
import { TouchableOpacity, StyleSheet} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as elses from '../../styles/styled-components/elses';
import {colors} from '../../styles/colors';

// icons
import Icon from '../../assets/Icon';


export default function FloatingButton(): React.ReactElement{
  const navigation = useNavigation();

  function goPostWriting(){
    navigation.navigate("Floating");
  }

  return(
    <TouchableOpacity style={styles.floating} onPress={()=>goPostWriting}>
      <elses.Circle diameter={50} style={{backgroundColor:colors.primary}}>
        <Icon icon="writeWhite" size={24}/>
      </elses.Circle>
    </TouchableOpacity>
  );
}

const styles=StyleSheet.create({
  floating:{
    bottom:20,
    position:'absolute',
    right:20,
  }
})