import React, { useEffect, useState } from 'react';
import { View, TextInput, TouchableOpacity, Image, Dimensions, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import { colors } from '../../styles/colors';

import GallerySvg from '../../assets/Gallery';
  
function Img({ img, isMini, isEditMode }: {img?:string, isMini: boolean, isEditMode?: boolean}) {
  const[image, setImage]=useState(img);
  const[edit, setEdit]=useState(isEditMode);
  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('이미지를 업로드하려면 권한이 필요해요.');
      }
    })();
  }, []);

  const onPress = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect:[1,1],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      setEdit(false)
    }
  };


  return(
    <View style={{marginBottom: isEditMode ? 12 : 0, alignItems:'center'}}>
      {edit ? 
      <TouchableOpacity onPress={onPress} style={styles.selectImg}>
        <GallerySvg w="24" h="24"/>
      </TouchableOpacity>
      : image==='' ? <Image source={require('../../assets/img.jpg')} resizeMode={'cover'} style={styles.setImg}/>:
       <Image source={{uri:image}} resizeMode={'cover'} style={styles.setImg}/>}
    </View>
  )
}

type TemplateProps = {
  mode: string;
  img?: string;
}

export default function ImageTemplate({ mode, img }: TemplateProps) {
  switch (mode) {
    case 'edit':
      return (
        <Img isMini={true} isEditMode={true}/>
      );
    case 'ex':
      return (
        <Img img={''} isMini={true} isEditMode={false}/>
      );
    default:
      return (
        <Img img={img} isMini={true} isEditMode={false}/>
      );
  }
}

const styles = StyleSheet.create({
  selectImg:{
    justifyContent:'center', 
    alignItems:'center', 
    width:'100%', 
    height:200,
    backgroundColor:colors.white,
    borderRadius:10,
  },
  setImg:{
    width:'100%',
    borderRadius:10,
    aspectRatio: 1/1
  }
})
