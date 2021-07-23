import { useCallback, useEffect, useState } from 'react';
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

type InsideIconProps = {
  name: string;
  varient: string;
  setFill: Function;
}

interface IconStyleProps {
  fill: string;
  width: number;
  height: number;
  color: string;
}

const IconWrap = styled.div<IconStyleProps>`
  width: ${props => props.width};
  height: ${props => props.height};

  path {
    ${props => (props.fill !== 'stroke' ? `fill: ${props.color}` : '')};
    ${props => (props.fill !== 'fill' ? `stroke: ${props.color}` : '')};
  }

  svg {
    width: 100%;
    height: 100%;
  }
`;

function InsideIcon({ name, varient, setFill }: InsideIconProps) {
  const [icon, setIcon] = useState(<HomeFilled />);

  const getIcon = useCallback(() => {
    switch (name) {
      case 'crew':
        if (varient === 'filled') {
          setFill('fill');
          setIcon(<CrewFilled />);
        }
        else {
          setFill('stroke');
          setIcon(<CrewOutline />);
        }
        break;
      case 'home':
        if (varient === 'filled') {
          setFill('fill');
          setIcon(<HomeFilled />);
        }
        else {
          setFill('fill');
          setIcon(<HomeOutline />);
        }
        break;
      case 'notifications':
        if (varient === 'filled') {
          setFill('fill');
          setIcon(<NotificationFilled />);
        }
        else {
          setFill('fill');
          setIcon(<NotificationOutline />);
        }
        break;
      case 'profile':
        if (varient === 'filled') {
          setFill('fill');
          setIcon(<ProfileFilled />);
        }
        else {
          setFill('stroke');
          setIcon(<ProfileOutline />);
        }
        break;
      case 'search':
        if (varient === 'filled') {
          setFill('fill');
          setIcon(<SearchFilled />);
        }
        else {
          setFill('fill');
          setIcon(<SearchOutline />);
        }
        break;
    }
  }, [name, varient, setFill]);

  useEffect(() => {
    getIcon();
  }, [getIcon]);

  return icon;
}

export default function Icon({ name, varient, width, height, color }: IconProps) {
  const [fill, setFill] = useState('');

  return (
    <IconWrap
      fill={fill}
      width={width ? width : 24}
      height={height ? height: 24}
      color={color ? color : colors.grayscale.black}
    >
      <InsideIcon name={name} varient={varient ? varient : ''} setFill={setFill} />
    </IconWrap>
  )
}