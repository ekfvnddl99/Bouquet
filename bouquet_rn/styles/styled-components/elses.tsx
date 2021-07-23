import styled from 'styled-components/native';
import {colors} from '../colors';

interface BarProps{
  width : string,
  color : string,
}
export const Bar = styled.View`
  width:${(props:BarProps) => props.width};
  height:8;
  borderRadius:10;
  backgroundColor:${(props:BarProps)=>props.color ? props.color : colors.primary};
  position:absolute;
`

interface CircleProps{
  radius : number,
  vertical : number,
}
export const Circle = styled.View`
  width:${(props:CircleProps) => props.radius};
  height:${(props:CircleProps) => props.radius};
  border-radius:${(props:CircleProps) => (props.radius)/2};
  background-color:${colors.black};
  align-items:center;
  justify-content:center;
  margin-vertical:${(props:CircleProps) => props.vertical};
`
interface RecProps{
  width : number,
  height : number,
}
export const Rectangle = styled.View`
  width:${(props:RecProps) => props.width};
  height:${(props:RecProps) => props.height};
  border-radius:10;
  background-color:${colors.black};
`

interface TagProps{
  color : string,
}

export const Tag = styled.View`
  height:25;
  border-radius:10;
  background-color:${(props : TagProps)=> props.color};
`