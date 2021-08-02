import React from "react";
import { SvgXml } from "react-native-svg";

const plus = `
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.35288 8.95043C4.00437 6.17301 6.17301 4.00437 8.95043 3.35288C10.9563 2.88237 13.0437 2.88237 15.0496 3.35288C17.827 4.00437 19.9956 6.17301 20.6471 8.95044C21.1176 10.9563 21.1176 13.0437 20.6471 15.0496C19.9956 17.827 17.827 19.9956 15.0496 20.6471C13.0437 21.1176 10.9563 21.1176 8.95044 20.6471C6.17301 19.9956 4.00437 17.827 3.35288 15.0496C2.88237 13.0437 2.88237 10.9563 3.35288 8.95043Z" stroke="#FA7268" stroke-width="1.5"/>
<path d="M14.5 12H9.5M12 14.5L12 9.5" stroke="#FA7268" stroke-width="1.5" stroke-linecap="round"/>
</svg>
`;

const svg = ({w, h} : {w:string, h:string}) => {
  const PlusSvg = () => <SvgXml xml={plus} width={w} height={h}/>;
  return <PlusSvg />;
};

export default svg;