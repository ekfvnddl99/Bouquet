import React from "react";
import { SvgXml } from "react-native-svg";

const searchViewFocus = `
<svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.07233 7.61316L1.80251 7.44188L1.07233 7.61316ZM1.07233 4.2025L1.80251 4.37378H1.80251L1.07233 4.2025ZM10.7433 4.2025L11.4735 4.03123V4.03122L10.7433 4.2025ZM10.7433 7.61315L11.4735 7.78443L10.7433 7.61315ZM7.61315 10.7433L7.44188 10.0131L7.61315 10.7433ZM4.2025 10.7433L4.03122 11.4735L4.2025 10.7433ZM4.2025 1.07233L4.03122 0.342149L4.2025 1.07233ZM7.61316 1.07233L7.78443 0.342149L7.61316 1.07233ZM11.5947 12.6553C11.8876 12.9482 12.3624 12.9482 12.6553 12.6553C12.9482 12.3624 12.9482 11.8876 12.6553 11.5947L11.5947 12.6553ZM1.80251 7.44188C1.56583 6.43287 1.56583 5.38278 1.80251 4.37378L0.342149 4.03122C0.0526169 5.26554 0.0526168 6.55012 0.342149 7.78444L1.80251 7.44188ZM10.0131 4.37378C10.2498 5.38278 10.2498 6.43287 10.0131 7.44188L11.4735 7.78443C11.763 6.55011 11.763 5.26554 11.4735 4.03123L10.0131 4.37378ZM7.44188 10.0131C6.43287 10.2498 5.38278 10.2498 4.37378 10.0131L4.03122 11.4735C5.26554 11.763 6.55011 11.763 7.78443 11.4735L7.44188 10.0131ZM4.37378 1.80251C5.38278 1.56583 6.43287 1.56583 7.44188 1.80251L7.78443 0.342149C6.55012 0.052617 5.26554 0.0526172 4.03122 0.342149L4.37378 1.80251ZM4.37378 10.0131C3.09795 9.71388 2.10178 8.7177 1.80251 7.44188L0.342149 7.78444C0.771519 9.6149 2.20076 11.0441 4.03122 11.4735L4.37378 10.0131ZM7.78443 11.4735C9.6149 11.0441 11.0441 9.6149 11.4735 7.78443L10.0131 7.44188C9.71388 8.7177 8.7177 9.71388 7.44188 10.0131L7.78443 11.4735ZM7.44188 1.80251C8.7177 2.10178 9.71388 3.09795 10.0131 4.37378L11.4735 4.03122C11.0441 2.20076 9.6149 0.771518 7.78443 0.342149L7.44188 1.80251ZM4.03122 0.342149C2.20076 0.771517 0.771518 2.20076 0.342149 4.03122L1.80251 4.37378C2.10178 3.09795 3.09795 2.10178 4.37378 1.80251L4.03122 0.342149ZM9.30413 10.3648L11.5947 12.6553L12.6553 11.5947L10.3648 9.30413L9.30413 10.3648Z" fill="#FA7268"/>
</svg>
`;

const svg = ({w, h} : {w:string, h:string}) => {
  const SearchViewFocusSvg = () => <SvgXml xml={searchViewFocus} width={w} height={h}/>;
  return <SearchViewFocusSvg />;
};

export default svg;