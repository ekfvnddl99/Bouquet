import React from "react";
import { SvgXml } from "react-native-svg";
import { iconList, iconType } from './IconList';

function svg<T extends keyof iconType>({ icon, size } : { icon: T, size: number }) {
  const xmlString = iconList[icon];
  const Svg = () => <SvgXml xml={xmlString} width={size} height={size}/>;
  return <Svg/>;
};

export default svg;