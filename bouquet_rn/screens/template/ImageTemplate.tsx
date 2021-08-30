import React, { useEffect, useState } from 'react';
import { View, TextInput, TouchableOpacity, Image, Dimensions, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import { colors } from '../../styles/colors';
import * as elses from '../../styles/styled-components/elses';
import GallerySvg from '../../assets/Gallery';

import * as Post from '../../logics/Post';
  
const windowWidth = Dimensions.get('window').width;
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
    }
  };


  return(
    <View style={{marginBottom: isMini ? 0 : 12, alignItems:'center'}}>
      {edit ? 
      <TouchableOpacity onPress={onPress} style={styles.selectImg}>
        <GallerySvg w="24" h="24"/>
      </TouchableOpacity>
      : image==='' ? <elses.RectangleImg width={windowWidth/2} height={windowWidth/2} source={require('../../assets/img.jpg')}/>:
       <Image source={{uri:img}} resizeMode={'cover'} style={styles.setImg}/>}
    </View>
  )
}

type TemplateProps = {
  mode: string;
  post?: Post.PostInterface<any>;
}

export default function ImageTemplate({ mode, post }: TemplateProps) {
  switch (mode) {
    case 'edit':
      return (
        <Img isMini={false} isEditMode={true}/>
      );
    case 'detail':
      return (
        <Img img={post ? post.template.img : ''} isMini={false} isEditMode={false}/>
      );
    case 'ex':
      return (
        <Img img={''} isMini={true} isEditMode={false}/>
      );
    default:
      return (
        <Img img={post ? post.template.img : ''} isMini={true} isEditMode={false}/>
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
