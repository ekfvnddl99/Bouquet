import { createGlobalStyle } from 'styled-components';
import { sanitize } from './Sanitize';

export const GlobalStyle = createGlobalStyle`
  ${sanitize}

  html {
    width: 100%;
    height: 100%;
  }

  body {
    width: 100%;
    height: 100%;
    font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', sans-serif;
    background-color: #ffffff;
    line-height: 1.25;
  }

  #__next {
    width: 100%;
    height: 100%;
  }

  span, p {
    color: #000000;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

`;