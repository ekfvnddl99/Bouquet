import styled from 'styled-components/native';
import {colors} from '../colors';

export const TextBtnArea = styled.View`
  justify-content:center;
  margin-top:15;
  flex-direction:row;
`

export const TextBackgroundBtnArea = styled.View`
  background-color:${colors.white};
  align-items: center;
  width:100%;
  justify-content:center;
  padding-vertical:20;
  flex-direction:row;
  margin-top:30;
`

export const BottomArea = styled.View`
  flex: 1;
  justify-content: flex-end;
`

export const FormArea = styled.View`
  background-color:${colors.white};
  border-radius: 10;
  height:44;
  align-items: center;
  margin-top:16;
  padding-horizontal: 16;
  flex-direction: row;
`

export const Container = styled.SafeAreaView `
  flex:1;
  background-color: ${colors.gray0};
`

export const ContainerBlank = styled.SafeAreaView `
  flex:1;
  background-color: ${colors.gray0};
  padding-horizontal:20;
`