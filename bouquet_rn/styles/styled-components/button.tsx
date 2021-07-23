import styled from 'styled-components/native';
import {colors} from '../colors';

interface BtnProps{
  height : number,
}

export const PrimaryButton = styled.TouchableOpacity`
  height:${(props : BtnProps)=>props.height};
  border-radius:25;
  border-width:1;
  border-color:${colors.primary};
  align-items:center;
  justify-content:center;
  margin-top:16;
  padding-horizontal: 40;
  padding-vertical: 14;
`

export const PrimaryBgButton = styled.TouchableOpacity`
  height:${(props : BtnProps)=>props.height};
  border-radius:25;
  background-color:${colors.primary};
  align-items:center;
  justify-content:center;
  padding-horizontal: 40;
  padding-vertical: 14;
`

export const BlackButton = styled.TouchableOpacity`
  border-radius:25;
  border-width:1;
  border-color:${colors.black};
  align-items:center;
  padding-horizontal: 12;
  padding-vertical: 4;
`

export const GrayBtnButton = styled.TouchableOpacity`
  height:45;
  border-radius:25;
  border-width:1;
  border-color:${colors.gray2};
  align-items:center;
  justify-content:center;
  margin-top:16;
  padding-horizontal: 40;
`

export const BackButton = styled.TouchableOpacity`
  margin-top:20;
`

export const SocialButton =styled.TouchableOpacity`
  background-color:${colors.white};
  border-radius:25;
  height:45;
  margin-top:10;
  align-items:center;
  justify-content:center;
  padding-horizontal:18;
  flex-direction: row;
  width: 100%;
`

export const ListButton = styled.TouchableOpacity`
  flex:1;
  flex-direction:row;
  align-items: center;
  background-color: ${colors.white};
  border-radius: 10;
  margin-top: 10;
  padding-horizontal: 20;
  padding-vertical: 10;
`

export const CharacterButton = styled.TouchableOpacity`
  flex:1;
  align-items: center;
  background-color: ${colors.white};
  border-radius: 10;
  margin-right:10;
  padding-horizontal: 25;
  padding-vertical: 18;
  width:150;
`

export const PostButton = styled.TouchableOpacity`
  flex:1;
  width:100%;
  background-color: ${colors.white};
  border-radius: 10;
  margin-top: 10;
  padding-horizontal:10;
  padding-vertical: 10;
`

interface EpiBtn{
  color: string,
}

export const EpisodeButton = styled.TouchableOpacity`
  flex:1;
  width:100%;
  height:149;
  background-color: ${(props : EpiBtn)=>props.color};
  border-radius: 10;
  margin-top: 10;
  padding-horizontal:16;
  padding-vertical:16;
`

export const EpisodeMiniButton = styled.TouchableOpacity`
  flex:1;
  width:150;
  background-color: ${colors.white};
  border-radius: 10;
  margin-right: 10;
  padding-horizontal:16;
  padding-vertical:16;
`

export const RecentSearchButton = styled.TouchableOpacity`
  height: 28;
  background-color: ${colors.white};
  border-radius: 10;
  margin-right: 5;
  flex-direction:row;
  align-items:center;
  padding-left: 10;
`

export const SunButton = styled.TouchableOpacity`
  flex-direction:row;
  border-width:1;
  border-color:${colors.primary};
  border-radius:10;
  align-items:center;
  padding-vertical:7;
  padding-horizontal:8;
`