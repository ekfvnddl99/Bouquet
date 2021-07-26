import styled from 'styled-components';

// import icons - Sort alphabetically
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
import { colors } from '../styles/Colors';

type IconProps = {
  name: string;
  varient?: string;
  width?: number;
  height?: number;
  color?: string;
}

interface IconWrapProps {
  width: number;
  height: number;
}

const IconWrap = styled.div<IconWrapProps>`
  width: ${props => props.width}px;
  height: ${props => props.height}px;
`;

interface IconStyleProps {
  fill: string;
  color: string;
}

const InsideIconWrap = styled.div<IconStyleProps>`
  path {
    ${props => (props.fill !== 'stroke' ? `fill: ${props.color}` : '')};
    ${props => (props.fill !== 'fill' ? `stroke: ${props.color}` : '')};
  }

  svg {
    width: 100%;
    height: 100%;
  }
`;

type InsideIconProps = {
  name: string;
  varient: string;
  color: string;
}

function InsideIcon({ name, varient, color }: InsideIconProps) {
  let icon = <p>?</p>;
  let fill = 'fill';
  switch (name) {
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
        icon = <SearchFilled />;
      }
      else {
        fill = 'fill';
        icon = <SearchOutline />;
      }
      break;
  }

  const Icon = () => icon;
  
  return (
    <InsideIconWrap fill={fill} color={color}>
      <Icon />
    </InsideIconWrap>
  )
}

export default function Icon({ name, varient, width, height, color }: IconProps) {
  return (
    <IconWrap
      width={width ? width : 24}
      height={height ? height: 24}
    >
      <InsideIcon
        name={name}
        varient={varient ? varient : ''}
        color={color ? color : colors.grayscale.black}/>
    </IconWrap>
  )
}