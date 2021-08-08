import {Animated} from 'react-native';
import styled from 'styled-components/native';
import {colors} from '../colors';

// props & logic
import { StatusBarHeight } from '../../screens/logics/StatusbarHeight';

interface BarProps{
  width : string,
  color : string,
}
export const Bar = styled.View`
  width:${(props:BarProps) => props.width};
  height:8;
  borderRadius:10;
  backgroundColor:${(props:BarProps)=>props.color};
  position:absolute;
`

interface CircleProps{
  diameter : number,
}
export const Circle = styled.View`
  width:${(props:CircleProps) => props.diameter};
  height:${(props:CircleProps) => props.diameter};
  border-radius:${(props:CircleProps) => (props.diameter)/2};
  background-color:${colors.white};
  align-items:center;
  justify-content:center;
`

export const CircleImg = styled.Image`
  width:${(props:CircleProps) => props.diameter};
  height:${(props:CircleProps) => props.diameter};
  border-radius:${(props:CircleProps) => (props.diameter)/2};
  background-color:${colors.black};
  align-items:center;
  justify-content:center;
`

interface RecProps{
  width : number | string,
  height : number | string | null,
  color: string,
}
export const Rectangle = styled.View`
  width:${(props:RecProps) => props.width};
  height:${(props:RecProps) => props.height};
  border-radius:10;
  background-color:${(props:RecProps) => props.color};
`
interface RecImgProps{
  width : number | string,
  height : number | string,
}
export const RectangleImg = styled.Image`
  width:${(props:RecImgProps) => props.width};
  height:${(props:RecImgProps) => props.height};
  border-radius:10;
`

interface TagProps{
  color : string,
}
export const Tag = styled.View`
  height:25;
  border-radius:10;
  background-color:${(props : TagProps)=> props.color};
  margin-right:4;
  padding-horizontal:8;
  padding-vertical:4;
`