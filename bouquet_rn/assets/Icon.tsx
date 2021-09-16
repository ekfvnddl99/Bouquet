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
  let widthSize: number;
  let heightSize: number;
  if (icon === 'title') {
    widthSize = 170;
    heightSize = 54;
  } else {
    widthSize = size;
    heightSize = size;
  }
  const SvgTag = () => (
    <SvgXml xml={xmlString} width={widthSize} height={heightSize} />
  );
  return <SvgTag />;
}

export default Svg;
