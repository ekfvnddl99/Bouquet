import styled from 'styled-components';

import { colors } from '../styles/Colors';

import AppleLogo from '../public/AppleLogo.svg';
import GoogleLogo from '../public/GoogleLogo.svg';

const Wrap = styled.div`
  padding-bottom: 100px;
`;

const ContentWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TitleText = styled.span`
  @media (min-width: 320px) and (max-width: 520px) {
    font-size: 7vw;
  }

  @media (min-width: 521px) {
    font-size: 36px;
  }
`;

const TitleLight = styled(TitleText)`
  font-weight: 300;
`;

const StoreWrap = styled.div`
  margin-top: 28px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StoreFrame = styled.div`
  width: 260px;
  padding: 12px 48px 12px 48px;
  border-radius: 22px;
  border: 1px solid #000000;
  cursor: pointer;
  transition: 0.5s;

  &:hover {
    background-color: ${colors.grayscale.gray0};
    transition: 0.5s;
  }

  &:active {
    background-color: ${colors.grayscale.gray1};
    transition: 0.5s;
  }
`;

const StoreText = styled.span`
  font-size: 16px;
  font-weight: 500;
  margin-left: 10px;
`;

const Caption = styled.span`
  font-size: 14px;
  font-weight: 300;
  color: ${colors.grayscale.gray5};
`;

const CaptionBig = styled.span`
  font-size: 18px;
  font-weight: 300;
  color: ${colors.grayscale.gray5};
  margin-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
  text-align: center;

  @media (min-width: 320px) and (max-width: 400px) {
    font-size: 4.5vw;
  }
`;

export default function Final({ finalRef }: { finalRef: React.MutableRefObject<any> }) {
  return (
    <Wrap ref={finalRef}>
      <ContentWrap>
        <TitleLight>지금 부캐를 만들어 보세요.</TitleLight>
        <StoreWrap>
          <a href="https://apps.apple.com/kr/app/bouquet-%EB%B6%80%EC%BA%90%EB%93%A4%EC%9D%98-%EC%9D%B4%EC%95%BC%EA%B8%B0-%EA%B3%B5%EA%B0%84/id1589432470" target="_blank" rel="noopener noreferrer">
            <StoreFrame>
              <AppleLogo />
              <StoreText>App Store 다운로드</StoreText>
            </StoreFrame>
          </a>
          <a href="https://play.google.com/store/apps/details?id=com.dot.bouquet" target="_blank" rel="noopener noreferrer">
            <StoreFrame style={{ marginTop: "10px", marginBottom: "10px" }}>
              <GoogleLogo />
              <StoreText>Play Store 다운로드</StoreText>
            </StoreFrame>
          </a>
          <Caption>곧 웹에서도 이용할 수 있어요.</Caption>
        </StoreWrap>
      </ContentWrap>
    </Wrap>
  )
}