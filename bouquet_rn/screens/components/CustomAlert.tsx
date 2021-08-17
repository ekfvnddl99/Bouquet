import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import {colors} from '../../styles/colors';
import * as text from '../../styles/styled-components/text';
import * as area from '../../styles/styled-components/area';

type CustomAlertProps={
  title : string,
  sub? : string,
  options : string[]
}
export default function CustomAlert({title, sub, options} : CustomAlertProps) {
  const [modalVisible, setModalVisible] = useState(true);
  console.log("A")
  return (
    <Modal 
      transparent={true} 
      visible={modalVisible} 
      animationType={'none'}
      onRequestClose={() => {
        console.log("B")
        setModalVisible(false)
      }}>
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            <text.Body3 color={colors.black}>{title}</text.Body3>
            {sub ? <text.Body3 color={colors.black}>{sub}</text.Body3> : null}
            {options.length>2 ?
            <View>
              { options.map((data : string)=>{return(
              <text.Button2R color={colors.black}>{data}</text.Button2R>
              )})}
            </View>
            : <area.RowArea>
              {options.map((data : string)=>{return(
              <text.Button2R color={colors.black}>{data}</text.Button2R>
              )})}
            </area.RowArea>}
          </View>
        </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer:{
    backgroundColor:'transparent',
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  modal:{
    width:'90%',
    backgroundColor: colors.white,
    borderWidth:10,
    justifyContent:'center',
    alignItems:'center'
  }
})