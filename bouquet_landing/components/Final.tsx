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
          <a href="https://naver.com" target="_blank" rel="noopener noreferrer">
            <StoreFrame>
              <AppleLogo />
              <StoreText>App Store 다운로드</StoreText>
            </StoreFrame>
          </a>
          <a href="https://google.co.kr" target="_blank" rel="noopener noreferrer">
            <StoreFrame style={{ marginTop: "10px", marginBottom: "10px" }}>
              <GoogleLogo />
              <StoreText>Play Store 다운로드</StoreText>
            </StoreFrame>
          </a>
          <Caption>곧 웹에서도 이용할 수 있어요.</Caption>
        </StoreWrap>
      </ContentWrap>
      <ContentWrap style={{ marginTop: "100px" }}>
        <TitleLight>지금은 오픈 베타 중이에요.</TitleLight>
        <CaptionBig>정식 버전을 열심히 준비하고 있으니, 그동안 많은 피드백과 사랑을 부탁드려요!</CaptionBig>
      </ContentWrap>
    </Wrap>
  )
}