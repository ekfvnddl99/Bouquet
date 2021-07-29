import React from "react";
import { SvgXml } from "react-native-svg";

const roundX = `
<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2.51466 6.71282C3.00328 4.62975 4.62976 3.00328 6.71283 2.51466C8.21719 2.16178 9.78281 2.16178 11.2872 2.51466C13.3702 3.00328 14.9967 4.62976 15.4853 6.71283C15.8382 8.21719 15.8382 9.78281 15.4853 11.2872C14.9967 13.3702 13.3702 14.9967 11.2872 15.4853C9.78281 15.8382 8.21719 15.8382 6.71283 15.4853C4.62976 14.9967 3.00328 13.3702 2.51466 11.2872C2.16178 9.78281 2.16178 8.21719 2.51466 6.71282Z" stroke="#919191"/>
<path d="M10.3258 7.67419L7.67418 10.3258M10.3258 10.3258L7.67418 7.67419" stroke="#919191" stroke-linecap="round"/>
</svg>
`;

const svg = ({w, h} : {w:string, h:string}) => {
  const RoundXSvg = () => <SvgXml xml={roundX} width={w} height={h}/>;
  return <RoundXSvg />;
};

export default svg;