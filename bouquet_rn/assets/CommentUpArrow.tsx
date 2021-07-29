import React from "react";
import { SvgXml } from "react-native-svg";

const commentUpArrow = `
<svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.999999 6.5L6 1.5L11 6.5" stroke="#FA7268" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

const svg = ({w, h} : {w:string, h:string}) => {
  const CommentUpArrowSvg = () => <SvgXml xml={commentUpArrow} width={w} height={h}/>;
  return <CommentUpArrowSvg />;
};

export default svg;