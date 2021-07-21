import React from "react";
import { SvgXml } from "react-native-svg";

const profile_focus = `
<svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.5 3C10.0659 3 8.09259 4.95716 8.09259 7.37143C8.09259 9.7857 10.0659 11.7429 12.5 11.7429C14.9341 11.7429 16.9074 9.7857 16.9074 7.37143C16.9074 4.95716 14.9341 3 12.5 3Z" fill="#FA7268"/>
<path d="M15.101 13.6877C13.3779 13.4149 11.6221 13.4149 9.89904 13.6877L9.71435 13.7169C7.28647 14.1012 5.5 16.1783 5.5 18.6168C5.5 19.933 6.57576 21 7.90278 21H17.0972C18.4242 21 19.5 19.933 19.5 18.6168C19.5 16.1783 17.7135 14.1012 15.2857 13.7169L15.101 13.6877Z" fill="#FA7268"/>
</svg>
`;

const svg = ({w, h} : {w:string, h:string}) => {
  const ProfileFocusSvg = () => <SvgXml xml={profile_focus} width={w} height={h}/>;
  return <ProfileFocusSvg />;
};

export default svg;