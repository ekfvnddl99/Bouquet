import styled from 'styled-components/native';
import {colors} from '../colors';

interface BarProps{
  width : string,
  color : string,
}
export const Bar = styled.View`
  width:${(props:BarProps) => props.width ? props.width : '100%' };
  height:8;
  borderRadius:10;
  backgroundColor:${(props:BarProps)=>props.color ? props.color : colors.primary};
  position:absolute;
`

export const Circle = styled.View`
  width:120;
  height:120;
  border-radius:60;
  background-color:${colors.white};
  align-items:center;
  justify-content:center;
  margin-vertical:16;
`