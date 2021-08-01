import React from "react";
import { SvgXml } from "react-native-svg";

const writeWhite = `
<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.7778 4.30537C11.7362 4.65257 10.3474 3.26378 10.6946 2.2222M10.6104 2.30644L8.36637 4.55045C7.39081 5.52602 6.69872 6.74837 6.36411 8.08684L6.25568 8.52056C6.22189 8.6557 6.3443 8.77811 6.47945 8.74432L6.91316 8.63589C8.25163 8.30128 9.47398 7.60919 10.4495 6.63363L12.6936 4.38961C12.9698 4.11337 13.125 3.7387 13.125 3.34803C13.125 2.5345 12.4655 1.875 11.652 1.875C11.2613 1.875 10.8866 2.03019 10.6104 2.30644Z" stroke="#FFFFFF"/>
<path d="M7.5 1.875C6.86042 1.875 6.22084 1.94852 5.59402 2.09555C3.85813 2.50273 2.50273 3.85813 2.09555 5.59402C1.80148 6.84766 1.80148 8.15234 2.09555 9.40598C2.50273 11.1419 3.85813 12.4973 5.59402 12.9045C6.84766 13.1985 8.15234 13.1985 9.40598 12.9045C11.1419 12.4973 12.4973 11.1419 12.9045 9.40598C13.0515 8.77915 13.125 8.13957 13.125 7.49998" stroke="#FFFFFF" stroke-linecap="round"/>
</svg>
`;

const svg = ({w, h} : {w:string, h:string}) => {
  const WriteWhiteSvg = () => <SvgXml xml={writeWhite} width={w} height={h}/>;
  return <WriteWhiteSvg />;
};

export default svg;