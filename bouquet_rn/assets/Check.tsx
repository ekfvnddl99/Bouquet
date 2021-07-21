import React from "react";
import { SvgXml } from "react-native-svg";

const check = `
<svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.25 1.375L2.89286 7.625L0.75 5.125" stroke="#919191" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

const svg = ({w, h} : {w:string, h:string}) => {
  const CheckSvg = () => <SvgXml xml={check} width={w} height={h}/>;
  return <CheckSvg />;
};

export default svg;