import styled from 'styled-components/native';
import {colors} from '../colors';

interface RowProps{
  top: number,
}
export const RowArea = styled.View`
  align-items:center;
  margin-top:${(props: RowProps)=> props.top};
  flex-direction:row;
`

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
interface FormProps{
  height : string,
}
export const FormArea = styled.View`
  background-color:${colors.white};
  border-radius: 10;
  height:${(props: FormProps)=> props.height};
  align-items: center;
  margin-top:16;
  padding-horizontal: 16;
  flex-direction: row;
`

export const Blank = styled.View `
  
`

export const Container = styled.SafeAreaView `
  flex:1;
  background-color: ${colors.gray0};
`

export const ContainerBlank20 = styled.SafeAreaView `
  flex:1;
  background-color: ${colors.gray0};
  padding-horizontal:20;
`

export const ContainerBlank30 = styled.SafeAreaView `
  flex:1;
  background-color: ${colors.gray0};
  padding-horizontal:30;
`