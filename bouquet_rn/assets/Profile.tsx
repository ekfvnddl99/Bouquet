import React from "react";
import { SvgXml } from "react-native-svg";

const profile = `
<svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.5 19.1115C5.5 16.6984 7.19732 14.643 9.50404 14.2627L9.71182 14.2284C11.5589 13.9239 13.4411 13.9239 15.2882 14.2284L15.496 14.2627C17.8027 14.643 19.5 16.6984 19.5 19.1115C19.5 20.1545 18.6815 21 17.6719 21H7.32813C6.31848 21 5.5 20.1545 5.5 19.1115Z" stroke="#B0B0B0" stroke-width="1.5"/>
<path d="M16.5834 6.9375C16.5834 9.11212 14.7552 10.875 12.5 10.875C10.2449 10.875 8.41669 9.11212 8.41669 6.9375C8.41669 4.76288 10.2449 3 12.5 3C14.7552 3 16.5834 4.76288 16.5834 6.9375Z" stroke="#B0B0B0" stroke-width="1.5"/>
</svg>
`;

const svg = ({w, h} : {w:string, h:string}) => {
  const ProfileSvg = () => <SvgXml xml={profile} width={w} height={h}/>;
  return <ProfileSvg />;
};

export default svg;