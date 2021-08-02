import React from "react";
import { SvgXml } from "react-native-svg";

const x = `
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.17157 9.17157L14.8284 14.8284M14.8284 9.17157L9.17157 14.8284" stroke="#FA7268" stroke-width="1.5" stroke-linecap="round"/>
</svg>
`;

const svg = ({w, h} : {w:string, h:string}) => {
  const XSvg = () => <SvgXml xml={x} width={w} height={h}/>;
  return <XSvg />;
};

export default svg;