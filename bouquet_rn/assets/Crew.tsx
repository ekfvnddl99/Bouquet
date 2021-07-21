import React from "react";
import { SvgXml } from "react-native-svg";

const crew = `
<svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.5 18.433C3.5 16.4308 4.95485 14.7254 6.93204 14.4098L7.11013 14.3814C8.69336 14.1287 10.3066 14.1287 11.8899 14.3814L12.068 14.4098C14.0451 14.7254 15.5 16.4308 15.5 18.433C15.5 19.2984 14.7984 20 13.933 20H5.06697C4.20156 20 3.5 19.2984 3.5 18.433Z" stroke="#B0B0B0" stroke-width="1.5"/>
<path d="M13 7.5C13 9.433 11.433 11 9.5 11C7.567 11 6 9.433 6 7.5C6 5.567 7.567 4 9.5 4C11.433 4 13 5.567 13 7.5Z" stroke="#B0B0B0" stroke-width="1.5"/>
<path d="M15.5 11C17.433 11 19 9.433 19 7.5C19 5.567 17.433 4 15.5 4M17.8899 20H19.933C20.7984 20 21.5 19.2984 21.5 18.433C21.5 16.4308 20.0451 14.7254 18.068 14.4098V14.4098C17.9494 14.3909 17.8293 14.3814 17.7093 14.3814C17.3895 14.3814 17.2902 14.3814 16.7412 14.3814" stroke="#B0B0B0" stroke-width="1.5" stroke-linecap="round"/>
</svg>
`;

const svg = ({w, h} : {w:string, h:string}) => {
  const CrewSvg = () => <SvgXml xml={crew} width={w} height={h}/>;
  return <CrewSvg />;
};

export default svg;