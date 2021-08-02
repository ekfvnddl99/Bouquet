import React from "react";
import { SvgXml } from "react-native-svg";

const sunFocus = `
<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.1667 9.99992C14.1667 12.3011 12.3012 14.1666 10 14.1666C7.69882 14.1666 5.83334 12.3011 5.83334 9.99992C5.83334 7.69873 7.69882 5.83325 10 5.83325C12.3012 5.83325 14.1667 7.69873 14.1667 9.99992Z" stroke="white" stroke-width="1.5"/>
<path d="M15.2598 4.74028L15.3572 4.64286M4.64286 15.3572L4.74027 15.2598M10 2.56162V2.5M10 17.5V17.4384M2.56162 10H2.5M17.5 10H17.4384M4.74026 4.74028L4.64284 4.64286M15.3571 15.3571L15.2598 15.2598" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

const svg = ({w, h} : {w:string, h:string}) => {
  const SunFocusSvg = () => <SvgXml xml={sunFocus} width={w} height={h}/>;
  return <SunFocusSvg />;
};

export default svg;