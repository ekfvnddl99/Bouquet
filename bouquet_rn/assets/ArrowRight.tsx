import React from "react";
import { SvgXml } from "react-native-svg";

const arrowRight = `
<svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.33334 3.16671L10.6667 8.50004L5.33334 13.8334" stroke="#1D1D1D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

const svg = ({w, h} : {w:string, h:string}) => {
  const ArrowRightSvg = () => <SvgXml xml={arrowRight} width={w} height={h}/>;
  return <ArrowRightSvg />;
};

export default svg;