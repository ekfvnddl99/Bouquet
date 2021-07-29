import styled from 'styled-components';

// import icons - Sort alphabetically
import BinFilled from '../public/icons/Bin_Filled.svg';
import BinOutline from '../public/icons/Bin_Outline.svg';
import CrewFilled from '../public/icons/Crew_Filled.svg';
import CrewOutline from '../public/icons/Crew_Outline.svg';
import HomeFilled from '../public/icons/Home_Filled.svg';
import HomeOutline from '../public/icons/Home_Outline.svg';
import NotificationFilled from '../public/icons/Notification_Filled.svg';
import NotificationOutline from '../public/icons/Notification_Outline.svg';
import ProfileFilled from '../public/icons/Profile_Filled.svg';
import ProfileOutline from '../public/icons/Profile_Outline.svg';
import SearchFilled from '../public/icons/Search_Filled.svg';
import SearchOutline from '../public/icons/Search_Outline.svg';
import SunshineFilled from '../public/icons/Sunshine_Filled.svg';
import SunshineOutline from '../public/icons/Sunshine_Outline.svg';
import X from '../public/icons/X.svg';
import { colors } from '../styles/Colors';

type IconProps = {
  name: string;
  varient?: string;
  width?: number;
  height?: number;
  color?: string;
}

interface IconStyleProps {
  width: number;
  height: number;
  fill: string;
  color: string;
  additional?: string;
}

const IconWrap = styled.div<IconStyleProps>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: ${props => props.width}px;
  height: ${props => props.height}px;

  path {
    ${props => (props.fill !== 'stroke' ? `fill: ${props.color}` : '')};
    ${props => (props.fill !== 'fill' ? `stroke: ${props.color}` : '')};
  }

  svg {
    width: ${props => props.width}px;
    height: ${props => props.height}px;
  }

  ${props => props.additional ? props.additional : ''}
`;

export default function Icon({ name, varient, width, height, color }: IconProps) {
  let icon = <p>?</p>;
  let fill = 'fill';
  let additional = '';
  switch (name) {
    case 'bin':
      if (varient === 'filled') {
        fill = 'fill';
        icon = <BinFilled viewBox="0 0 24 24" />;
      }
      else {
        fill = 'fill';
        icon = <BinOutline viewBox="0 0 24 24"/>;
        additional = `
          path:nth-child(2) {
            stroke: ${color};
          }
        `;
      }
      break;
    case 'crew':
      if (varient === 'filled') {
        fill = 'fill';
        icon = <CrewFilled />;
      }
      else {
        fill = 'stroke';
        icon = <CrewOutline />;
      }
      break;
    case 'home':
      if (varient === 'filled') {
        fill = 'fill';
        icon = <HomeFilled />;
      }
      else {
        fill = 'fill';
        icon = <HomeOutline />;
      }
      break;
    case 'notifications':
      if (varient === 'filled') {
        fill = 'fill';
        icon = <NotificationFilled />;
      }
      else {
        fill = 'fill';
        icon = <NotificationOutline />;
      }
      break;
    case 'profile':
      if (varient === 'filled') {
        fill = 'fill';
        icon = <ProfileFilled />;
      }
      else {
        fill = 'stroke';
        icon = <ProfileOutline />;
      }
      break;
    case 'search':
      if (varient === 'filled') {
        fill = 'fill';
        icon = <SearchFilled viewBox="0 0 24 24" />;
      }
      else {
        fill = 'fill';
        icon = <SearchOutline viewBox="0 0 24 24" />;
      }
      break;
    case 'sunshine':
      if (varient === 'filled') {
        fill = 'fill';
        icon = <SunshineFilled viewBox="0 0 24 24"/>;
      }
      else {
        fill = 'stroke';
        icon = <SunshineOutline viewBox="0 0 24 24" />;
      }
      break;
    case 'X':
      fill = 'stroke';
      icon = <X viewBox="0 0 24 24" />;
  }

  const Icon = () => icon;
  
  return (
    <IconWrap
      fill={fill}
      color={color ? color : colors.grayscale.black}
      width={width ? width : 24}
      height={height ? height : 24}
      additional={additional}
    >
      <Icon />
    </IconWrap>
  )
}