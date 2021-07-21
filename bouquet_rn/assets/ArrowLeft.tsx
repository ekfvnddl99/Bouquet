import React from "react";
import { SvgXml } from "react-native-svg";

const arrowLeft = `
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16 20L8 12L16 4" stroke="#1D1D1D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

const svg = ({w, h} : {w:string, h:string}) => {
  const ArrowLeftSvg = () => <SvgXml xml={arrowLeft} width={w} height={h}/>;
  return <ArrowLeftSvg />;
};

export default svg;