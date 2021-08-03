import React from "react";
import { SvgXml } from "react-native-svg";

const play_focus = `
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M5 20.9999V2.99993C5 2.20876 5.87525 1.73092 6.54076 2.15875L20.5408 11.1587C21.1531 11.5524 21.1531 12.4475 20.5408 12.8411L6.54076 21.8411C5.87525 22.2689 5 21.7911 5 20.9999Z" fill="#1D1D1D"/>
</svg>
`;

const svg = ({w, h} : {w:string, h:string}) => {
  const PlayFocusSvg = () => <SvgXml xml={play_focus} width={w} height={h}/>;
  return <PlayFocusSvg />;
};

export default svg;