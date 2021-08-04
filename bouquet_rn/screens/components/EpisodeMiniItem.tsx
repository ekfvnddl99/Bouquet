import React from 'react';
import {View} from 'react-native';
import {colors} from '../../styles/colors';
import * as button from '../../styles/styled-components/button';
import * as text from '../../styles/styled-components/text';
import * as elses from '../../styles/styled-components/elses';

// components
import ProfileButton from './ProfileButton';

export default function EpisodeMiniItem({navigation, press, id}  :{navigation:any, press:number, id:number}){
    const goEpisode=()=>{
      navigation.navigate("Episode");
    }
    return(
        <button.MiniListButton isWidth={true} height={270} color={colors.white} paddingH={16} paddingV={16} style={{marginRight:10, justifyContent:'center'}} onPress={goEpisode} activeOpacity={1}>
          <View style={{alignItems:'center'}}><elses.RectangleImg width={118} height={153} source={require('../../assets/img.jpg')}/></View>
          <View style={{marginTop:16, marginBottom:8}}><text.Subtitle3 color={colors.black} numberOfLines={2}>Ejrwafsfsdfasdfadasfaafasdfdasfasjs</text.Subtitle3></View>
          <ProfileButton diameter={20}  account={0}/>
        </button.MiniListButton>
    );
}