import React, { useEffect, useState } from 'react';
import { View, TextInput, TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import { colors } from '../../styles/colors';
import * as text from '../../styles/styled-components/text';
import * as area from '../../styles/styled-components/area';
import * as elses from '../../styles/styled-components/elses';

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

  useEffect(()=>{
    console.log(edit)
    console.log(image)
  }, [image])
  const onPress = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      setEdit(false)
    }
  };


  return(
    <area.NoHeightArea
      marBottom={isEditMode? 12 : 0}
      paddingH={15}
      paddingV={15}
    >
      {edit ? 
      <TouchableOpacity onPress={onPress} style={{justifyContent:'center', alignItems:'center'}}>
        <View style={{justifyContent:'center', alignItems:'center', backgroundColor:colors.black, width:'100%'}}>
          <GallerySvg w="24" h="24"/>
        </View>
      </TouchableOpacity>
      : image==='ex' ? <elses.RectangleImg source={require('../../assets/img.jpg')}/>:
       <elses.RectangleImg source={{uri:image}}/>}
    </area.NoHeightArea>
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
