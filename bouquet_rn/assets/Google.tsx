import React from "react";
import { SvgXml } from "react-native-svg";

const google = `
<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M14.7 7.67044C14.7 7.13862 14.6523 6.62726 14.5636 6.13635H7.5V9.03749H11.5364C11.3625 9.97499 10.8341 10.7693 10.0398 11.3011V13.1829H12.4636C13.8818 11.8773 14.7 9.95453 14.7 7.67044Z" fill="#4285F4"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.5 15C9.525 15 11.2227 14.3284 12.4636 13.1829L10.0398 11.3011C9.36818 11.7511 8.50909 12.017 7.5 12.017C5.54659 12.017 3.89318 10.6977 3.30341 8.92499H0.797729V10.8682C2.03182 13.3193 4.56818 15 7.5 15Z" fill="#34A853"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M3.30341 8.92502C3.15341 8.47502 3.06818 7.99434 3.06818 7.50002C3.06818 7.0057 3.15341 6.52502 3.30341 6.07502V4.13184H0.797727C0.289773 5.14434 0 6.28979 0 7.50002C0 8.71024 0.289773 9.8557 0.797727 10.8682L3.30341 8.92502Z" fill="#FBBC05"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.5 2.98295C8.60114 2.98295 9.58978 3.36136 10.367 4.10455L12.5182 1.95341C11.2193 0.743182 9.52159 0 7.5 0C4.56818 0 2.03182 1.68068 0.797729 4.13182L3.30341 6.075C3.89318 4.30227 5.54659 2.98295 7.5 2.98295Z" fill="#EA4335"/>
</svg>
`;

const svg = ({w, h} : {w:string, h:string}) => {
  const GoogleSvg = () => <SvgXml xml={google} width={w} height={h}/>;
  return <GoogleSvg />;
};

export default svg;