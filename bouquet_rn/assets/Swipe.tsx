import React from "react";
import { SvgXml } from "react-native-svg";

const swipe = `
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M3 4L0.999999 4L1 20L3 20L3 4ZM5 5L5 19C5 20.1046 5.89543 21 7 21L17 21C18.1046 21 19 20.1046 19 19L19 5C19 3.89543 18.1046 3 17 3L7 3C5.89543 3 5 3.89543 5 5ZM17 19L7 19L7 5L17 5L17 19ZM21 4L23 4L23 20L21 20L21 4Z" fill="#FA7268"/>
</svg>
`;

const svg = ({w, h} : {w:string, h:string}) => {
  const SwipeSvg = () => <SvgXml xml={swipe} width={w} height={h}/>;
  return <SwipeSvg />;
};

export default svg;