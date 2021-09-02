import React from 'react';
import { SvgXml } from 'react-native-svg';
import { iconList, iconType } from './IconList';

function Svg<T extends keyof iconType>({
  icon,
  size,
}: {
  icon: T;
  size: number;
}): React.ReactElement {
  const xmlString = iconList[icon];
  const SvgTag = () => <SvgXml xml={xmlString} width={size} height={size} />;
  return <SvgTag />;
}

export default Svg;
