import React from "react";
import { SvgXml } from "react-native-svg";

const sun = `
<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.1667 10C14.1667 12.3012 12.3012 14.1667 9.99999 14.1667C7.69881 14.1667 5.83333 12.3012 5.83333 10C5.83333 7.69882 7.69881 5.83334 9.99999 5.83334C12.3012 5.83334 14.1667 7.69882 14.1667 10Z" stroke="#FA7268" stroke-width="1.5"/>
<path d="M15.2598 4.74028L15.3572 4.64286M4.64286 15.3572L4.74027 15.2598M10 2.56162V2.5M10 17.5V17.4384M2.56162 10H2.5M17.5 10H17.4384M4.74026 4.74028L4.64284 4.64286M15.3571 15.3571L15.2598 15.2598" stroke="#FA7268" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

const svg = ({w, h} : {w:string, h:string}) => {
  const SunSvg = () => <SvgXml xml={sun} width={w} height={h}/>;
  return <SunSvg />;
};

export default svg;