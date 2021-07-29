import styled from 'styled-components/native';
import { Platform } from 'react-native';
import {colors} from '../colors';

// props & logic
import { StatusBarHeight } from '../../screens/logics/StatusbarHeight';

export const RowArea = styled.View`
  align-items:center;
  flex-direction:row;
`

export const RowFlexArea = styled.View`
  flex:1;
  align-items:center;
  flex-direction:row;
`

export const TextBtnArea = styled.View`
  justify-content:center;
  flex-direction:row;
`

export const TextBackgroundBtnArea = styled.View`
  width:100%;
  flex-direction:row;
  background-color:${colors.white};
  align-items: center;
  justify-content:center;
  padding-vertical:20;
  margin-top:30;
`

export const BottomArea = styled.View`
  flex: 1;
  justify-content: flex-end;
`

export const TabBarArea = styled.SafeAreaView`
  flex-direction: row;
  background-color:${colors.white};
  justify-content:center;
  align-items:flex-end;
`

interface noHeightProps{
  marBottom: number,
  paddingH: number,
  paddingV: number,
}
export const NoHeightArea = styled.View`
  width: 100%;
  background-color: ${colors.white};
  border-radius: 10;
  margin-bottom: ${(props:noHeightProps)=> props.marBottom};
  padding-horizontal: ${(props:noHeightProps)=> props.paddingH};
  padding-vertical:${(props:noHeightProps)=> props.paddingV};
`

interface FormProps{
  height : string,
}
export const FormArea = styled.View`
  background-color:${colors.white};
  border-radius: 10;
  height:${(props: FormProps)=> props.height};
  align-items: center;
  padding-horizontal: 16;
  flex-direction: row;
`

// contatiner
export const Container = styled.SafeAreaView `
  flex:1;
  background-color: ${colors.gray0};
  padding-top: ${StatusBarHeight};
`

export const ContainerBlank20 = styled.SafeAreaView `
  flex:1;
  background-color: ${colors.gray0};
  padding-horizontal:20;
  padding-top:20;
`

export const ContainerBlank30 = styled.SafeAreaView `
  flex:1;
  background-color: ${colors.gray0};
  padding-horizontal:30;
  padding-top:30;
`