import React from "react";
import { SvgXml } from "react-native-svg";

const mail = `
<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M1.875 1.875H13.125C13.8154 1.875 14.375 2.43464 14.375 3.125V11.875C14.375 12.5654 13.8154 13.125 13.125 13.125H1.875C1.18464 13.125 0.625 12.5654 0.625 11.875V3.125C0.625 2.43464 1.18464 1.875 1.875 1.875ZM1.875 6.01131V11.875H13.125V6.01158L7.49999 8.82409L1.875 6.01131ZM1.875 4.61374L7.50002 7.42653L13.125 4.61404V3.125H1.875V4.61374Z" fill="#1D1D1D"/>
</svg>
`;

const svg = ({w, h}) => {
  const MailSvg = () => <SvgXml xml={mail} width={w} height={h}/>;
  return <MailSvg />;
};

export default svg;