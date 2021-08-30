import React from "react";
import { SvgXml } from "react-native-svg";

const commentDownArrow = `
<svg width="10" height="6" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11 1.5L6 6.5L1 1.5" stroke="#FA7268" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

const svg = ({w, h} : {w:string, h:string}) => {
  const CommentDownArrowSvg = () => <SvgXml xml={commentDownArrow} width={w} height={h}/>;
  return <CommentDownArrowSvg />;
};

export default svg;