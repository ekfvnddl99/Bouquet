import styled from 'styled-components';
import { colors } from '../styles/Colors';

interface CircleProps {
  size: number;
  image?: string;
}

const Circle = styled.div<CircleProps>`
  background: ${props =>
  props.image ?
  `url(${props.image})` :
  colors.grayscale.white
  } no-repeat center/cover;

  width: ${props => props.size}px;
  height: ${props => props.size}px;
  border-radius: ${props => props.size / 2}px;

  transition: 0.5s;
`;

type ProfilePicProps = {
  size: number;
  image?: string;
}

export function ProfilePic({ size, image }: ProfilePicProps) {
  return (
    <Circle size={size} image={image}/>
  )
}