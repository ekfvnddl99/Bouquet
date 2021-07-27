import styled from 'styled-components/native';
import {colors} from '../colors';

interface BtnProps{
  height : number|undefined,
  color : string,
  paddingH:number,
  paddingV:number,
}

export const LineButton = styled.TouchableOpacity`
  border-width:1;
  border-color:${(props : BtnProps)=>props.color};
  height:${(props : BtnProps)=>props.height};
  border-radius:25;
  align-items:center;
  justify-content:center;
  padding-horizontal: ${(props : BtnProps)=>props.paddingH};
  padding-vertical: ${(props : BtnProps)=>props.paddingV};
`

export const BackgroundButton = styled.TouchableOpacity`
  background-color:${(props : BtnProps)=>props.color};
  height:${(props : BtnProps)=>props.height};
  border-radius:25;
  align-items:center;
  justify-content:center;
  padding-horizontal: ${(props : BtnProps)=>props.paddingH};
  padding-vertical: ${(props : BtnProps)=>props.paddingV};
`

export const SocialButton =styled.TouchableOpacity`
  background-color:${colors.white};
  height:45;
  border-radius:25;
  align-items:center;
  justify-content:center;
  padding-horizontal:18;
  margin-top:10;
  flex-direction: row;
  width: 100%;
`

interface MiniListBtnProps{
  height:number,
  color : string,
  paddingH:number,
  paddingV:number,
}
export const MiniListButton = styled.TouchableOpacity`
  flex:1;
  width:150;
  height: ${(props : MiniListBtnProps)=>props.height};
  background-color: ${(props : MiniListBtnProps)=>props.color};
  border-radius: 10;
  padding-horizontal: ${(props : MiniListBtnProps)=>props.paddingH};
  padding-vertical: ${(props : MiniListBtnProps)=>props.paddingV};
`
interface BigListBtnProps{
  color : string,
  paddingH:number,
  paddingV:number,
}
export const BigListButton = styled.TouchableOpacity`
  flex:1;
  width:100%;
  background-color: ${(props : BigListBtnProps)=>props.color};
  border-radius: 10;
  padding-horizontal:${(props : BigListBtnProps)=>props.paddingH};
  padding-vertical: ${(props : BigListBtnProps)=>props.paddingV};
  margin-bottom: 10;
`

export const NotificationButton = styled.TouchableOpacity`
  flex:1;
  flex-direction:row;
  background-color: ${colors.white};
  border-radius: 10;
  align-items: center;
  padding-horizontal: 18;
  padding-vertical: 12;
  margin-bottom: 10;
`

export const RecentSearchButton = styled.TouchableOpacity`
  height: 28;
  background-color: ${colors.white};
  border-radius: 10;
  margin-right: 4;
  flex-direction:row;
  align-items:center;
  padding-left: 10;
`

interface sunProps{
  color:string
}
export const SunButton = styled.TouchableOpacity`
  flex-direction:row;
  border-width:1;
  border-color:${colors.primary};
  border-radius:10;
  background-color:${(props:sunProps)=> props.color};
  align-items:center;
  padding-vertical:4;
  padding-horizontal:8;
`

export const ProfileDetailButton = styled.TouchableOpacity`
  width:100%;
  border-radius:10;
  background-color: ${colors.white};
  padding-horizontal:20;
  padding-vertical:20;
`