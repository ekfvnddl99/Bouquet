import { createGlobalStyle } from 'styled-components';
import { colors } from './Colors';
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
  }

  #__next {
    width: 100%;
    height: 100%;
  }

  span, p {
    color: ${colors.grayscale.black};
  }
`;