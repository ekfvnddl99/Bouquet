import React from "react";
import { SvgXml } from "react-native-svg";

const play = `
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M5 2.99993V20.9999C5 21.7911 5.87525 22.2689 6.54076 21.8411L20.5408 12.8411C21.1531 12.4475 21.1531 11.5524 20.5408 11.1587L6.54076 2.15875C5.87525 1.73092 5 2.20876 5 2.99993ZM18.1507 11.9999L7 19.1683V4.83159L18.1507 11.9999Z" fill="#1D1D1D"/>
</svg>
`;

const svg = ({w, h} : {w:string, h:string}) => {
  const PlaySvg = () => <SvgXml xml={play} width={w} height={h}/>;
  return <PlaySvg />;
};

export default svg;